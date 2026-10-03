"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Character from "./Character";
import { INTRO } from "./intro.config";

type Props = { onReveal: () => void; onDone: () => void };

// Slow start, steady middle, soft finish: easeInOutCubic blended with linear matching huyml.co
const pushEase = (t: number) => {
  const c = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  return 0.3 * t + 0.7 * c;
};

export default function Intro({ onReveal, onDone }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const wall = useRef<HTMLDivElement>(null);
  const kid = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Skip handler
  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    const html = document.documentElement;
    html.classList.remove("intro");
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

  useGSAP(
    () => {
      const html = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || document.visibilityState === "hidden") {
        onDone();
        return;
      }

      html.classList.add("intro");
      if (stage.current) {
        stage.current.style.animation = "none";
      }

      const charWidth = () => (kid.current ? kid.current.getBoundingClientRect().width : 160);
      gsap.set(kid.current, { x: -charWidth() });

      const state = { p: 0 }; // eased progress, 0 to 1
      const tl = gsap.timeline({
        onComplete: () => {
          html.classList.remove("intro");
          onDone();
        },
      });
      timelineRef.current = tl;

      // Phase 1: Push - wall and character move together from left to right; hands stay on the wall's left edge.
      tl.to(state, {
        p: 1,
        duration: INTRO.push / 1000,
        ease: pushEase,
        onUpdate: () => {
          const w = charWidth();
          const distance = window.innerWidth + w + 30; // character leaves the screen too
          const edge = state.p * distance;
          gsap.set(wall.current, { x: edge });
          gsap.set(kid.current, { x: edge - w });
          if (pct.current) pct.current.textContent = String(Math.round(state.p * 100)).padStart(3, "0");
        },
      });

      // Phase 2: Hold - name page stays visible after the wall has left.
      // Phase 3: Exit - trigger the simple page reveal and slide the name page up and away.
      tl.call(onReveal, undefined, `+=${INTRO.hold / 1000}`);
      tl.to(stage.current, { yPercent: -100, duration: INTRO.exit / 1000, ease: "power4.inOut" }, "<");

      return () => {
        tl.kill();
        html.classList.remove("intro");
      };
    },
    { scope: stage }
  );

  return (
    <div ref={stage} className="stage" aria-hidden="true">
      <h2 className="sname">
        <span>{INTRO.firstName}</span>
        <span>{INTRO.lastName}</span>
      </h2>
      <div ref={wall} className="wall">
        <div className="count">
          <span>Loading portfolio</span>
          <span ref={pct}>000</span>
        </div>
      </div>
      <div ref={kid} className="kid" style={{ transform: "translateX(-100%)" }}>
        <Character />
      </div>
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-[150] px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 font-mono text-[0.7rem] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 pointer-events-auto"
        title="Skip intro animation (Esc)"
      >
        <span>Skip</span>
        <span className="text-zinc-400 font-sans text-xs">→</span>
      </button>
    </div>
  );
}
