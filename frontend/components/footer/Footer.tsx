"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface DoodleCard {
  id: string;
  type: "image" | "svg";
  src?: string;
  rotate: number;
  yOffset: number;
  title: string;
  svgContent?: React.ReactNode;
}

const DOODLE_CARDS: DoodleCard[] = [
  {
    id: "card-1",
    type: "image",
    src: "/footer-cards/card-ai-brain.jpg",
    rotate: -6,
    yOffset: 3,
    title: "AI Neural Brain",
  },
  {
    id: "card-2",
    type: "svg",
    rotate: 8,
    yOffset: -5,
    title: "Happy Face",
    svgContent: (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2 stroke-zinc-900 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
        <circle cx="50" cy="50" r="32" strokeDasharray="3 3" />
        <circle cx="40" cy="45" r="3" fill="#18181b" />
        <circle cx="60" cy="45" r="3" fill="#18181b" />
        <path d="M 38 60 Q 50 72 62 60" />
        <path d="M 32 36 Q 40 32 46 36" />
        <path d="M 54 36 Q 60 32 68 36" />
      </svg>
    ),
  },
  {
    id: "card-3",
    type: "image",
    src: "/footer-cards/card-retro-mac.jpg",
    rotate: -3,
    yOffset: 4,
    title: "1984 Macintosh",
  },
  {
    id: "card-4",
    type: "svg",
    rotate: 9,
    yOffset: -7,
    title: "Scribble Ribbon",
    svgContent: (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2 stroke-zinc-800 fill-none stroke-[2.2] stroke-linecap-round">
        <path d="M 25 65 C 20 40, 45 25, 65 35 C 80 45, 60 75, 40 68 C 25 62, 35 40, 75 55" />
        <circle cx="45" cy="40" r="2" fill="#ef4444" stroke="none" />
      </svg>
    ),
  },
  {
    id: "card-5",
    type: "image",
    src: "/footer-cards/card-gpu-chip.jpg",
    rotate: -8,
    yOffset: -2,
    title: "Chippy Tensor GPU",
  },
  {
    id: "card-6",
    type: "svg",
    rotate: 5,
    yOffset: 6,
    title: "Stick Man Hi",
    svgContent: (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2 stroke-amber-500 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
        <circle cx="50" cy="30" r="14" />
        <circle cx="45" cy="27" r="1.5" fill="#f59e0b" stroke="none" />
        <circle cx="55" cy="27" r="1.5" fill="#f59e0b" stroke="none" />
        <path d="M 46 35 Q 50 39 54 35" />
        <line x1="50" y1="44" x2="50" y2="70" />
        <line x1="50" y1="52" x2="30" y2="40" />
        <line x1="50" y1="52" x2="70" y2="40" />
        <line x1="50" y1="70" x2="36" y2="88" />
        <line x1="50" y1="70" x2="64" y2="88" />
      </svg>
    ),
  },
  {
    id: "card-7",
    type: "image",
    src: "/footer-cards/card-hire-me.jpg",
    rotate: 3,
    yOffset: -4,
    title: "Hire Me Note",
  },
  {
    id: "card-8",
    type: "svg",
    rotate: -10,
    yOffset: 6,
    title: "Cute Flower",
    svgContent: (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2 stroke-amber-400 fill-none stroke-[2.2] stroke-linecap-round">
        <circle cx="50" cy="50" r="10" stroke="#f59e0b" />
        <circle cx="50" cy="32" r="8" />
        <circle cx="50" cy="68" r="8" />
        <circle cx="32" cy="50" r="8" />
        <circle cx="68" cy="50" r="8" />
        <circle cx="38" cy="38" r="8" />
        <circle cx="62" cy="38" r="8" />
        <circle cx="38" cy="62" r="8" />
        <circle cx="62" cy="62" r="8" />
        <circle cx="47" cy="49" r="1" fill="#f59e0b" stroke="none" />
        <circle cx="53" cy="49" r="1" fill="#f59e0b" stroke="none" />
        <path d="M 47 53 Q 50 55 53 53" stroke="#f59e0b" />
      </svg>
    ),
  },
  {
    id: "card-9",
    type: "image",
    src: "/footer-cards/card-coding-cat.jpg",
    rotate: -5,
    yOffset: -3,
    title: "Coding Cat",
  },
  {
    id: "card-10",
    type: "svg",
    rotate: 11,
    yOffset: 5,
    title: "Pink Bloom",
    svgContent: (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2 stroke-pink-500 fill-none stroke-[2] stroke-linecap-round">
        <circle cx="50" cy="50" r="8" />
        <ellipse cx="50" cy="28" rx="8" ry="14" />
        <ellipse cx="50" cy="72" rx="8" ry="14" />
        <ellipse cx="28" cy="50" rx="14" ry="8" />
        <ellipse cx="72" cy="50" rx="14" ry="8" />
        <ellipse cx="34" cy="34" rx="12" ry="7" transform="rotate(-45 34 34)" />
        <ellipse cx="66" cy="66" rx="12" ry="7" transform="rotate(-45 66 66)" />
        <ellipse cx="66" cy="34" rx="12" ry="7" transform="rotate(45 66 34)" />
        <ellipse cx="34" cy="66" rx="12" ry="7" transform="rotate(45 34 66)" />
      </svg>
    ),
  },
  {
    id: "card-11",
    type: "image",
    src: "/footer-cards/card-git-tree.jpg",
    rotate: -4,
    yOffset: -6,
    title: "Git Push Tree",
  },
  {
    id: "card-12",
    type: "svg",
    rotate: 7,
    yOffset: 3,
    title: "WOW Stars",
    svgContent: (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2 stroke-zinc-900 fill-none stroke-[2.2] stroke-linecap-round">
        <text x="50" y="48" textAnchor="middle" fontSize="19" fontFamily="var(--font-mono), monospace" fontWeight="bold" fill="#18181b" stroke="none">
          WOW
        </text>
        <path d="M 50 18 L 52 26 L 60 26 L 54 31 L 56 39 L 50 34 L 44 39 L 46 31 L 40 26 L 48 26 Z" stroke="#eab308" fill="#fef08a" />
        <path d="M 50 62 L 52 70 L 60 70 L 54 75 L 56 83 L 50 78 L 44 83 L 46 75 L 40 70 L 48 70 Z" stroke="#eab308" fill="#fef08a" />
      </svg>
    ),
  },
  {
    id: "card-13",
    type: "image",
    src: "/footer-cards/card-dev-coffee.jpg",
    rotate: -7,
    yOffset: -2,
    title: "Dev Coffee Mug",
  },
  {
    id: "card-14",
    type: "image",
    src: "/footer-cards/card-cute-star.jpg",
    rotate: 6,
    yOffset: 7,
    title: "Cute Star Pal",
  },
];

