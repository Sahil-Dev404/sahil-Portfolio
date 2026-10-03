"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import WireframeCanvas, { ShapeType } from "./WireframeCanvas";
import StarParticles from "./StarParticles";
import { X, Sparkles } from "lucide-react";

export type PopupSide = "left" | "right" | "top" | "bottom" | "auto";
export type GridDotPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-right-offset"
  | "top-left-offset"
  | "none";

interface InteractiveHotspotProps {
  id: string;
  shape: ShapeType;
  label?: string;
  className?: string;
  popupSide?: PopupSide;
  gridDot?: GridDotPosition;
  activeIcon?: "square" | "circle-square";
  initialOpen?: boolean;
}

export const GRID_SIZE = 44; // Matches the 44px background grid on document.body

const SHAPE_DETAILS: Record<ShapeType, { title: string; subtitle: string }> = {
  torus: { title: "TORUS.GEO", subtitle: "Parametric 3D Donut" },
  wave: { title: "DEFORMED.SURF", subtitle: "Dynamic Wave Grid" },
  sphere: { title: "SPHERE.GLOBE", subtitle: "Equatorial Meridians" },
  icosahedron: { title: "ICOSAHEDRON", subtitle: "20-Faceted Polyhedron" },
  knot: { title: "TORUS.KNOT", subtitle: "Trefoil Knot Orbit" },
};

