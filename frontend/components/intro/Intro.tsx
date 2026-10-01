"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { INTRO } from "./intro.config";
import type { AnimationItem } from "lottie-web";
import characterPushData from "../../public/lottie/character-push.json";

type Props = {
  onReveal: () => void;
  onDone: () => void;
};

// Stops matching huyml.co:
// Stop 1: push to 30%, brief pause (hold)
// Stop 2: push to 60%, brief pause (hold)
// Stop 3: final power push to 1.25 (completely clears the right edge of the screen)
const STOPS = [
  { progress: 0.3, moveDuration: 0.9, holdDuration: 0.28 },
  { progress: 0.6, moveDuration: 0.95, holdDuration: 0.32 },
  { progress: 1.25, moveDuration: 1.5, holdDuration: 0.0 },
];
const FINAL_HOLD = 0.35; // Brief hold showing the revealed name before smooth transition
const EXIT_DURATION = 0.5; // Natural smooth in-place fade

function getDisplayPercent(p: number, finalP = 1.25): number {
  const clamped = Math.max(0, Math.min(finalP, p));
  if (clamped <= 0.3) {
    return Math.round((clamped / 0.3) * 30);
  }
  if (clamped <= 0.6) {
    return Math.round(30 + ((clamped - 0.3) / (0.6 - 0.3)) * 30);
  }
  return Math.min(100, Math.round(60 + ((clamped - 0.6) / (finalP - 0.6)) * 40));
}

