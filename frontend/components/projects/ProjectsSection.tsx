"use client";

import { useState } from "react";
import {
  OrbitCardStack,
  AI_RESEARCH_PROJECTS,
  type OrbitStackItem,
} from "./OrbitCardStack";
import { ArrowUpRight, Sparkles, Terminal, Code2, ExternalLink, X } from "lucide-react";

export function ProjectsSection() {
  const currentItems = AI_RESEARCH_PROJECTS;
  const [activeItem, setActiveItem] = useState<OrbitStackItem>(AI_RESEARCH_PROJECTS[2]!);
  const [activeIndex, setActiveIndex] = useState(2);
  const [inspectedItem, setInspectedItem] = useState<OrbitStackItem | null>(null);

  const handleActiveChange = (item: OrbitStackItem, index: number) => {
    setActiveItem(item);
    setActiveIndex(index);
  };

  const handleCardSelect = (item: OrbitStackItem) => {
    setInspectedItem(item);
  };

  return (
    <section
      id="projects"
      className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-zinc-50/90 via-white to-zinc-50/60 text-zinc-950 p-6 sm:p-10 md:p-14 overflow-hidden border border-zinc-200/80 shadow-xs my-8"
      aria-label="Selected Projects and Research"
    >
      {/* Background ambient lighting matching editorial light flow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(255,74,61,0.06)_0%,rgba(120,220,202,0.03)_45%,transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-zinc-50/40 to-transparent"
        aria-hidden
      />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-[#FF4A3D] uppercase">
            <span className="size-2 rounded-full bg-[#FF4A3D] animate-ping" />
            <span>Interactive Archive // 2024–2026</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 font-[var(--display)]">
            Selected Works & Systems
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed">
            Explorations in mathematical reasoning models, high-dimensional latent diffusion geometry, and sub-millisecond inference acceleration.
          </p>
        </div>

        {/* Category Badge */}
        <div className="flex items-center self-start md:self-auto px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-semibold tracking-wider shadow-xs gap-2 select-none">
          <Sparkles className="size-3.5 text-[#FF4A3D]" />
          <span>AI / ML Models</span>
        </div>
      </div>

      {/* Instructions / Status bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-zinc-400" />
          <span>HOVER / FOCUS OR USE ARROW KEYS TO ORBIT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700">
            {String(activeIndex + 1).padStart(2, "0")} / {String(currentItems.length).padStart(2, "0")}
          </span>
          <span className="text-zinc-500 truncate max-w-[200px] sm:max-w-none">
            FOCUS: <span className="text-zinc-950 font-semibold">{activeItem.name}</span>
          </span>
        </div>
      </div>

      {/* Orbit Card Stack Stage */}
      <div className="relative z-10 py-4 flex flex-col items-center justify-center">
        <OrbitCardStack
          items={currentItems}
          defaultActiveIndex={2}
          spread={168}
          lift={42}
          onActiveChange={handleActiveChange}
          onItemSelect={handleCardSelect}
        />
      </div>

      {/* Active Card Quick-Summary Pill / Controller */}
      <div className="relative z-10 mx-auto max-w-2xl mt-2 p-4 sm:p-5 rounded-2xl bg-white/90 border border-zinc-200/90 shadow-md backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div
            className="size-3.5 rounded-full shrink-0 mt-1 sm:mt-0"
            style={{ backgroundColor: activeItem.accent ?? "#f8d66d" }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-semibold text-zinc-950 tracking-tight">
                {activeItem.name}
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono">
                {activeItem.stat}
              </span>
            </div>
            <p className="text-xs text-zinc-600 line-clamp-1 mt-0.5">
              {activeItem.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCardSelect(activeItem)}
          className="self-end sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-950 text-zinc-800 hover:text-white border border-zinc-200 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer"
        >
          <span>Examine Card</span>
          <ArrowUpRight className="size-3.5" />
        </button>
      </div>

      {/* Card Inspection Modal */}
      {inspectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setInspectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#e9e6df] text-zinc-950 p-6 sm:p-8 shadow-2xl border border-white/20 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setInspectedItem(null)}
              className="absolute right-5 top-5 size-9 grid place-items-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>

            {inspectedItem.image && (
              <div className="relative aspect-[1.36] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-inner">
                <img
                  src={inspectedItem.image}
                  alt={inspectedItem.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-wider text-white">
                  {inspectedItem.initials ?? inspectedItem.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}

            <div className="pt-5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-zinc-500">
                <span>{inspectedItem.role}</span>
                <span className="font-mono text-zinc-700">{inspectedItem.stat}</span>
              </div>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 font-[var(--display)]">
                {inspectedItem.name}
              </h3>
              <p className="mt-3 text-sm text-zinc-700 leading-relaxed">
                {inspectedItem.description}
              </p>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-black/10">
                <span className="text-xs font-mono text-zinc-500">
                  REF // ARCHIVE SPEC
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInspectedItem(null)}
                    className="px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
