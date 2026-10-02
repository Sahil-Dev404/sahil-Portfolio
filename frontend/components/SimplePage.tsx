"use client";

import type { CSSProperties } from "react";
import { INTRO } from "./intro/intro.config";
import ExperienceTimeline from "./experience/ExperienceTimeline";
import SkillsSection from "./skills/SkillsSection";
import ProjectsSection from "./projects/ProjectsSection";
import ContactSection from "./contact/ContactSection";
import { RotateCcw } from "lucide-react";
import Navbar from "./nav/Navbar";

import Footer from "./footer/Footer";

type Props = {
  onReplay: () => void;
};

export default function SimplePage({ onReplay }: Props) {
  const fullName = `${INTRO.firstName} ${INTRO.lastName}`;

  return (
    <main
      className="min-h-screen bg-[var(--ground)] text-[var(--ink)] flex flex-col justify-between"
      style={{
        paddingInline: "clamp(16px, 4vw, 48px)",
      }}
    >
      <div className="w-full max-w-[1240px] mx-auto min-h-screen flex flex-col justify-between py-8">
        {/* Top bar with Navigation */}
        <header
          className="rise flex items-center justify-between gap-4 sticky top-4 z-50 bg-[var(--ground)]/90 backdrop-blur-md py-2.5 px-3 rounded-2xl border border-zinc-200/50 shadow-2xs"
          style={{ "--d": ".35s" } as CSSProperties}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReplay}
              className="group text-left text-xl md:text-2xl font-bold tracking-tight text-zinc-950 hover:text-[#FF4A3D] transition-colors duration-200 cursor-pointer flex items-center gap-2 select-none focus-visible:outline-none"
              style={{ fontFamily: "var(--display)", fontWeight: 700 }}
              title="Click to replay intro animation"
            >
              <span>{fullName}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs font-mono text-[#FF4A3D] flex items-center gap-0.5">
                <RotateCcw className="size-3.5 -rotate-45" />
              </span>
            </button>
            <span className="hidden sm:inline-block px-2.5 py-1 text-[0.68rem] font-mono tracking-widest uppercase bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
              AI/ML Researcher
            </span>
          </div>

          {/* Animated Section Buttons on the Top Right */}
          <Navbar />
        </header>

        {/* Hero content */}
        <section className="pt-12 pb-6 flex flex-col items-start gap-4">
          <div
            className="rise inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono tracking-widest uppercase font-semibold"
            style={{ "--d": ".45s" } as CSSProperties}
          >
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            Core Research & Applied Systems
          </div>
          <h1
            className="rise leading-[0.96] tracking-tight text-[var(--ink)] m-0"
            style={{
              fontFamily: "var(--display)",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 6.2vw, 5.2rem)",
              "--d": ".55s",
            } as CSSProperties}
          >
            Machine Intelligence.
            <br />
            <span className="text-[var(--accent)]">Engineered at Scale.</span>
          </h1>
          <p
            className="rise max-w-2xl text-base md:text-lg font-normal leading-relaxed text-[var(--mute)] m-0"
            style={{
              fontFamily: "var(--body)",
              "--d": ".7s",
            } as CSSProperties}
          >
            Specializing in neuro-symbolic reasoning trees, latent diffusion manifold geometry, and ultra-high-throughput GPU inference pipelines.
          </p>
        </section>

        {/* Experience Timeline Section (with cursive scroll-animated line) */}
        <div className="rise" style={{ "--d": ".75s" } as CSSProperties}>
          <ExperienceTimeline />
        </div>

        {/* Technical Skills & Competencies Section */}
        <div className="rise" style={{ "--d": ".8s" } as CSSProperties}>
          <SkillsSection />
        </div>

        {/* The Requested Projects Part with Card Stack Animation */}
        <div className="rise" style={{ "--d": ".85s" } as CSSProperties}>
          <ProjectsSection />
        </div>

        {/* Contact Section */}
        <div className="rise" style={{ "--d": ".9s" } as CSSProperties}>
          <ContactSection />
        </div>

        {/* New Interactive Footer matching the reference screenshot */}
        <div className="rise" style={{ "--d": ".95s" } as CSSProperties}>
          <Footer />
        </div>
      </div>
    </main>
  );
}