export default function Intro({ onReveal, onDone }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const charAnchorRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const animRef = useRef<AnimationItem | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [dims, setDims] = useState({
    ln: 489,
    pn: 514,
    J: 245,
    loaderOffsetX: 60,
  });

  // Calculate dimensions based on viewport
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.72 : 1.14;
    const ln = Math.round(429 * scale);
    const pn = Math.round(451 * scale);
    const J = Math.round(ln * 0.5);
    const loaderOffsetX = isMobile ? 35 : 60;
    setDims({ ln, pn, J, loaderOffsetX });
  }, []);

  // Skip handler
  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (animRef.current) {
      try {
        animRef.current.destroy();
      } catch {}
    }
    onReveal();
    onDone();
  };

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Initialize and run Lottie + GSAP Timeline
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      onReveal();
      onDone();
      return;
    }

    let isMounted = true;

    const setupAnimation = async () => {
      try {
        const mod = await import("lottie-web");
        const lottie = mod.default || mod;

        if (!isMounted || !lottieContainerRef.current) return;

        // In-memory animationData for instant 0ms load
        const anim = lottie.loadAnimation({
          container: lottieContainerRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: characterPushData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        });

        animRef.current = anim;

        const onLoaded = () => {
          if (!isMounted) return;

          // Freeze at frame 0 initially
          anim.goToAndStop(0, true);

          const state = { progress: 0 };
          const totalFrames = Math.max(1, Number(anim.totalFrames || 116));

          // Robust JavaScript + GPU transform progress sync
          const updateProgress = () => {
            const p = state.progress;
            const windowW = window.innerWidth || 1200;

            // 1. Move Wall: starts at 0% (covering the screen), pushes completely off to right
            if (wallRef.current) {
              const wallPercent = Math.min(130, Math.max(0, p * 100));
              wallRef.current.style.left = `${wallPercent}%`;
            }

            // 2. Move Character: Hands stay planted on the leading edge of the wall
            if (charAnchorRef.current) {
              const wallEdgePx = p * windowW;
              const charX = wallEdgePx - dims.J + dims.loaderOffsetX;
              charAnchorRef.current.style.transform = `translate3d(${charX}px, -50%, 0)`;
            }

            // 3. Update numeric counter and slide if wall passes right boundary
            if (counterRef.current) {
              const pct = getDisplayPercent(p, STOPS[2].progress);
              counterRef.current.textContent = String(pct).padStart(2, "0");

              const wallEdgePx = p * windowW;
              const counterInsetRight = 40;
              const counterW = counterRef.current.offsetWidth || 140;
              const triggerPoint = windowW - counterInsetRight - counterW;
              const counterPush = Math.max(0, wallEdgePx - triggerPoint);
              counterRef.current.style.transform = `translate3d(${counterPush}px, -50%, 0)`;
            }

            // 4. Sync character walk/push frame to progress
            if (anim) {
              const frame = ((p * totalFrames * 1.35) % totalFrames + totalFrames) % totalFrames;
              anim.goToAndStop(frame, true);
            }
          };

          // Build GSAP Timeline - initially PAUSED until ready
          const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power2.inOut" },
            onUpdate: updateProgress,
            onComplete: () => {
              // Trigger hero entrance
              onReveal();

              // Natural smooth in-place fade transition (no sliding, no second wall pushing)
              const exitTl = gsap.timeline({
                onComplete: () => {
                  if (isMounted) onDone();
                },
              });

              if (containerRef.current) {
                exitTl.to(
                  containerRef.current,
                  {
                    opacity: 0,
                    duration: EXIT_DURATION,
                    ease: "power2.out",
                  },
                  0
                );
              }
            },
          });

          timelineRef.current = tl;

          // Add stops with durations and pauses
          STOPS.forEach((stop, idx) => {
            tl.to(state, {
              progress: stop.progress,
              duration: stop.moveDuration,
              ease: idx === STOPS.length - 1 ? "power3.in" : "power2.inOut",
            });
            if (stop.holdDuration > 0) {
              tl.to({}, { duration: stop.holdDuration });
            }
          });

          // Final hold showing the revealed name before fading into portfolio
          if (FINAL_HOLD > 0) {
            tl.to({}, { duration: FINAL_HOLD });
          }

          // Initial paint
          updateProgress();
          setIsReady(true);

          // Start playing after paint
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (isMounted && timelineRef.current) {
                timelineRef.current.play();
              }
            });
          });
        };

        anim.addEventListener("DOMLoaded", onLoaded);
        if (anim.isLoaded) {
          onLoaded();
        }
      } catch (err) {
        console.error("Intro load error:", err);
        onReveal();
        onDone();
      }
    };

    setupAnimation();

    return () => {
      isMounted = false;
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (animRef.current) {
        try {
          animRef.current.destroy();
        } catch {}
      }
    };
  }, [onReveal, onDone, dims]);

  const fullNameFirst = INTRO.firstName || "Sahil";
  const fullNameLast = INTRO.lastName || "Saini";

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999,
        overflow: "hidden",
        pointerEvents: "none",
        backgroundColor: "#FFFFFF",
      }}
      aria-label="Portfolio Introduction Animation"
    >
      {/* 1. Underlying Reveal Layer: Clean Light Background + Huge Name Typography */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 1,
          color: "#FF4A3D",
          textTransform: "uppercase",
          fontFamily: "var(--display), serif",
          fontWeight: 900,
          fontSize: "clamp(5rem, 16vw, 16rem)",
          lineHeight: "0.85",
          letterSpacing: "-0.04em",
          wordWrap: "break-word",
          userSelect: "none",
          willChange: "transform, opacity",
        }}
      >
        <div>{fullNameFirst}</div>
        <div>{fullNameLast}</div>
      </div>

      {/* 2. The Black Wall: Covers the screen initially (left: 0%), pushed off to the right */}
      <div
        ref={wallRef}
        style={{
          position: "absolute",
          inset: 0,
          left: "0%",
          background: "#0c0d10",
          zIndex: 2,
          willChange: "left",
          boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Subtle grid pattern on the wall */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Minimalist loading indicator label */}
        <div className="absolute left-8 bottom-8 text-[0.7rem] font-mono tracking-widest uppercase text-zinc-500 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-[#FF4A3D] animate-ping" />
          <span>System Initializing</span>
        </div>
      </div>

      {/* 3. The Character: Pushing the Wall from Left to Right */}
      <div
        ref={charAnchorRef}
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: 0,
          height: 0,
          transform: `translate3d(${-dims.J + dims.loaderOffsetX}px, -50%, 0)`,
          willChange: "transform",
          pointerEvents: "none",
          zIndex: 3,
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${dims.ln}px`,
            height: `${dims.pn}px`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.45))",
          }}
        >
          <div ref={lottieContainerRef} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      {/* 4. Large Minimalist Numeric Counter on the Wall (Counts 00 -> 30 -> 60 -> 100) */}
      <div
        ref={counterRef}
        style={{
          position: "absolute",
          right: "40px",
          top: "50%",
          transform: "translate3d(0px, -50%, 0)",
          color: "#ffffff",
          fontFamily: "var(--display), serif",
          fontSize: "clamp(4.5rem, 11vw, 9.5rem)",
          fontWeight: 400,
          lineHeight: "0.85",
          letterSpacing: "-0.04em",
          zIndex: 4,
          pointerEvents: "none",
          userSelect: "none",
          willChange: "transform",
        }}
      >
        00
      </div>

      {/* 5. Skip Button in Top Right */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 font-mono text-[0.7rem] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 pointer-events-auto"
        title="Skip intro animation (Esc)"
      >
        <span>Skip</span>
        <span className="text-zinc-400 font-sans text-xs">→</span>
      </button>
    </div>
  );
}
