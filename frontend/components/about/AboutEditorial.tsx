"use client";

import { motion } from "framer-motion";
import InteractiveHotspot from "@/components/interactive/InteractiveHotspot";

export default function AboutEditorial() {
  return (
    <section
      id="about"
      aria-label="About Sahil Saini"
      className="relative w-full py-6 sm:py-8 md:py-10 my-1 flex items-center justify-center select-none overflow-visible"
    >
      {/* Interactive 3D Hotspot Left: User marked position */}
      <div className="hidden lg:block absolute left-[2%] top-[34%] -translate-y-1/2 z-20 pointer-events-auto">
        <InteractiveHotspot
          id="about-left-spot"
          shape="torus"
          label="3D.01 // TORUS"
          activeIcon="circle-square"
          popupSide="right"
        />
      </div>

      {/* Interactive 3D Hotspot Right: Deformed Wave Grid */}
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
          className="font-mono text-zinc-900 text-sm sm:text-base md:text-lg lg:text-[1.25rem] leading-[2.1] sm:leading-[2.2] md:leading-[2.3] tracking-normal"
        >
          {/* Line 1 */}
          <div className="flex flex-wrap items-center justify-center gap-x-2">
            <span>I teach computers to think a little</span>
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-1 sm:mt-1.5">
            <span>and ask better questions than I do.</span>
          </div>

          {/* Line 3: [sparkle] [ I build with AI, ] (with pin dot on bottom) one experiment at a time, */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-2 sm:mt-2.5">
            {/* Sparkle Four-Point Star */}
            <span className="inline-flex items-center group cursor-pointer" title="Spark of craft">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4.5 sm:size-5 text-zinc-900 group-hover:scale-125 group-hover:rotate-45 transition-transform duration-300 mr-0.5"
                aria-hidden="true"
              >
                <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
              </svg>
            </span>

            {/* Boxed [ I build with AI, ] with bottom anchor dot pin */}
            <span className="relative inline-flex items-center px-3 py-0.5 border border-zinc-800 rounded-sm bg-white/80 shadow-2xs text-zinc-950 font-semibold mx-1 group cursor-pointer hover:border-zinc-950">
              <span>I build with AI,</span>
              {/* Tactile Dot Pin overlapping bottom border */}
              <span
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-2.5 sm:size-3 rounded-full bg-zinc-950 ring-2 ring-white shadow-xs group-hover:scale-125 transition-transform duration-200"
                title="Anchor pin"
              />
            </span>

            <span>one experiment at a time,</span>
          </div>

          {/* Line 4 */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-2 sm:mt-2.5">
            <span>turning half-formed ideas into models that learn,</span>
          </div>

          {/* Line 5 */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-1 sm:mt-1.5">
            <span>predict, and occasionally surprise me.</span>
          </div>

          {/* Line 6: [ I never stop tinkering, ] because the best part */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-2.5 sm:mt-3">
            {/* Boxed [ I never stop tinkering, ] */}
            <span className="relative inline-flex items-center px-3 py-0.5 border border-zinc-800 rounded-sm bg-white/80 shadow-2xs text-zinc-950 font-semibold mr-1 group cursor-pointer hover:border-zinc-950">
              <span>I never stop tinkering,</span>
            </span>

            <span>because the best part</span>
          </div>

          {/* Line 7 */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 mt-1 sm:mt-1.5">
            <span>of machine learning is the moment something finally clicks.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
