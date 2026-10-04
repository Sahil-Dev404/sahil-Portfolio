"use client";

import type { CSSProperties } from "react";
import { INTRO } from "./intro/intro.config";
import ExperienceTimeline from "./experience/ExperienceTimeline";
import AboutEditorial from "./about/AboutEditorial";
import SkillsSection from "./skills/SkillsSection";
import ProjectsSection from "./projects/ProjectsSection";
import ContactSection from "./contact/ContactSection";
import Footer from "./footer/Footer";
import DeskCollageHero from "./hero/DeskCollageHero";

type Props = {
  onReplay: () => void;
};

export default function SimplePage({ onReplay }: Props) {
  const fullName = `${INTRO.firstName} ${INTRO.lastName}`;

  return (
    <main
      className="min-h-screen text-[var(--ink)] flex flex-col justify-between overflow-x-clip"
      style={{
        paddingInline: "clamp(12px, 2.5vw, 36px)",
      }}
    >
      <div className="w-full max-w-[1680px] 2xl:max-w-[1840px] mx-auto min-h-screen flex flex-col justify-between pt-1 sm:pt-2 pb-8 sm:pb-12">
        {/* Main Desk Collage Hero with Unified Navigation (Yan Liu style) */}
        <div className="rise" style={{ "--d": ".35s" } as CSSProperties}>
          <DeskCollageHero onReplay={onReplay} fullName={fullName} />
        </div>

        {/* Editorial About Statement (Yan Liu handwritten manifesto style) */}
        <div className="rise" style={{ "--d": ".55s" } as CSSProperties}>
          <AboutEditorial />
        </div>

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
