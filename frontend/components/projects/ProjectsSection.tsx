"use client";

import { useState, useEffect } from "react";
import {
  OrbitCardStack,
  AI_RESEARCH_PROJECTS,
  type OrbitStackItem,
} from "./OrbitCardStack";
import { ArrowUpRight, Sparkles, Terminal, Code2, ExternalLink, X, CheckCircle2, GitBranch } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";

export function ProjectsSection() {
  const currentItems = AI_RESEARCH_PROJECTS;
  const [activeItem, setActiveItem] = useState<OrbitStackItem>(AI_RESEARCH_PROJECTS[1]!);
  const [activeIndex, setActiveIndex] = useState(1);
  const [inspectedItem, setInspectedItem] = useState<OrbitStackItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectedItem(null);
    };
    if (inspectedItem) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [inspectedItem]);

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
      className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-zinc-50/90 via-white to-zinc-50/60 text-zinc-950 p-6 sm:p-10 md:p-14 overflow-hidden border border-zinc-200/80 shadow-xs my-8 scroll-mt-12"
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
      <div className="absolute inset-0 pointer-events-none opacity-40 graph-grid" aria-hidden />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-[#FF4A3D] uppercase">
            <span className="size-2 rounded-full bg-[#FF4A3D] animate-ping" />
            <span>Interactive Archive // 2024–2026</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 font-[var(--display)]">
            Selected Works &amp; Systems
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
          <span>HOVER / FOCUS OR CLICK ANY CARD FOR FULL SPEC &amp; DIAGRAMS</span>
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
          defaultActiveIndex={1}
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
            {activeItem.tech && (
              <p className="text-[0.68rem] font-mono text-zinc-500 font-medium truncate mt-0.5">
                {activeItem.tech}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCardSelect(activeItem)}
          className="self-end sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-mono font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
        >
          <span>Open Full Spec</span>
          <ArrowUpRight className="size-3.5" />
        </button>
      </div>

      {/* Comprehensive Detailed Project Modal with Diagrams, GitHub & Live Links */}
      {inspectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setInspectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF9F5] text-zinc-950 p-6 sm:p-8 md:p-10 shadow-2xl border border-zinc-900/20 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Quick Close */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono font-semibold uppercase tracking-wider">
                    {inspectedItem.role}
                  </span>
                  {inspectedItem.stat && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF4A3D]/10 border border-[#FF4A3D]/20 text-[#FF4A3D] text-xs font-mono font-bold">
                      {inspectedItem.stat}
                    </span>
                  )}
                  {inspectedItem.tag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/5 text-zinc-600 text-xs font-mono">
                      {inspectedItem.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 font-[var(--display)] mt-2">
                  {inspectedItem.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="size-9 grid place-items-center rounded-full bg-zinc-200/80 hover:bg-zinc-900 hover:text-white text-zinc-700 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Quick Action Links Bar: GitHub Repo + Live Application */}
            <div className="flex flex-wrap items-center gap-3 py-4 border-b border-zinc-200/80">
              {inspectedItem.github && (
                <a
                  href={inspectedItem.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-mono font-semibold transition-all shadow-md hover:scale-102"
                >
                  <GitHubIcon className="size-4 fill-white" />
                  <span>View GitHub Code</span>
                  <ArrowUpRight className="size-3.5 text-zinc-400" />
                </a>
              )}
              {inspectedItem.live && (
                <a
                  href={inspectedItem.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 text-xs font-mono font-semibold transition-all shadow-2xs hover:scale-102"
                >
                  <ExternalLink className="size-3.5 text-emerald-600" />
                  <span>Live Application</span>
                  <ArrowUpRight className="size-3.5 text-zinc-400" />
                </a>
              )}
            </div>

            {/* System Architecture & Visual Pipeline Schematic Section */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 flex items-center gap-2">
                  <Terminal className="size-3.5 text-[#FF4A3D]" />
                  <span>System Architecture &amp; Technical Schematic</span>
                </h4>
                <span className="text-[0.68rem] font-mono text-zinc-400">
                  FIG. 1 // ARCHITECTURE SPEC
                </span>
              </div>

              {/* Visual Patent / Blueprint Schematic Image */}
              {inspectedItem.image && (
                <div className="relative aspect-[16/9] max-h-[340px] w-full overflow-hidden rounded-2xl border border-zinc-300/90 bg-[#F4F1EA] shadow-inner flex items-center justify-center p-3">
                  <img
                    src={inspectedItem.image}
                    alt={inspectedItem.name}
                    className="size-full object-contain filter contrast-105"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full bg-zinc-950 px-3 py-1 text-xs font-mono font-bold tracking-wider text-white shadow-md">
                    {inspectedItem.initials ?? "SPEC"}
                  </span>
                </div>
              )}

              {/* Pipeline Step-by-Step Flowchart Diagram */}
              {inspectedItem.diagramSteps && inspectedItem.diagramSteps.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-md">
                  <div className="flex items-center gap-2 text-[0.68rem] font-mono tracking-widest text-[#FF4A3D] uppercase mb-3">
                    <span className="size-1.5 rounded-full bg-[#FF4A3D] animate-ping" />
                    <span>DATA INGESTION &amp; PIPELINE EXECUTION FLOW</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                    {inspectedItem.diagramSteps.map((s, idx) => (
                      <div
                        key={s.step}
                        className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between transition-colors hover:border-zinc-700"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[0.6rem] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-xs">
                              STAGE {s.step}
                            </span>
                            {idx < inspectedItem.diagramSteps!.length - 1 && (
                              <span className="hidden lg:inline text-zinc-600 text-xs">→</span>
                            )}
                          </div>
                          <h5 className="text-[0.76rem] font-bold text-white font-mono leading-snug">
                            {s.title}
                          </h5>
                        </div>
                        <p className="text-[0.66rem] text-zinc-400 leading-relaxed mt-2 font-sans">
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Deep-Dive Project Overview */}
            <div className="mt-6 pt-5 border-t border-zinc-200">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 mb-2">
                Project Overview &amp; Implementation Details
              </h4>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                {inspectedItem.longDescription || inspectedItem.description}
              </p>
            </div>

            {/* Key Engineering Milestones & Results */}
            {inspectedItem.highlights && inspectedItem.highlights.length > 0 && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-zinc-100/80 border border-zinc-200/90">
                <h5 className="text-xs font-mono font-bold tracking-wider text-zinc-850 uppercase mb-3 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Key Technical Highlights &amp; Performance Metrics</span>
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-750 font-sans">
                  {inspectedItem.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#FF4A3D] font-bold mt-0.5">✦</span>
                      <span className="leading-relaxed text-zinc-800">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technology Stack Tags */}
            {inspectedItem.tech && (
              <div className="mt-6 pt-4 border-t border-zinc-200">
                <span className="block text-[0.68rem] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  Technologies, Frameworks &amp; Libraries
                </span>
                <div className="flex flex-wrap gap-2">
                  {inspectedItem.tech.split(" · ").map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-900 border border-zinc-300/80 text-xs font-mono font-medium shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer with Done button */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-200">
              <span className="text-xs font-mono text-zinc-400">
                ARCHIVE REF // SAHIL SAINI
              </span>
              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="px-5 py-2 rounded-full bg-zinc-950 text-white text-xs font-mono font-semibold hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
