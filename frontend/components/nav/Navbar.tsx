"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Cpu, FolderGit2, Mail } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  num: string;
  icon: typeof Briefcase;
}

const NAV_ITEMS: NavItem[] = [
  { id: "experience", label: "Experience", num: "01", icon: Briefcase },
  { id: "skills", label: "Skills", num: "02", icon: Cpu },
  { id: "projects", label: "Projects", num: "03", icon: FolderGit2 },
  { id: "contact", label: "Contact", num: "04", icon: Mail },
];

export function Navbar() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  // Smooth scroll handler with offset
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        if (!item) continue;
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          return;
        }
      }
      setActiveId("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="flex items-center gap-1.5 sm:gap-2"
      aria-label="Portfolio sections"
    >
      {/* Sliding Pill Navigation Bar */}
      <div
        onMouseLeave={() => setHoveredId(null)}
        className="relative flex items-center p-1 rounded-full bg-zinc-100/90 border border-zinc-200/80 backdrop-blur-md shadow-xs"
      >
        {NAV_ITEMS.map((item) => {
          const isHovered = hoveredId === item.id;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              className="relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer select-none focus-visible:outline-none"
            >
              {/* Fluid Sliding Background Pill */}
              {isHovered && (
                <motion.span
                  layoutId="nav-sliding-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-zinc-950 shadow-md"
                  style={{ zIndex: 1 }}
                />
              )}

              {/* Button Content */}
              <span
                className={`relative z-10 flex items-center gap-1.5 font-mono uppercase text-[0.68rem] sm:text-xs transition-colors duration-200 ${
                  isHovered
                    ? "text-white font-semibold"
                    : isActive
                    ? "text-zinc-950 font-bold"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                {/* Micro Index Number */}
                <span
                  className={`text-[0.6rem] transition-opacity duration-200 ${
                    isHovered
                      ? "text-[#FF4A3D]"
                      : isActive
                      ? "text-[#FF4A3D]"
                      : "text-zinc-400"
                  }`}
                >
                  {item.num}
                </span>

                {/* Section Label */}
                <span>{item.label}</span>

                {/* Micro Active Indicator Dot */}
                {isActive && !isHovered && (
                  <span className="size-1 rounded-full bg-[#FF4A3D] animate-ping ml-0.5" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
