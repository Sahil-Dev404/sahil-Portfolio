"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { INTRO } from "../intro/intro.config";
import { Compass, ArrowDownRight } from "lucide-react";

export interface TrailPhoto {
  src: string;
  alt: string;
  tag?: string;
}

export const PROFILE_PHOTOS: TrailPhoto[] = [
  {
    src: "/images/profile/sahil-1.jpg",
    alt: "Sahil Saini - Architecture & Lakefront",
    tag: "CAMPUS // ARCHITECTURE",
  },
  {
    src: "/images/profile/sahil-2.jpg",
    alt: "Sahil Saini - Outdoor Portrait",
    tag: "PORTRAIT // RESEARCH",
  },
  {
    src: "/images/profile/sahil-3.jpg",
    alt: "Sahil Saini - Patterned Facade",
    tag: "SYSTEMS // FIELD",
  },
  {
    src: "/images/profile/sahil-4.jpg",
    alt: "Sahil Saini - Close-up Focus",
    tag: "FOCUS // ML",
  },
  {
    src: "/images/profile/sahil-5.jpg",
    alt: "Sahil Saini - Innovation Campus View",
    tag: "INNOVATION HUB",
  },
];

// Pool size of 15 allows multiple smooth overlapping cards without DOM thrashing
const POOL_SIZE = 15;

export function ImageTrailHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const currentIndexRef = useRef(0);
  const zIndexRef = useRef(10);

  const fullName = `${INTRO.firstName} ${INTRO.lastName}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize all pool elements off-screen and invisible
    itemsRef.current.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0, scale: 0.7, x: -1000, y: -1000 });
      }
    });

    const THRESHOLD = 75; // Distance in pixels before dropping the next photo

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (!lastPosRef.current) {
        lastPosRef.current = { x, y };
        return;
      }

      const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);

      if (dist >= THRESHOLD) {
        lastPosRef.current = { x, y };

        const poolIndex = currentIndexRef.current % POOL_SIZE;
        currentIndexRef.current += 1;
        zIndexRef.current += 1;

        const el = itemsRef.current[poolIndex];
        if (!el) return;

        // Random subtle tilt between -7 and +7 degrees for natural feel
        const rotation = gsap.utils.random(-7, 7);

        // Kill existing tweens on this specific element before triggering new one
        gsap.killTweensOf(el);

        // High performance GPU-accelerated GSAP timeline
        const cardW = el.offsetWidth || 180;
        const cardH = el.offsetHeight || 240;

        gsap.timeline()
          .set(el, {
            x: x - cardW / 2,
            y: y - cardH / 2,
            rotation: rotation,
            scale: 0.75,
            opacity: 0,
            zIndex: zIndexRef.current,
            force3D: true,
          })
          .to(el, {
            scale: 1,
            opacity: 1,
            duration: 0.28,
            ease: "power2.out",
          })
          .to(el, {
            opacity: 0,
            scale: 0.88,
            duration: 0.65,
            ease: "power2.inOut",
            delay: 0.45,
          });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      itemsRef.current.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] pt-12 pb-16 flex flex-col justify-between overflow-hidden select-none cursor-default"
      aria-label="Hero and interactive kinetic image trail"
    >
      {/* Subtle background ambient mesh */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 size-96 rounded-full bg-[radial-gradient(circle,rgba(255,74,61,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 size-80 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.04)_0%,transparent_70%)] blur-3xl"
        aria-hidden
      />

      {/* Top micro-tag & status */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono tracking-widest uppercase font-semibold">
          <span className="size-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span>Core Research & Applied Systems</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[0.7rem] tracking-wider text-zinc-400">
          <Compass className="size-3 text-zinc-400" />
          <span>MOVE CURSOR ACROSS SCREEN FOR KINETIC TRAIL</span>
        </div>
      </div>

      {/* Main Hero Typography: Bold, high-signal, award-winning */}
      <div className="relative z-20 my-auto py-8">
        <div className="text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-400 uppercase mb-3">
          AI/ML Engineer & Researcher
        </div>

        <h1
          className="leading-[0.92] tracking-tight text-zinc-950 m-0 font-[var(--display)] font-extrabold select-none"
          style={{
            fontSize: "clamp(3rem, 9.2vw, 7.8rem)",
          }}
        >
          {fullName}
        </h1>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FF4A3D] font-[var(--display)]">
            Machine Intelligence.
          </span>
          <span className="text-lg sm:text-2xl text-zinc-600 font-medium">
            Engineered at Scale.
          </span>
        </div>

        <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-600 font-normal leading-relaxed">
          Specializing in verifiable reasoning trees, latent diffusion manifold geometry, and ultra-high-throughput GPU inference pipelines.
        </p>
      </div>

      {/* Bottom telemetry hint */}
      <div className="relative z-20 flex items-center justify-between pt-6 border-t border-zinc-200/80 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-600 font-medium">ACTIVE RUNTIME // PORTFOLIO INTEL</span>
        </div>
        <div className="flex items-center gap-1.5 text-[0.68rem] text-zinc-400">
          <span>KINETIC TRAIL ACTIVE</span>
          <ArrowDownRight className="size-3 text-zinc-400" />
        </div>
      </div>

      {/* HIGH-PERFORMANCE GSAP IMAGE POOL (No React re-renders on mousemove) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {Array.from({ length: POOL_SIZE }).map((_, i) => {
          const photo = PROFILE_PHOTOS[i % PROFILE_PHOTOS.length]!;

          return (
            <div
              key={i}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                willChange: "transform, opacity",
              }}
              className="w-36 sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/90 bg-zinc-900 pointer-events-none select-none opacity-0"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="eager"
                draggable={false}
              />

              {/* Technical Monospace Tag on Photo */}
              {photo.tag && (
                <div className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[0.58rem] sm:text-[0.62rem] font-mono tracking-wider text-white text-center truncate pointer-events-none">
                  {photo.tag}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ImageTrailHero;
