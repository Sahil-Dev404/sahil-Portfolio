"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  type CSSProperties,
  type FocusEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  accent?: string;
  initials?: string;
  stat?: string;
  image?: string;
  tag?: string;
  href?: string;
}

export interface OrbitCardStackProps {
  items?: OrbitStackItem[];
  className?: string;
  cardClassName?: string;
  defaultActiveIndex?: number;
  spread?: number;
  lift?: number;
  onActiveChange?: (item: OrbitStackItem, index: number) => void;
  onItemSelect?: (item: OrbitStackItem, index: number) => void;
}

/**
 * 1. AI/ML Research & Engineering Projects
 * Curated for an elite AI/ML Researcher & Systems Engineer.
 */
export const AI_RESEARCH_PROJECTS: OrbitStackItem[] = [
  {
    name: "ReasoningGraph",
    role: "Reasoning & RL",
    description:
      "Tree-of-thought Monte Carlo policy search with verifier-guided pruning for rigorous LLM mathematical reasoning.",
    accent: "#f8d66d",
    initials: "RG",
    stat: "SOTA AIME '24",
    tag: "Reinforcement Learning",
    image: "/images/orbit-card-stack/reasoning-graph.png",
    href: "https://github.com",
  },
  {
    name: "LatentFlow",
    role: "Diffusion & Geometry",
    description:
      "Optimal transport flow-matching trajectory optimization yielding 8x faster high-fidelity 3D geometric synthesis.",
    accent: "#78dcca",
    initials: "LF",
    stat: "NeurIPS '24 Oral",
    tag: "Generative Models",
    image: "/images/orbit-card-stack/diffusion-geometry.png",
    href: "https://github.com",
  },
  {
    name: "SwarmMind",
    role: "Autonomous Agents",
    description:
      "Asynchronous multi-agent coordination protocol featuring shared episodic memory and deterministic tool synthesis.",
    accent: "#f3f1ea",
    initials: "SM",
    stat: "86.2% SWE-Bench",
    tag: "Agent Swarms",
    image: "/images/orbit-card-stack/neural-agent.png",
    href: "https://github.com",
  },
  {
    name: "OmniPerceive",
    role: "Vision-Language",
    description:
      "Unified cross-attention architecture aligning continuous audio waveforms and spatial visual tokens in real time.",
    accent: "#b9a7ff",
    initials: "OP",
    stat: "ICLR '25 Spotlight",
    tag: "Multimodal AI",
    image: "/images/orbit-card-stack/multimodal-vision.png",
    href: "https://github.com",
  },
  {
    name: "FlashTensor-X",
    role: "Systems & Kernels",
    description:
      "Hand-tuned Triton & CUDA FlashAttention-3 kernels with SRAM memory tiling achieving sub-millisecond TTFT on H100.",
    accent: "#ff9d77",
    initials: "FT",
    stat: "4.2x Throughput",
    tag: "Inference Engine",
    image: "/images/orbit-card-stack/cuda-tensor-kernel.png",
    href: "https://github.com",
  },
];

/**
 * 2. Default Team & Reference Items from Original Spec
 */
export const DEFAULT_TEAM_ITEMS: OrbitStackItem[] = [
  {
    name: "Mira Vale",
    role: "Creative Lead",
    description:
      "Shapes visual systems with enough restraint to feel expensive and enough edge to be remembered.",
    accent: "#f8d66d",
    initials: "MV",
    stat: "Identity",
    image: "/images/orbit-card-stack/mira-vale.png",
  },
  {
    name: "Noor Kade",
    role: "Product Strategy",
    description:
      "Turns loose ideas into sharp product moves, crisp priorities, and launchable experiences.",
    accent: "#78dcca",
    initials: "NK",
    stat: "Roadmap",
    image: "/images/orbit-card-stack/noor-kade.png",
  },
  {
    name: "Ari Chen",
    role: "Founder",
    description:
      "Sets the taste bar, protects the details, and keeps the whole team pointed at the same high signal.",
    accent: "#f3f1ea",
    initials: "AC",
    stat: "Vision",
    image: "/images/orbit-card-stack/ari-chen.png",
  },
  {
    name: "Sana Holt",
    role: "Frontend Engineer",
    description:
      "Builds the motion, polish, and interface texture that make the product feel calm under pressure.",
    accent: "#b9a7ff",
    initials: "SH",
    stat: "Motion",
    image: "/images/orbit-card-stack/sana-holt.png",
  },
  {
    name: "Ezra Moon",
    role: "Operations",
    description:
      "Keeps the machine quiet, the handoffs clean, and the team moving without pointless friction.",
    accent: "#ff9d77",
    initials: "EM",
    stat: "Systems",
    image: "/images/orbit-card-stack/ezra-moon.png",
  },
];

function inRange(index: number, length: number) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function initialsFor(item: OrbitStackItem) {
  return (
    item.initials ??
    item.name
      .split(/\s+/)
      .map((part) => part.at(0))
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );
}

