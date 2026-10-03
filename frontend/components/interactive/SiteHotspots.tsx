"use client";

import { useState } from "react";
import InteractiveHotspot, { GRID_SIZE } from "./InteractiveHotspot";
import { ShapeType } from "./WireframeCanvas";
import { Plus, Sparkles } from "lucide-react";

interface CustomSpot {
  id: string;
  col: number;
  row: number;
  shape: ShapeType;
}

const AVAILABLE_SHAPES: ShapeType[] = ["torus", "wave", "sphere", "icosahedron", "knot"];

export default function SiteHotspots() {
  const [customSpots, setCustomSpots] = useState<CustomSpot[]>([]);

  // Function to spawn a new random spot snapped directly onto the background grid
  const handleAddRandomSpot = () => {
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      2500
    );
    const winWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
    const totalCols = Math.max(8, Math.floor(winWidth / GRID_SIZE));

    // Choose integer grid column within visible margins (col 2 to totalCols - 3)
    const randomCol = Math.floor(Math.random() * Math.max(1, totalCols - 4)) + 2;

    // Choose integer grid row across the document
    const minRow = 12;
    const maxRows = Math.floor((docHeight - 350) / GRID_SIZE);
    const randomRow = Math.floor(Math.random() * Math.max(1, maxRows - minRow)) + minRow;

    const randomShape = AVAILABLE_SHAPES[Math.floor(Math.random() * AVAILABLE_SHAPES.length)];

    const newSpot: CustomSpot = {
      id: `custom-${Date.now()}`,
      col: randomCol,
      row: randomRow,
      shape: randomShape,
    };

    setCustomSpots((prev) => [...prev, newSpot]);

    // Smooth scroll to the newly generated spot
    window.scrollTo({
      top: Math.max(0, randomRow * GRID_SIZE - 250),
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Dynamic spawned random spots - locked to body background grid */}
      {customSpots.map((spot, index) => {
        const winWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
        const isRightHalf = spot.col > winWidth / (2 * GRID_SIZE);

        return (
          <div
            key={spot.id}
            className="absolute z-30 pointer-events-auto"
            style={{
              left: `${spot.col * GRID_SIZE}px`,
              top: `${spot.row * GRID_SIZE}px`,
              width: `${GRID_SIZE}px`,
              height: `${GRID_SIZE}px`,
            }}
          >
            <InteractiveHotspot
              id={spot.id}
              shape={spot.shape}
              label={`RANDOM.${index + 1}`}
              initialOpen={true}
              popupSide={isRightHalf ? "left" : "right"}
            />
          </div>
        );
      })}

      {/* Floating Quick Action Badge on Bottom Left: "Spawn + Hotspot" */}
      <div className="fixed bottom-5 left-5 z-40 hidden md:flex items-center gap-2">
        <button
          type="button"
          onClick={handleAddRandomSpot}
          title="Drop a new 3D + hotspot at a random spot on the site!"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-zinc-800 text-xs font-mono font-medium shadow-md hover:shadow-lg border border-zinc-200/90 backdrop-blur-md transition-all duration-200 hover:scale-105 cursor-pointer active:scale-95"
        >
          <span className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center text-[0.7rem] group-hover:bg-[#FF4A3D] transition-colors">
            <Plus className="w-3 h-3 stroke-[2.5]" />
          </span>
          <span className="tracking-wide uppercase text-[0.68rem] text-zinc-600 group-hover:text-zinc-950">
            Random 3D Spot
          </span>
          <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
        </button>
      </div>
    </>
  );
}
