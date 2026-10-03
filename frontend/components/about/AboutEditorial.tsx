"use client";

import { motion } from "framer-motion";
import InteractiveHotspot from "@/components/interactive/InteractiveHotspot";

export default function AboutEditorial() {
  return (
    <section
      id="about"
      aria-label="About Sahil Saini"
      className="relative w-full py-4 sm:py-6 md:py-8 my-1 flex items-center justify-center select-none overflow-visible"
    >
      {/* Interactive 3D Hotspot Right: Deformed Wave Grid (matching Image 3) */}
      <div className="hidden lg:block absolute right-[2%] top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <InteractiveHotspot
          id="about-wave"
          shape="wave"
          label="3D.03 // WAVE"
          activeIcon="circle-square"
          popupSide="left"
        />
      </div>
      {/* Centered Editorial Monospace Statement */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Editorial Statement Lines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-zinc-850 text-base sm:text-lg md:text-xl lg:text-[1.38rem] leading-[2.2] sm:leading-[2.3] md:leading-[2.4] tracking-normal text-zinc-900"
        >
          {/* Line 1: I turn ambiguity [scribble] into clear systems & product direction and */}
          <div className="flex flex-wrap items-center justify-center gap-x-2">
            <span>I turn ambiguity</span>

            {/* Hand-Drawn Scribble / Tangle Doodle */}
            <span className="inline-flex items-center justify-center group cursor-pointer" title="Chaos into clarity">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 sm:size-7 text-zinc-900 group-hover:rotate-12 transition-transform duration-300"
                aria-hidden="true"
              >
                <path d="M14 6c-4 1-6 4-5 8 1 5 6 6 9 4 3-2 3-6 1-8-3-2-8 0-9 4-2 6 2 11 7 12 5 1 9-2 9-6 0-3-3-5-6-4-3 1-4 4-2 6 2 2 5 1 6-1" />
                <path d="M16 19c0 3-1 6-1 8" />
              </svg>
            </span>

            <span>into clear systems &amp; product direction and</span>
          </div>

          {/* Line 2: ship with cross-functional teams [burst] [ at speed. ] */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-1 sm:mt-2">
            <span>ship with cross-functional teams</span>

            {/* Boxed [ at speed. ] with action burst lines above */}
            <span className="relative inline-flex flex-col items-center group">
              {/* Radiating Action Burst Lines \ | / */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 pointer-events-none group-hover:-translate-y-0.5 transition-transform duration-200">
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  className="text-zinc-900"
                  aria-hidden="true"
                >
                  <line x1="2" y1="8" x2="5" y2="2" />
                  <line x1="9" y1="8" x2="9" y2="1" />
                  <line x1="16" y1="8" x2="13" y2="2" />
                </svg>
              </span>

              {/* Boxed text badge */}
              <span className="px-2.5 py-0.5 border border-zinc-800 rounded-sm bg-white/70 shadow-2xs text-zinc-950 font-semibold group-hover:border-[#FF4A3D] group-hover:text-[#FF4A3D] transition-colors duration-200">
                at speed.
              </span>
            </span>
          </div>

          {/* Line 3: ✦ [ I build with AI, ] (dot) prototyping ideas and exploring */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-3 sm:mt-4">
            {/* Sparkle Four-Point Star Doodle */}
            <span className="inline-flex items-center group cursor-pointer" title="Spark of craft">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 sm:size-5.5 text-zinc-900 group-hover:scale-125 group-hover:rotate-45 transition-transform duration-300"
                aria-hidden="true"
              >
                <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
                <path d="M4 4h2m-1-1v2" strokeWidth="1.5" />
              </svg>
            </span>

            {/* Boxed [ I build with AI, ] with tactile black dot pin sticker */}
            <span className="relative inline-flex items-center px-3 py-0.5 border border-zinc-800 rounded-sm bg-white/80 shadow-2xs text-zinc-950 font-semibold mr-1 group cursor-pointer hover:border-zinc-950">
              <span>I build with AI,</span>
              {/* Tactile Black Dot Sticker Pin overlapping bottom border */}
              <span
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-zinc-950 ring-2 ring-white shadow-xs group-hover:scale-125 transition-transform duration-200"
                title="Anchor pin"
              />
            </span>

            <span>prototyping ideas and exploring</span>
          </div>

          {/* Line 4: the edge of intelligence, design, and technology. */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-1 sm:mt-2">
            <span>the edge of intelligence, design, and technology.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