function Portrait({ item }: { item: OrbitStackItem }) {
  const initials = initialsFor(item);
  const shared =
    "relative flex aspect-[1.36] w-full overflow-hidden rounded-[1.45rem] border border-black/[0.08] bg-black/[0.045] shadow-inner select-none";

  if (item.image) {
    return (
      <div className={shared}>
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          loading="eager"
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white shadow-md">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={shared}
      style={{ "--portrait-accent": item.accent ?? "#f3f1ea" } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,var(--portrait-accent),transparent_24%),radial-gradient(circle_at_85%_72%,rgba(255,255,255,0.5),transparent_28%)] opacity-45" />
      <div className="absolute inset-x-8 bottom-0 h-[72%] rounded-t-[999px] border-2 border-zinc-950 bg-[#f7f5ef]" />
      <div className="absolute left-1/2 top-[22%] size-24 -translate-x-1/2 rounded-[45%_55%_48%_52%] border-2 border-zinc-950 bg-[#f5f2eb]">
        <span className="absolute left-[27%] top-[34%] size-2 rounded-full bg-zinc-950" />
        <span className="absolute right-[27%] top-[34%] size-2 rounded-full bg-zinc-950" />
        <span className="absolute left-1/2 top-[52%] h-6 w-4 -translate-x-1/2 rounded-b-full border-b-2 border-zinc-950" />
        <span
          className="absolute -top-5 left-1/2 h-9 w-24 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-zinc-950"
          style={{ backgroundColor: item.accent ?? "#f3f1ea" }}
        />
      </div>
      <span className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white shadow-md">
        {initials}
      </span>
    </div>
  );
}

export function OrbitCardStack({
  items = AI_RESEARCH_PROJECTS,
  className,
  cardClassName,
  defaultActiveIndex = 2,
  spread = 168,
  lift = 38,
  onActiveChange,
  onItemSelect,
}: OrbitCardStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const cards = items.length ? items : AI_RESEARCH_PROJECTS;
  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const midpoint = (cards.length - 1) / 2;

  // Responsive spread detection for smooth scaling across viewports
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveSpread = isMobile ? Math.min(spread, 82) : spread;

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * effectiveSpread,
            y: Math.abs(orbit) * 28 + Math.max(0, Math.abs(orbit) - 1) * 12,
            rotation: orbit * 8.2,
          },
          closed: {
            x: stack * 11,
            y: Math.abs(stack) * 5,
            rotation: stack * 2.8,
          },
        };
      }),
    [cards, midpoint, restingIndex, effectiveSpread],
  );

  const activate = (index: number) => {
    const next = inRange(index, cards.length);
    setOpen(true);
    setActiveIndex(next);
    onActiveChange?.(cards[next]!, next);
  };

  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };

  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  const handleCardClick = (item: OrbitStackItem, index: number) => {
    activate(index);
    onItemSelect?.(item, index);
  };

  return (
    <div
      className={cn(
        "relative flex min-h-full w-full items-center justify-center overflow-visible py-8 px-4",
        className,
      )}
    >
      <div
        ref={stageRef}
        className="relative h-[530px] w-full max-w-[1040px] flex items-center justify-center"
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Orbit project card stack"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index]!.open : layouts[index]!.closed;
          const active = index === activeIndex;

          const style: CSSProperties = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${
              position.y - (open && active ? lift : 0)
            }px)) rotate(${position.rotation}deg) scale(${
              active ? 1.01 : open ? 0.985 : 0.97
            })`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          return (
            <article
              key={`${item.name}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn(
                "group absolute left-1/2 top-1/2 w-[min(82vw,21.5rem)] origin-bottom cursor-pointer rounded-[1.9rem] border border-zinc-900/15 bg-gradient-to-b from-[#FCFBF8] via-[#FAF9F5] to-[#F4F2EB] p-4 text-[#141414] outline-none select-none",
                "shadow-[0_18px_45px_rgba(0,0,0,0.20),0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.35)]",
                "transition-[transform,box-shadow,border-color] ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:ring-2 focus-visible:ring-zinc-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                active && "ring-1 ring-zinc-950/25 border-zinc-900/35",
                cardClassName,
              )}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => handleCardClick(item, index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCardClick(item, index);
                }
              }}
            >
              <div className="relative">
                <Portrait item={item} />
                <span
                  className={cn(
                    "absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-zinc-950 text-white shadow-lg shadow-black/30 transition-all duration-300",
                    active
                      ? "scale-105 bg-black ring-2 ring-white/20"
                      : "opacity-90 group-hover:scale-105",
                  )}
                  aria-label="Open project view"
                >
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </div>

              <div className="px-2 pb-2 pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-[0.72rem] font-mono font-bold uppercase tracking-[0.18em] text-zinc-700">
                    {item.role}
                  </p>
                  <span className="size-1.5 rounded-full bg-zinc-950" />
                </div>
                <h3 className="mt-2 text-[2rem] font-semibold leading-none tracking-[-0.04em] text-zinc-950 font-[var(--display)]">
                  {item.name}
                </h3>
                <p className="mt-4 max-w-[17.5rem] text-[0.96rem] font-medium leading-[1.42] tracking-[-0.01em] text-zinc-800">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-zinc-900/15 pt-4">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-zinc-950 bg-zinc-950/5 px-2.5 py-0.5 rounded-sm border border-zinc-900/10">
                    {item.stat ?? "Research"}
                  </span>
                  {item.tag && (
                    <span className="text-[0.65rem] font-mono font-semibold tracking-wider text-zinc-600 uppercase">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default OrbitCardStack;