const STAR_QUOTES = [
  "⭐ You pressed the star! You're awesome!",
  "✨ +100 Developer Aura unlocked!",
  "🚀 Ready to create something cool together!",
  "☕ Cheers to clean code & late night ideas!",
  "❤️ Thanks for stopping by Sahil's portfolio!",
  "🎯 Neuro-symbolic pipelines activated!",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
}

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");
  const [starClicks, setStarClicks] = useState(0);
  const [isStarAnimating, setIsStarAnimating] = useState(false);
  const [starQuote, setStarQuote] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const starRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pupil eye tracking towards mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!starRef.current) return;
    const rect = starRef.current.getBoundingClientRect();
    const starCenterX = rect.left + rect.width / 2;
    const starCenterY = rect.top + rect.height / 2;
    const dx = e.clientX - starCenterX;
    const dy = e.clientY - starCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxOffset = 3;
    if (dist > 0) {
      setEyeOffset({
        x: (dx / dist) * Math.min(dist * 0.05, maxOffset),
        y: (dy / dist) * Math.min(dist * 0.05, maxOffset),
      });
    }
  };

  // Star click celebration
  const handleStarClick = () => {
    const nextClicks = starClicks + 1;
    setStarClicks(nextClicks);
    setIsStarAnimating(true);
    setTimeout(() => setIsStarAnimating(false), 900);

    const quote = STAR_QUOTES[(nextClicks - 1) % STAR_QUOTES.length];
    setStarQuote(quote);
    setTimeout(() => setStarQuote(null), 3500);

    // Spawn burst particles
    const colors = ["#FF4A3D", "#FBBF24", "#60A5FA", "#34D399", "#F472B6", "#A78BFA", "#FACC15"];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.4;
      const speed = 3.5 + Math.random() * 6;
      newParticles.push({
        id: Date.now() + i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 5,
        rotation: Math.random() * 360,
      });
    }
    setParticles(newParticles);
  };

  // Particles animation frame
  useEffect(() => {
    if (particles.length === 0) return;
    let animId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed > 1100) {
        setParticles([]);
        return;
      }

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.3,
          rotation: p.rotation + 7,
        }))
      );
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [particles.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Duplicate items for seamless continuous looping marquee
  const loopedCards = [...DOODLE_CARDS, ...DOODLE_CARDS];

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full mt-14 sm:mt-16 mb-4 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-zinc-50/95 via-white to-zinc-50/80 text-zinc-950 overflow-hidden border border-zinc-200/80 transition-all select-none shadow-xs"
    >
      {/* Subtle ambient lighting matching site aesthetic */}
      <div className="absolute top-0 right-1/4 w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(255,74,61,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-40 graph-grid" aria-hidden />

      {/* Main Content Container */}
      <div className="relative z-10 px-5 sm:px-8 lg:px-10 pt-7 sm:pt-9 pb-4 flex flex-col justify-between">
        {/* Top Row: Location & Headline + Right Side Nav */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-10">
          {/* Left Column: Live Location Badge & Headline */}
          <div className="flex-1 max-w-xl">
            {/* Live Location and Time Badge */}
            <div className="flex items-center gap-2 text-[0.7rem] font-mono tracking-widest uppercase text-zinc-500 mb-3.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
              </span>
              <span>PHILADELPHIA {currentTime || "10:26 AM"}</span>
            </div>

            {/* Serif Headline matching reference */}
            <h2
              className="text-2xl sm:text-3xl lg:text-[2.4rem] font-normal leading-[1.16] tracking-tight text-zinc-950"
              style={{
                fontFamily: "var(--font-display), Playfair Display, Georgia, serif",
              }}
            >
              Ready to create something cool together,
              <br />
              <span className="text-zinc-500 italic">or just press the star</span>
            </h2>
          </div>

          {/* Right Column: Explore & Contact Nav with Blue Dot */}
          <div className="flex items-start gap-8 sm:gap-14 pt-1">
            {/* Explore Column */}
            <div className="flex flex-col gap-2">
              <span className="text-[0.68rem] font-mono tracking-widest text-zinc-400 uppercase select-none">
                (EXPLORE)
              </span>
              <nav className="flex flex-col gap-1.5 text-xs font-semibold tracking-wide">
                <button
                  type="button"
                  onClick={() => scrollTo("experience")}
                  className="text-left text-zinc-600 hover:text-zinc-950 transition-colors duration-150 cursor-pointer uppercase"
                >
                  EXPERIENCE
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("skills")}
                  className="text-left text-zinc-600 hover:text-zinc-950 transition-colors duration-150 cursor-pointer uppercase"
                >
                  SKILLS
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("projects")}
                  className="text-left text-zinc-600 hover:text-zinc-950 transition-colors duration-150 cursor-pointer uppercase"
                >
                  PROJECTS
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="text-left text-zinc-600 hover:text-zinc-950 transition-colors duration-150 cursor-pointer uppercase"
                >
                  CONTACT
                </button>
              </nav>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col gap-2">
              <span className="text-[0.68rem] font-mono tracking-widest text-zinc-400 uppercase select-none">
                (CONTACT)
              </span>
              <nav className="flex flex-col gap-1.5 text-xs font-semibold tracking-wide">
                <a
                  href="https://linkedin.com/in/sahil-saini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 transition-colors duration-150 uppercase group"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="size-3 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                </a>
                <a
                  href="https://github.com/Sahil-Dev404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 transition-colors duration-150 uppercase group"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="size-3 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                </a>
                <a
                  href="mailto:sahilsaini@example.com"
                  className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 transition-colors duration-150 uppercase group"
                >
                  <span>EMAIL</span>
                  <ArrowUpRight className="size-3 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                </a>
              </nav>
            </div>

            {/* Interactive Blue Dot */}
            <div className="pt-1 hidden sm:block">
              <div
                title="A touch of blue inspiration"
                className="w-3 h-3 rounded-full bg-[#1A56DB] shadow-[0_0_10px_rgba(26,86,219,0.4)] hover:scale-125 transition-transform duration-200 cursor-pointer animate-pulse"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Automatic Left-to-Right Moving Track & Star Character */}
        <div className="relative mt-8 pt-2 pb-1 flex items-center justify-between">
          {/* Automatic Infinite Left-to-Right Moving Track (No Scrollbar) */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_30px,black_calc(100%-85px),transparent)] py-3">
            <div className="animate-marquee-ltr flex items-center gap-3">
              {loopedCards.map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className="relative group transition-all duration-300 cursor-pointer flex-shrink-0"
                  style={{
                    transform: `rotate(${card.rotate}deg) translateY(${card.yOffset}px)`,
                    marginLeft: index === 0 ? "0" : "-16px",
                  }}
                >
                  {/* Clean paper note card with pure artwork */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 bg-[#FAF9F5] rounded-sm p-1 shadow-[0_3px_12px_rgba(0,0,0,0.08)] border border-stone-200/90 transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-0 group-hover:z-40 group-hover:shadow-[0_16px_28px_rgba(0,0,0,0.2)]">
                    {/* Artwork / Doodle Box filling the card */}
                    <div className="relative w-full h-full bg-white rounded-xs overflow-hidden border border-stone-200/60 flex items-center justify-center">
                      {card.type === "image" && card.src ? (
                        <Image
                          src={card.src}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 72px, 88px"
                        />
                      ) : (
                        card.svgContent
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Interactive Star Character on the Bottom Right */}
          <div className="relative ml-2 flex-shrink-0 z-30 flex flex-col items-center">
            {/* Pop-up Speech Bubble when Star is Clicked */}
            {starQuote && (
              <div className="absolute -top-14 right-0 bg-zinc-950 text-white text-[0.72rem] font-medium px-3 py-1.5 rounded-lg shadow-xl border border-zinc-800 whitespace-nowrap animate-bounce flex items-center gap-1">
                <span>{starQuote}</span>
                <div className="absolute -bottom-1 right-6 w-2.5 h-2.5 bg-zinc-950 rotate-45 border-r border-b border-zinc-800" />
              </div>
            )}

            {/* Click Count Badge */}
            {starClicks > 0 && (
              <span className="mb-0.5 text-[0.62rem] font-mono text-amber-600 font-bold tracking-wider animate-fade-in">
                ⭐ {starClicks}
              </span>
            )}

            {/* Star Graphic with Animated Eye Pupils */}
            <div
              ref={starRef}
              onClick={handleStarClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleStarClick()}
              title="Press the star!"
              className={`relative cursor-pointer transition-transform duration-300 hover:scale-115 active:scale-95 select-none ${
                isStarAnimating ? "animate-spin" : ""
              }`}
              style={{
                filter: "drop-shadow(0 4px 12px rgba(250, 204, 21, 0.45))",
              }}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 100 100"
                className="w-11 h-11 sm:w-13 sm:h-13 stroke-zinc-950 stroke-[3] stroke-linejoin-round"
                fill="#FACC15"
              >
                {/* Five-point star */}
                <path
                  d="M 50 8 
                     L 61 36 
                     L 92 37 
                     L 67 56 
                     L 76 86 
                     L 50 68 
                     L 24 86 
                     L 33 56 
                     L 8 37 
                     L 39 36 Z"
                  fill="#FACC15"
                  stroke="#18181B"
                />

                {/* Left Eye */}
                <circle cx="43" cy="50" r="5" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
                {/* Right Eye */}
                <circle cx="57" cy="50" r="5" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />

                {/* Dynamic Pupils */}
                <circle
                  cx={43 + eyeOffset.x}
                  cy={50 + eyeOffset.y}
                  r="2.2"
                  fill="#18181B"
                  stroke="none"
                />
                <circle
                  cx={57 + eyeOffset.x}
                  cy={50 + eyeOffset.y}
                  r="2.2"
                  fill="#18181B"
                  stroke="none"
                />

                {/* Smile */}
                <path
                  d="M 46 60 Q 50 64 54 60"
                  stroke="#18181B"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Confetti Particles */}
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`,
                    boxShadow: `0 0 5px ${p.color}`,
                    transition: "opacity 0.2s linear",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Back to Top */}
        <div className="border-t border-zinc-200/80 pt-3 mt-3 flex flex-col sm:flex-row items-center justify-between text-[0.7rem] font-mono text-zinc-500 gap-2">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Sahil Saini. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 hidden sm:inline">Built with Next.js & PyTorch</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-zinc-600 hover:text-zinc-950 transition-colors duration-150 cursor-pointer flex items-center gap-1 group font-medium"
            >
              <span>Back to top</span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-150">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
