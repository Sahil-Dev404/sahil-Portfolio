"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Briefcase, Calendar, MapPin } from "lucide-react";

export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  company: string;
  role: string;
  location?: string;
  description: string;
  skills?: string[];
}

/**
 * Normal text placeholders for companies and roles.
 * You can easily edit or add items in this array later.
 */
export const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    year: "Now",
    period: "2026 – Present",
    company: "University",
    role: "AI Researcher & Project Builder",
    location: "On-Campus",
    description:
      "Conducting academic research in Graph Neural Networks (GNNs) and geometric deep learning at university, while actively working on innovative personal AI/ML projects and building full-stack intelligent systems.",
    skills: [
      "Graph Neural Networks (GNNs)",
      "Personal AI Projects",
      "PyTorch Geometric",
      "Geometric Deep Learning",
      "Python",
      "ML Systems",
    ],
  },
  {
    id: "exp-2",
    year: "2026",
    period: "June,26 - Sept,26",
    company: "FlyRank AI",
    role: "ML Intern",
    location: "Remote",
    description:
      "Developed a leakage-aware multiclass ML pipeline to forecast content performance states – Growing, Declining, Stable, and Recovering using historical search intelligence and engagement signals.",
    skills: ["Machine Learning", "TensorFlow", "Multiclass Classification", "Python", "Feature Engineering", "Predictive Modeling"],
  },
  {
    id: "exp-3",
    year: "2026",
    period: "June,26 - Aug,26",
    company: "IBM SkillsBuild",
    role: "AI Intern",
    location: "Remote",
    description:
      "Completed an intensive 6-week virtual internship focused on Agentic AI, autonomous workflows, and process automation with n8n and LangGraph. Collaborated in a cross-functional team to architect and build an intelligent project tackling the United Nations Sustainable Development Goals (UN SDGs).",
    skills: ["Agentic AI", "LangGraph", "n8n", "Automation", "Python", "UN SDGs"],
  },
];

interface ExperienceTimelineProps {
  items?: ExperienceItem[];
  className?: string;
}

export function ExperienceTimeline({
  items = DEFAULT_EXPERIENCES,
  className = "",
}: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking through the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  // Track progress thresholds for activating the 3 dots
  const node1Active = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const node2Active = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const node3Active = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);
  const nodeProgresses = [node1Active, node2Active, node3Active];

  return (
    <section
      ref={containerRef}
      id="experience"
      className={`relative w-full pt-2 pb-8 my-2 scroll-mt-12 ${className}`}
      aria-label="Experience timeline"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-mono tracking-widest uppercase border border-zinc-200">
          <Briefcase className="size-3 text-[#FF4A3D]" />
          <span>Career Journey</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 font-[var(--display)]">
          Experience & Milestones
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-xl">
          Scroll to trace the timeline path through research labs and engineering roles.
        </p>
      </div>

      {/* Timeline Grid Container */}
      <div className="relative max-w-5xl 2xl:max-w-6xl mx-auto">
        {/* Desktop / Tablet Layout: [Year Column (w-28)] [Cursive SVG Column (w-28)] [Details Column (flex-1)] */}
        <div className="relative hidden sm:block">
          {/* Background & Animated SVG Cursive Line */}
          <div className="absolute left-[112px] top-0 bottom-0 w-[112px] pointer-events-none z-0">
            <svg
              viewBox="0 0 112 500"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
              aria-hidden="true"
            >
              {/* Background faint guide track */}
              <path
                d="M 56,10 C 18,35 24,75 56,75 C 104,75 106,170 56,245 C 8,315 16,400 56,415 C 84,425 92,460 70,495"
                stroke="#E2E8F0"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Foreground active animated cursive line */}
              <motion.path
                d="M 56,10 C 18,35 24,75 56,75 C 104,75 106,170 56,245 C 8,315 16,400 56,415 C 84,425 92,460 70,495"
                stroke="#1F2438"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-12 sm:space-y-14 relative z-10">
            {items.map((item, index) => {
              const nodeActive = nodeProgresses[index] || node1Active;

              return (
                <div
                  key={item.id}
                  className="flex items-start group min-h-[120px]"
                >
                  {/* Left Column: Big Year Label (matches reference image: 2021, 2019, 2014) */}
                  <div className="w-[112px] text-right pr-4 pt-1 shrink-0 select-none">
                    <span className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-[#1F2438]/85 font-[var(--display)] leading-none transition-colors group-hover:text-[#FF4A3D]">
                      {item.year}
                    </span>
                  </div>

                  {/* Center Column: Node Dot sitting directly on the curve */}
                  <div className="w-[112px] flex items-start justify-center pt-2.5 shrink-0">
                    <motion.div
                      style={{
                        scale: useTransform(nodeActive, [0, 1], [0.85, 1.15]),
                        backgroundColor: useTransform(
                          nodeActive,
                          [0, 1],
                          ["#64748B", "#1F2438"]
                        ),
                      }}
                      className="size-6 sm:size-7 rounded-full shadow-md flex items-center justify-center border-2 border-white ring-4 ring-[#1F2438]/10 transition-all duration-300"
                    >
                      <span className="size-2 rounded-full bg-white opacity-80" />
                    </motion.div>
                  </div>

                  {/* Right Column: Normal Editable Text for Company & Role */}
                  <div className="flex-1 pl-4 pt-1">
                    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/80 hover:bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all duration-300 shadow-sm hover:shadow-md">
                      {/* Role at Company [ Period ] */}
                      <div className="text-xs sm:text-sm font-normal text-zinc-800 leading-snug">
                        <span className="font-bold text-zinc-950 text-sm sm:text-base">
                          {item.role}
                        </span>{" "}
                        <span className="text-zinc-500 font-medium">at</span>{" "}
                        <span className="font-semibold text-zinc-900">
                          {item.company}
                        </span>{" "}
                        <span className="text-zinc-500 font-mono text-[0.72rem] sm:text-[0.75rem] font-normal ml-1">
                          [{item.period}]
                        </span>
                      </div>

                      {/* Location & Tags if available */}
                      {item.location && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[0.7rem] text-zinc-400 font-mono">
                          <MapPin className="size-3 text-zinc-400" />
                          <span>{item.location}</span>
                        </div>
                      )}

                      {/* Editable Description */}
                      <p className="mt-2 text-xs sm:text-[0.85rem] text-zinc-600 leading-relaxed max-w-xl">
                        {item.description}
                      </p>

                      {/* Skill tags */}
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-zinc-200/60">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 text-[0.68rem] font-mono rounded bg-white text-zinc-600 border border-zinc-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View (< 640px): Compact clean layout */}
        <div className="block sm:hidden space-y-6 relative pl-7 border-l-2 border-[#1F2438]/20 ml-2">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot on left vertical line */}
              <div className="absolute -left-[35px] top-1 size-4 rounded-full bg-[#1F2438] border-2 border-white shadow" />

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-lg font-bold text-[#1F2438] font-[var(--display)]">
                  {item.year}
                </div>
                <div className="mt-1 text-xs font-normal text-zinc-800 leading-snug">
                  <span className="font-bold text-zinc-950">{item.role}</span>{" "}
                  <span className="text-zinc-500 font-medium">at</span>{" "}
                  <span className="font-semibold text-zinc-900">{item.company}</span>{" "}
                  <span className="text-zinc-500 font-mono text-[0.72rem] font-normal block sm:inline mt-0.5 sm:mt-0">
                    [{item.period}]
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
                {item.skills && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 text-[0.65rem] font-mono rounded bg-white text-zinc-600 border border-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceTimeline;