export default function InteractiveHotspot({
  id,
  shape,
  className = "",
  popupSide = "auto",
  gridDot = "none",
  initialOpen = false,
}: InteractiveHotspotProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [starTrigger, setStarTrigger] = useState(0);
  const [isStarPopping, setIsStarPopping] = useState(false);
  const [computedSide, setComputedSide] = useState<"left" | "right">("right");
  const [gridSnapOffset, setGridSnapOffset] = useState({ x: 0, y: 0 });

  // outerRef is an UN-TRANSFORMED layout wrapper used for measurement
  const outerRef = useRef<HTMLDivElement | null>(null);

  // Exact alignment with document.body background grid
  // body background starts at document (0, 0) with 44px spacing
  const snapToDocumentGrid = useCallback(() => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();

    // Skip if element is not rendered or invisible (e.g. before intro completes)
    if (rect.width === 0 || rect.height === 0) return;

    // Absolute position on document (invariant under scroll)
    const docX = rect.left + window.scrollX;
    const docY = rect.top + window.scrollY;

    // Find nearest integer grid cell
    const nearestCol = Math.round(docX / GRID_SIZE);
    const nearestRow = Math.round(docY / GRID_SIZE);

    const targetDocX = nearestCol * GRID_SIZE;
    const targetDocY = nearestRow * GRID_SIZE;

    // The precise pixel shift needed so outer borders sit on the grid lines
    const shiftX = Math.round(targetDocX - docX);
    const shiftY = Math.round(targetDocY - docY);

    setGridSnapOffset((prev) => {
      if (prev.x === shiftX && prev.y === shiftY) return prev;
      return { x: shiftX, y: shiftY };
    });
  }, []);

  useEffect(() => {
    let animId: number;
    const throttledSnap = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        snapToDocumentGrid();
      });
    };

    // 1. Initial snaps
    throttledSnap();

    // 2. Poll every 500ms for 10 seconds to catch post-intro layout reveal (intro is ~6.8s)
    const interval = setInterval(throttledSnap, 500);
    const stopInterval = setTimeout(() => clearInterval(interval), 10000);

    // 3. Window resize and scroll
    window.addEventListener("resize", throttledSnap);
    window.addEventListener("scroll", throttledSnap, { passive: true });

    // 4. IntersectionObserver: re-snap the moment this hotspot enters the viewport
    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && outerRef.current) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            throttledSnap();
          }
        },
        { threshold: [0, 0.25, 0.5, 1.0] }
      );
      intersectionObserver.observe(outerRef.current);
    }

    // 5. MutationObserver on document.documentElement for class changes (such as .intro removal, .reveal addition)
    let mutationObserver: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        throttledSnap();
      });
      mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    // 6. ResizeObserver on document.body
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      resizeObserver = new ResizeObserver(() => {
        throttledSnap();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
      clearTimeout(stopInterval);
      window.removeEventListener("resize", throttledSnap);
      window.removeEventListener("scroll", throttledSnap);
      if (intersectionObserver) intersectionObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [snapToDocumentGrid]);

  // Auto-detect optimal popup direction so 3D card never clips viewport
  const determineOptimalSide = useCallback(() => {
    if (popupSide !== "auto") {
      return popupSide === "left" ? "left" : "right";
    }
    if (!outerRef.current) return "right";
    const rect = outerRef.current.getBoundingClientRect();
    const rightAvailable = window.innerWidth - rect.right;
    const leftAvailable = rect.left;
    if (rightAvailable < 165 && leftAvailable >= 140) {
      return "left";
    }
    return "right";
  }, [popupSide]);

  useEffect(() => {
    setComputedSide(determineOptimalSide());
    const handleResize = () => setComputedSide(determineOptimalSide());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [determineOptimalSide]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isOpen;
    if (nextState) {
      setComputedSide(determineOptimalSide());
    }
    setIsOpen(nextState);

    // Fire star particles burst on click
    setStarTrigger((prev) => prev + 1);
    setIsStarPopping(true);
    setTimeout(() => setIsStarPopping(false), 900);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStarTrigger((prev) => prev + 1);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const info = SHAPE_DETAILS[shape];

  return (
    <div
      ref={outerRef}
      id={`hotspot-${id}`}
      style={{
        width: `${GRID_SIZE}px`,
        height: `${GRID_SIZE}px`,
      }}
      onMouseEnter={snapToDocumentGrid}
      className={`relative shrink-0 select-none ${className}`}
    >
      {/* Inner snapped container: shifted to sit exactly on the background grid lines */}
      <div
        style={{
          width: `${GRID_SIZE}px`,
          height: `${GRID_SIZE}px`,
          transform: `translate(${gridSnapOffset.x}px, ${gridSnapOffset.y}px)`,
        }}
        className="relative"
      >
        {/* The Dashed Square Hotspot Box integrated into 44px background grid cell */}
        <button
          type="button"
          onClick={handleToggle}
          title={isOpen ? "Click to close 3D shape" : "Click to view 3D shape"}
          aria-expanded={isOpen}
          style={{
            width: `${GRID_SIZE}px`,
            height: `${GRID_SIZE}px`,
          }}
          className={`border border-dashed rounded-none flex items-center justify-center cursor-pointer transition-colors duration-150 relative z-20 box-border ${
            isOpen
              ? "border-zinc-800 bg-zinc-900/[0.04]"
              : "border-zinc-400/80 hover:border-zinc-900 hover:bg-zinc-900/[0.03]"
          }`}
        >
          {/* Particle explosion centered on the box */}
          <StarParticles triggerKey={starTrigger} />

          {/* Mini Star Celebration Flash on Click */}
          {isStarPopping && (
            <div className="absolute -top-7 -right-5 pointer-events-none z-30 animate-bounce flex items-center gap-1">
              <svg
                width="22"
                height="22"
                viewBox="0 0 100 100"
                className="w-5.5 h-5.5 stroke-zinc-950 stroke-[3] fill-[#FACC15] drop-shadow-[0_2px_8px_rgba(250,204,21,0.6)] animate-spin"
              >
                <path
                  d="M 50 8 L 61 36 L 92 37 L 67 56 L 76 86 L 50 68 L 24 86 L 33 56 L 8 37 L 39 36 Z"
                />
                <circle cx="43" cy="50" r="4.5" fill="#FFFFFF" stroke="#18181B" strokeWidth="2" />
                <circle cx="57" cy="50" r="4.5" fill="#FFFFFF" stroke="#18181B" strokeWidth="2" />
                <circle cx="43" cy="50" r="2" fill="#18181B" stroke="none" />
                <circle cx="57" cy="50" r="2" fill="#18181B" stroke="none" />
              </svg>
            </div>
          )}

          {/* The '+' sign remains stationary and visible in place at all times */}
          <span
            className={`text-sm font-mono leading-none select-none pointer-events-none transition-colors duration-150 ${
              isOpen ? "text-zinc-950 font-bold" : "text-zinc-600 font-normal"
            }`}
          >
            +
          </span>
        </button>

        {/* 3D Wireframe Shape Pop-out Card (matching reference images) */}
        {isOpen && (
          <div
            onClick={handleCardClick}
            className={`absolute top-1/2 -translate-y-1/2 z-40 transition-all duration-200 ease-out origin-center pointer-events-auto ${
              computedSide === "left"
                ? "right-full mr-3"
                : "left-full ml-3"
            }`}
          >
            <div className="relative w-[130px] sm:w-[145px] bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-zinc-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.05)] flex flex-col items-center group/card">
              {/* Top Minimal Header */}
              <div className="w-full flex items-center justify-between pb-1 border-b border-zinc-100 text-[0.55rem] font-mono tracking-wider text-zinc-500 uppercase">
                <span className="flex items-center gap-0.5 text-zinc-800 font-semibold truncate max-w-[85px]">
                  <Sparkles className="w-2 h-2 text-[#FF4A3D] shrink-0" />
                  <span className="truncate">{info.title}</span>
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-4 h-4 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
                  title="Close"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* 3D Wireframe Canvas Container */}
              <div className="relative w-full h-[105px] sm:h-[115px] flex items-center justify-center overflow-hidden my-0.5">
                <WireframeCanvas shape={shape} size={115} />
              </div>

              {/* Bottom Minimal Interactive Caption */}
              <div className="w-full pt-1 border-t border-zinc-100 flex items-center justify-between text-[0.5rem] font-mono text-zinc-400">
                <span className="truncate max-w-[70px]">{shape}</span>
                <span className="text-zinc-500 font-medium">DRAG 3D</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
