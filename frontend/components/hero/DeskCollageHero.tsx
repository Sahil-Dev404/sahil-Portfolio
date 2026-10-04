"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Terminal as TerminalIcon, Sparkles, RotateCcw } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import InteractiveRocket from "./InteractiveRocket";

interface DeskCollageHeroProps {
  onReplay?: () => void;
  fullName?: string;
}

export default function DeskCollageHero({
  onReplay,
  fullName = "Sahil Saini",
}: DeskCollageHeroProps) {
  const [isPlayingVinyl, setIsPlayingVinyl] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative w-full h-[calc(100vh-1rem)] min-h-[620px] max-h-[880px] text-zinc-950 select-none flex flex-col justify-between mb-2 sm:mb-3">
      {/* Ambient subtle light glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,74,61,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* 1. LANYARD & ID BADGE - Connected directly to the top edge with pendulum sway (Desktop) */}
      <div
        className="hidden lg:block absolute -top-4 sm:-top-6 lg:-top-8 left-[3.5%] lg:left-[4%] xl:left-[4.5%] 2xl:left-[5%] z-40 pointer-events-none select-none animate-lanyard-sway"
        style={{ transformOrigin: "50% 0px" }}
      >
        {/* Top ceiling clip mounting anchor */}
        <div className="w-10 h-2.5 bg-zinc-900 rounded-b-xs mx-auto shadow-xs border-x border-b border-zinc-700/80 -mb-0.5 relative z-20" />

        {/* Extended Lanyard Strap hanging from the very top */}
        <div className="flex flex-col items-center mx-auto">
          {/* Long woven fabric strap extending from the top ceiling */}
          <div className="w-9 h-36 sm:h-40 xl:h-44 bg-[#18181B] shadow-md relative overflow-hidden flex items-center justify-center border-x border-zinc-800">
            {/* Woven text running vertically along the strap */}
            <div
              className="relative z-10 flex flex-col items-center justify-center font-mono text-[0.62rem] sm:text-[0.68rem] font-bold text-zinc-200 select-none leading-[1.28] sm:leading-[1.34] tracking-widest uppercase"
              aria-label="ENGINEER"
            >
              {"ENGINEER".split("").map((char, idx) => (
                <span key={idx} className="block text-center drop-shadow-xs">
                  {char}
                </span>
              ))}
            </div>
            {/* Ribbed fabric weave texture */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_4px)] pointer-events-none" />
          </div>

          {/* Metal Carabiner Clip & Ring hooking into the badge */}
          <div className="w-7 h-5 rounded-xs bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 border border-zinc-500 shadow-xs -mt-1 flex items-center justify-center z-10">
            <div className="w-3.5 h-1.5 bg-zinc-800 rounded-xs" />
          </div>
          {/* Metal swivel loop passing through the punch hole */}
          <div className="w-3 h-4 border-2 border-zinc-400 rounded-b-sm -mt-0.5 z-10" />
        </div>

        {/* Badge Holder Card - Matching Yan Liu Reference Image */}
        <div className="w-64 sm:w-[264px] bg-[#18181A] text-white rounded-[24px] shadow-[0_25px_55px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3)] border border-zinc-700/80 relative overflow-hidden -mt-2 transition-all duration-300 group hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)] pointer-events-auto">
          {/* Cutout punch slot */}
          <div className="mx-auto w-12 h-2.5 rounded-full bg-zinc-950 border border-zinc-700/90 mt-2.5 shadow-inner" />

          {/* Upper Section with Dot Grid Overlay */}
          <div className="px-5 pt-3 pb-3 relative">
            {/* Subtle dot matrix pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Name in large, confident typography matching reference */}
            <h3 className="relative z-10 text-3xl font-extrabold tracking-tight text-white font-[var(--display)] leading-none mt-1">
              Sahil Saini
            </h3>
            {/* Subtitle matching the reference aesthetic */}
            <p className="relative z-10 text-[0.76rem] text-zinc-300/90 mt-2.5 leading-relaxed font-normal">
              Love exploring, neural prototyping, storytelling, and visual craft
            </p>
          </div>

          {/* Subtle separator */}
          <div className="w-full h-px bg-zinc-800/80" />

          {/* Lower Section with Circular Cutout Photo */}
          <div className="p-4 bg-[#141416]/90 flex flex-col items-center">
            {/* Circular Cutout Photo */}
            <div
              className="group relative size-32 rounded-full border-2 border-zinc-700/80 ring-4 ring-black/50 shadow-2xl overflow-hidden bg-zinc-900 my-1 select-none"
            >
              <Image
                src="/sahil/sahil-photo.jpg"
                alt="Sahil Saini"
                fill
                className="object-cover object-[50%_28%] scale-100 transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="128px"
                priority
              />
              <div
                className="absolute inset-0 rounded-full ring-2 ring-transparent transition-all duration-300 pointer-events-none group-hover:ring-[#FF4A3D]/40"
              />
            </div>

            {/* Minimalist ID tag */}
            <div className="mt-2 text-center text-[0.58rem] font-mono tracking-widest text-zinc-500 uppercase">
              SAHIL // AI RESEARCHER
            </div>

            {/* Quick Profile Social Buttons on Badge */}
            <div className="mt-2.5 flex items-center justify-center gap-2">
              <a
                href="https://www.linkedin.com/in/sahil-saini-a47b40324/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sahil Saini LinkedIn Profile"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800/90 hover:bg-[#0A66C2] text-zinc-300 hover:text-white border border-zinc-700 text-[0.62rem] font-mono tracking-wider transition-all duration-200 shadow-2xs hover:scale-105"
              >
                <LinkedInIcon className="size-3 fill-current" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Sahil-Dev404"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sahil Saini GitHub Profile"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[0.62rem] font-mono tracking-wider transition-all duration-200 shadow-2xs hover:scale-105"
              >
                <GitHubIcon className="size-3 fill-current" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full h-full px-2 sm:px-4 lg:px-6 pt-1 pb-2 flex flex-col justify-between flex-1">
        {/* Unified Top Header Bar matching the below design & color */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-zinc-600 border-b border-zinc-200/80 pb-3 relative z-30">
          {/* Left: ● SAHIL SAINI (with replay click) */}
          <button
            type="button"
            onClick={onReplay}
            className="group relative z-50 flex items-center gap-2 cursor-pointer select-none text-left focus-visible:outline-none py-1 -my-1 pr-3"
            aria-label="Replay intro animation"
          >
            <span className="size-2 rounded-full bg-[#FF4A3D] animate-pulse" />
            <span className="font-bold text-zinc-950 group-hover:text-[#FF4A3D] transition-colors whitespace-nowrap">
              {fullName}
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs text-[#FF4A3D] ml-0.5">
              <RotateCcw className="size-3 -rotate-45 inline" />
            </span>
          </button>

          {/* Right: EXPERIENCE  SKILLS  PROJECTS  CONTACT ↗ */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-8 text-[0.72rem] font-mono tracking-widest uppercase relative z-50">
            <button
              type="button"
              onClick={() => scrollTo("experience")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer relative group py-1"
            >
              <span>EXPERIENCE</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF4A3D] group-hover:w-full transition-all duration-200" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("skills")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer relative group py-1"
            >
              <span>SKILLS</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF4A3D] group-hover:w-full transition-all duration-200" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer relative group py-1"
            >
              <span>PROJECTS</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF4A3D] group-hover:w-full transition-all duration-200" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer flex items-center gap-1 group py-1"
            >
              <span>CONTACT</span>
              <span className="text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150">
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESK COLLAGE CANVAS (Desktop Scattered / Mobile Adaptive) */}
        {/* ======================================================== */}
        <div className="relative w-full flex-1 my-2 flex items-center justify-center overflow-visible">

          {/* Mobile Lanyard Badge (centered on small screens) */}
          <div
            className="lg:hidden relative z-30 my-4 select-none animate-lanyard-sway cursor-pointer"
            style={{ transformOrigin: "50% 0px" }}
          >
            {/* Mobile Hanging Strap */}
            <div className="flex flex-col items-center mx-auto">
              <div className="w-8 h-16 bg-[#18181B] shadow-sm relative overflow-hidden flex items-center justify-center border-x border-zinc-800">
                <span
                  className="text-[0.55rem] font-mono tracking-[0.2em] text-zinc-400 rotate-90 whitespace-nowrap uppercase select-none font-semibold"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  SAHIL // AI
                </span>
              </div>
              <div className="w-6 h-3.5 rounded-xs bg-gradient-to-b from-zinc-300 to-zinc-500 border border-zinc-400 -mt-0.5 flex items-center justify-center" />
            </div>

            {/* Mobile Card */}
            <div className="w-64 bg-[#18181A] text-white rounded-[22px] shadow-xl border border-zinc-700/80 relative overflow-hidden -mt-1 p-4">
              <div className="mx-auto w-10 h-2 rounded-full bg-zinc-950 border border-zinc-700/90 mb-3" />
              <h3 className="text-2xl font-extrabold tracking-tight text-white font-[var(--display)] leading-none text-center">
                Sahil Saini
              </h3>
              <p className="text-[0.7rem] text-zinc-300 text-center mt-1.5 leading-snug">
                Love exploring, prototyping, storytelling, and visual craft
              </p>
              <div
                className="group/avatar relative size-24 rounded-full border-2 border-zinc-700 ring-4 ring-black/40 overflow-hidden mx-auto my-3 shadow-lg bg-zinc-900 cursor-pointer select-none"
              >
                {/* Real photo */}
                <Image
                  src="/sahil/sahil-portrait.jpg"
                  alt="Sahil Saini"
                  fill
                  className="object-cover object-top transition-opacity duration-300 ease-out group-hover/avatar:opacity-0"
                  sizes="96px"
                />
                {/* Cartoon photo */}
                <Image
                  src="/sahil/sahil-cartoon.jpg"
                  alt="Sahil Saini Cartoon"
                  fill
                  className="object-cover object-top opacity-0 transition-all duration-300 ease-out group-hover/avatar:opacity-100 group-hover/avatar:scale-105"
                  sizes="96px"
                />
              </div>

              {/* Mobile Profile Social Buttons */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <a
                  href="https://www.linkedin.com/in/sahil-saini-a47b40324/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sahil Saini LinkedIn Profile"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/90 hover:bg-[#0A66C2] text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition-colors"
                >
                  <LinkedInIcon className="size-3.5 fill-current" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Sahil-Dev404"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sahil Saini GitHub Profile"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition-colors"
                >
                  <GitHubIcon className="size-3.5 fill-current" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Physical Desk Sticker Badges */}
          <div className="md:hidden flex items-center justify-center gap-6 my-3 z-25">
            <a
              href="https://www.linkedin.com/in/sahil-saini-a47b40324/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sahil Saini LinkedIn Profile"
              className="group cursor-pointer select-none active:scale-95 transition-transform"
            >
              <div className="w-10 h-3 bg-[#D7C2A3]/85 shadow-2xs mx-auto -mb-1.5 rotate-[-4deg] rounded-2xs border border-stone-300/40" />
              <div className="relative w-16 h-16 rounded-full drop-shadow-md ring-2 ring-white shadow-lg overflow-hidden rotate-[-6deg]">
                <Image
                  src="/hero-collage/linkedin-badge.svg"
                  alt="LinkedIn Badge"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </a>

            <a
              href="https://github.com/Sahil-Dev404"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sahil Saini GitHub Profile"
              className="group cursor-pointer select-none active:scale-95 transition-transform"
            >
              <div className="w-10 h-3 bg-[#C9B18B]/85 shadow-2xs mx-auto -mb-1.5 rotate-[4deg] rounded-2xs border border-stone-300/40" />
              <div className="relative w-16 h-16 rounded-full drop-shadow-md ring-2 ring-white shadow-lg overflow-hidden rotate-[6deg]">
                <Image
                  src="/hero-collage/github-badge.svg"
                  alt="GitHub Badge"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </a>
          </div>

          {/* 2. CENTERPIECE SIGNATURE & EDITORIAL STATEMENT */}
          <div className="text-center my-6 lg:my-0 lg:absolute lg:top-[44%] xl:top-[45%] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-30 pointer-events-none whitespace-nowrap">
            {/* Signature style title */}
            <div className="relative inline-block">
              <h1
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-zinc-950 font-bold leading-none select-none tracking-normal"
                style={{
                  fontFamily: "var(--font-signature), 'Caveat', cursive",
                }}
              >
                Sahil Saini
                <span className="inline-block text-[#FF4A3D] font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-8xl ml-1 font-bold">
                  .
                </span>
              </h1>
            </div>

            {/* Sub-statement matching Yan Liu's 'I THINK, THEN I BUILD' */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-mono tracking-[0.28em] text-zinc-500 uppercase">
              <span>I THINK</span>
              <span className="text-[#FF4A3D]">,</span>
              <span>THEN I BUILD</span>
            </div>
            <p className="mt-2 text-xs font-mono text-zinc-400 tracking-wider uppercase">
              AI / ML Engineer & Researcher
            </p>
          </div>

          {/* 3. TORN PAPER WITH ICED COFFEE & PENCIL (Top Center/Left) */}
          <div className="hidden lg:block absolute left-[34%] xl:left-[35%] top-1 z-10 transition-transform duration-300 hover:rotate-1 hover:scale-105">
            {/* Washi Masking Tape */}
            <div className="w-24 h-6 bg-[#D7C2A3]/80 backdrop-blur-xs shadow-xs mx-auto -mb-3 rotate-[-3deg] z-20 relative border border-stone-300/40 rounded-xs" />
            {/* Torn White Paper Backing */}
            <div className="w-44 h-44 bg-[#FAFAF9] rounded-sm p-2 shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-stone-200/90 rotate-[2deg] overflow-hidden flex items-center justify-center">
              <div className="relative size-36 rounded-xs overflow-hidden">
                <Image
                  src="/hero-collage/iced-coffee.jpg"
                  alt="Front view iced coffee glass & yellow pencil"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
            </div>
          </div>

          {/* 4. POTTED MONSTERA PLANT (Front eye-level view matching reference) */}
          <div className="hidden lg:block absolute left-[23%] xl:left-[25%] top-4 xl:top-6 z-15 transition-transform duration-300 hover:-rotate-3 hover:scale-110 cursor-pointer select-none">
            <div className="w-32 h-36 xl:w-36 xl:h-40 relative drop-shadow-[0_14px_24px_rgba(0,0,0,0.18)]">
              <Image
                src="/hero-collage/plant.png"
                alt="Potted monstera front view desk plant"
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 144px, 160px"
              />
            </div>
          </div>

          {/* 4B. PHYSICAL DESK COLLAGE: LINKEDIN VINYL STICKER BADGE */}
          <div className="hidden md:block absolute left-[47%] lg:left-[49%] xl:left-[50%] top-5 lg:top-6 xl:top-7 z-25 select-none">
            <a
              href="https://www.linkedin.com/in/sahil-saini-a47b40324/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer block transition-all duration-300 hover:z-35 focus-visible:outline-none"
              aria-label="Sahil Saini LinkedIn Profile"
            >
              {/* Sticker Container with Strong Asymmetrical Tilt (-12°) */}
              <div className="relative rotate-[-12deg] group-hover:rotate-[-2deg] group-hover:scale-115 group-hover:-translate-y-1.5 transition-all duration-300 ease-out origin-center">
                {/* Textured Japanese Craft Washi Tape */}
                <div
                  className="w-14 h-4 bg-[#D9C4A5]/90 backdrop-blur-xs shadow-xs mx-auto -mb-2.5 z-30 relative border-y border-stone-400/40 rounded-2xs pointer-events-none rotate-[-6deg]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 4px)",
                  }}
                />

                {/* Die-Cut Vinyl Badge with Realistic Multi-Layer Depth */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 xl:w-26 xl:h-26 rounded-full drop-shadow-[0_16px_24px_rgba(10,102,194,0.42)] ring-4 ring-white shadow-2xl overflow-hidden group-hover:drop-shadow-[0_24px_38px_rgba(10,102,194,0.65)] transition-all bg-white">
                  <Image
                    src="/hero-collage/linkedin-badge.svg"
                    alt="LinkedIn Profile Circular Badge"
                    fill
                    className="object-cover"
                    sizes="104px"
                  />

                  {/* Sweeping Holographic Gloss Sheen on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out pointer-events-none" />

                  {/* Tactile Dog-Ear Sticker Peel (bottom-left) */}
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-gradient-to-tr from-zinc-300 via-zinc-100 to-white shadow-xs rounded-tr-xs border-r border-t border-zinc-300/80 pointer-events-none" />
                </div>

                {/* Pop-up Pill Tag on Hover */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-zinc-950/95 text-white font-mono text-[0.55rem] font-bold px-2.5 py-0.5 rounded-full border border-zinc-700 shadow-2xl flex items-center gap-1.5 z-35 backdrop-blur-xs">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LINKEDIN</span>
                  <span className="text-[#0A66C2]">↗</span>
                </div>
              </div>
            </a>
          </div>

          {/* Cursive handwritten desk annotation bridging the space between them */}
          <div className="hidden lg:block absolute left-[56%] lg:left-[57%] xl:left-[58%] top-15 xl:top-17 z-20 pointer-events-none select-none rotate-[-4deg]">
            <span
              className="text-xs xl:text-sm text-zinc-500/90 font-normal tracking-wide whitespace-nowrap"
              style={{ fontFamily: "var(--font-signature), 'Caveat', cursive" }}
            >
              find my code & connect ↗ ~
            </span>
          </div>

          {/* 4C. PHYSICAL DESK COLLAGE: GITHUB VINYL STICKER BADGE */}
          <div className="hidden md:block absolute left-[64%] lg:left-[66%] xl:left-[67%] top-7 lg:top-8 xl:top-10 z-25 select-none">
            <a
              href="https://github.com/Sahil-Dev404"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer block transition-all duration-300 hover:z-35 focus-visible:outline-none"
              aria-label="Sahil Saini GitHub Profile"
            >
              {/* Sticker Container with Counter Asymmetrical Tilt (+14°) */}
              <div className="relative rotate-[14deg] group-hover:rotate-[2deg] group-hover:scale-115 group-hover:-translate-y-1.5 transition-all duration-300 ease-out origin-center">
                {/* Terracotta Brick Washi Tape */}
                <div
                  className="w-14 h-4 bg-[#C59B76]/90 backdrop-blur-xs shadow-xs mx-auto -mb-2.5 z-30 relative border-y border-stone-400/40 rounded-2xs pointer-events-none rotate-[6deg]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 4px)",
                  }}
                />

                {/* Die-Cut Vinyl Badge with Realistic Multi-Layer Depth */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 xl:w-26 xl:h-26 rounded-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)] ring-4 ring-white shadow-2xl overflow-hidden group-hover:drop-shadow-[0_24px_38px_rgba(0,0,0,0.7)] transition-all bg-zinc-950">
                  <Image
                    src="/hero-collage/github-badge.svg"
                    alt="GitHub Profile Circular Badge"
                    fill
                    className="object-cover"
                    sizes="104px"
                  />

                  {/* Sweeping Holographic Gloss Sheen on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-in-out pointer-events-none" />

                  {/* Tactile Dog-Ear Sticker Peel (bottom-right) */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-tl from-zinc-300 via-zinc-100 to-white shadow-xs rounded-tl-xs border-l border-t border-zinc-300/80 pointer-events-none" />
                </div>

                {/* Pop-up Pill Tag on Hover */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-zinc-950/95 text-white font-mono text-[0.55rem] font-bold px-2.5 py-0.5 rounded-full border border-zinc-700 shadow-2xl flex items-center gap-1.5 z-35 backdrop-blur-xs">
                  <span className="text-amber-400">★</span>
                  <span>GITHUB</span>
                  <span className="text-zinc-400">↗</span>
                </div>
              </div>
            </a>
          </div>

          {/* 5. TECH BOARDING PASS / TICKET (Top Right) - Rich Interactive Animations */}
          <div className="hidden lg:block absolute right-6 lg:right-8 top-2 z-15 group cursor-pointer select-none">
            <div className="w-80 bg-white rounded-xl border border-zinc-300/90 shadow-md p-3.5 flex items-center justify-between rotate-[-2deg] relative overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-[0deg] group-hover:scale-105 group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)]">
              {/* Sweeping holographic sheen reflection across ticket surface */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-30" />

              {/* Perforation semicircular ticket notches at top and bottom */}
              <div className="absolute -top-2 right-[78px] size-4 rounded-full bg-white border border-zinc-300/80 shadow-inner z-20" />
              <div className="absolute -bottom-2 right-[78px] size-4 rounded-full bg-white border border-zinc-300/80 shadow-inner z-20" />

              {/* Left ticket body */}
              <div className="flex-1 pr-4 border-r-2 border-dashed border-zinc-300/90 relative">
                {/* Pop-in 'BOARDED ✓' red ink stamp on hover */}
                <div className="absolute right-1 top-2.5 opacity-0 scale-150 rotate-[-15deg] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out border-2 border-[#FF4A3D] text-[#FF4A3D] rounded-xs px-1.5 py-0.5 font-mono text-[0.52rem] font-black uppercase tracking-widest pointer-events-none bg-white/95 shadow-xs z-25">
                  BOARDED ✓
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-mono text-zinc-400 uppercase tracking-widest">
                    BOARDING PASS
                  </span>
                  {/* Radar pulse indicator */}
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                  </span>
                </div>

                <h4 className="text-base font-extrabold tracking-tight text-zinc-950 font-mono mt-0.5 group-hover:text-[#FF4A3D] transition-colors duration-200">
                  RESEARCH X SYSTEMS
                </h4>

                <div className="flex items-center gap-4 mt-2 text-[0.65rem] font-mono text-zinc-500">
                  <div>
                    <span className="block text-zinc-400 text-[0.55rem]">TIME</span>
                    <span className="font-semibold text-zinc-800">ANYTIME</span>
                  </div>
                  <div>
                    <span className="block text-zinc-400 text-[0.55rem]">HOST</span>
                    <span className="font-semibold text-zinc-800">SAHIL DEV</span>
                  </div>
                  <div>
                    <span className="block text-zinc-400 text-[0.55rem]">GATE</span>
                    <span className="font-semibold text-[#FF4A3D] group-hover:animate-pulse">GPU-01</span>
                  </div>
                </div>
              </div>

              {/* Right ticket stub with peel rotation and red laser barcode scan */}
              <div className="pl-3.5 flex flex-col items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5 group-hover:rotate-[3deg] origin-left">
                <div className="text-[0.6rem] font-mono font-bold text-zinc-800 rotate-90 my-2">
                  2026 // PASS
                </div>

                {/* Barcode container with sweeping red laser line */}
                <div className="relative flex items-center gap-0.5 h-8 overflow-hidden px-0.5">
                  {/* Glowing Laser Scan Line */}
                  <div className="absolute inset-x-0 h-0.5 bg-[#FF4A3D] shadow-[0_0_8px_#FF4A3D] top-0 -translate-y-full group-hover:translate-y-8 transition-transform duration-600 ease-in-out z-10" />

                  <span className="w-0.5 h-full bg-zinc-950" />
                  <span className="w-1.5 h-full bg-zinc-950" />
                  <span className="w-0.5 h-full bg-zinc-950" />
                  <span className="w-1 h-full bg-zinc-950" />
                  <span className="w-2 h-full bg-zinc-950" />
                  <span className="w-0.5 h-full bg-zinc-950" />
                  <span className="w-1.5 h-full bg-zinc-950" />
                </div>
              </div>
            </div>
          </div>

          {/* 6. INTERACTIVE ROCKET (Facing Left with Fire Hover Animation) */}
          <div className="hidden lg:block absolute right-[14%] xl:right-[17%] top-[27%] xl:top-[29%] z-20">
            <InteractiveRocket />
          </div>

          {/* 6B. CONVERSE CHUCK TAYLOR SNEAKER (Bottom Center Empty Space) */}
          <div
            className="hidden md:block absolute left-[46%] lg:left-[48%] xl:left-[50%] bottom-6 lg:bottom-8 xl:bottom-10 z-20 cursor-pointer transition-all duration-300 hover:scale-115 hover:rotate-3 group"
          >
            <div className="relative rotate-[6deg]">
              {/* Converse Sneaker Cutout Image with Drop Shadow */}
              <div className="relative w-36 h-30 sm:w-40 sm:h-34 xl:w-44 xl:h-38 drop-shadow-[0_16px_22px_rgba(0,0,0,0.22)]">
                <Image
                  src="/hero-collage/converse-cutout.png"
                  alt="Red Converse Chuck Taylor All Star high-top sneaker"
                  fill
                  className="object-contain"
                  sizes="176px"
                />
              </div>
              {/* Sneaker Badge Label Tag */}
              <div className="absolute -bottom-2 left-1 bg-zinc-900/90 text-white text-[0.55rem] font-mono px-2 py-0.5 rounded-full border border-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                CHUCK 70 ★ ALL STAR
              </div>
            </div>
          </div>

          {/* 6C. NIKE AIR FORCE 1 SNEAKER POLAROID (In open grid space to the left of ID card) */}
          <div className="hidden lg:block absolute left-0.5 sm:left-1 lg:left-1.5 top-2 lg:top-3 z-30 transition-transform duration-300 hover:rotate-1 hover:scale-105 cursor-pointer">
            {/* Washi Masking Tape */}
            <div className="w-14 h-3.5 bg-[#E0D1BA]/85 backdrop-blur-xs shadow-2xs mx-auto -mb-2 rotate-[4deg] z-20 relative border border-stone-300/40 rounded-2xs" />
            {/* Polaroid Backing */}
            <div className="w-28 sm:w-30 bg-white rounded-xs p-1.5 pb-2 shadow-[0_10px_22px_rgba(0,0,0,0.12)] border border-stone-200/90 rotate-[-3deg] flex flex-col items-center">
              <div className="relative w-24 h-20 sm:w-26 sm:h-22 rounded-2xs overflow-hidden bg-zinc-50 flex items-center justify-center">
                <Image
                  src="/hero-collage/nike-af1.png"
                  alt="Nike Air Force 1 sneaker"
                  fill
                  className="object-contain p-1"
                  sizes="112px"
                />
              </div>
              <span className="text-[0.52rem] font-mono text-stone-500 block text-center mt-1 font-medium">
                AF1 ’07 // fresh
              </span>
            </div>
          </div>

          {/* 7. INTERACTIVE TERMINAL WINDOW (Bottom Center/Left) */}
          <div className="hidden md:block absolute left-4 lg:left-[21%] xl:left-[23%] bottom-8 lg:bottom-10 z-25 transition-transform duration-300 hover:scale-105">
            <div className="w-68 sm:w-76 bg-[#18181B] text-zinc-200 rounded-xl shadow-xl border border-zinc-800 p-3 font-mono text-[0.68rem] rotate-[-2deg]">
              {/* Traffic light buttons */}
              <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-zinc-800">
                <span className="size-2 rounded-full bg-[#FF5F56]" />
                <span className="size-2 rounded-full bg-[#FFBD2E]" />
                <span className="size-2 rounded-full bg-[#27C93F]" />
                <span className="text-[0.6rem] text-zinc-500 ml-2">sahil-saini — zsh</span>
              </div>
              <div className="space-y-1">
                <div className="text-zinc-400">
                  <span className="text-emerald-400">~ $</span> whoami
                </div>
                <div className="text-white font-medium pl-2">
                  AI/ML Engineer & Researcher
                </div>
                <div className="text-zinc-400 pt-0.5">
                  <span className="text-emerald-400">~ $</span> cat focus_areas.json
                </div>
                <div className="text-zinc-300 pl-2 text-[0.62rem] text-[#FF4A3D] break-words">
                  [&quot;GNN&quot;, &quot;deep_learning&quot;, &quot;DSA&quot;, &quot;reasoning_trees&quot;]
                </div>
              </div>
            </div>
          </div>

          {/* 8. VINYL RECORD "VIBE CODING" (Bottom Left) - Matching Reference */}
          <div
            onClick={() => setIsPlayingVinyl(!isPlayingVinyl)}
            className="hidden md:block absolute left-2 sm:left-4 bottom-8 lg:bottom-10 z-20 cursor-pointer transition-transform duration-300 hover:scale-110"
            aria-label="Spin vinyl record"
          >
            <div className="w-32 bg-white rounded-xl p-2 shadow-lg border border-zinc-200/90 rotate-[-5deg] flex flex-col items-center">
              {/* Spinning Vinyl Graphic */}
              <div className="relative size-20 rounded-full bg-zinc-950 shadow-inner flex items-center justify-center ring-2 ring-zinc-800">
                <div
                  className={`size-full rounded-full flex items-center justify-center ${
                    isPlayingVinyl ? "animate-spin" : ""
                  }`}
                  style={{ animationDuration: "3s" }}
                >
                  {/* Vinyl grooves */}
                  <div className="size-16 rounded-full border border-zinc-800 flex items-center justify-center">
                    <div className="size-12 rounded-full border border-zinc-800 flex items-center justify-center">
                      {/* Center label */}
                      <div className="size-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-zinc-950" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1.5 text-center">
                <span className="text-[0.55rem] font-mono tracking-widest text-zinc-400 uppercase block">
                  PLAYLIST
                </span>
                <span className="text-[0.65rem] font-bold text-zinc-900 font-mono block">
                  Vibe Coding ♫
                </span>
              </div>
            </div>
          </div>

          {/* 9. PINNED POLAROID KRAFT PAPER BOARD (Bottom Right) - Matching Reference */}
          <div className="relative mt-6 lg:mt-0 lg:absolute lg:right-4 lg:bottom-1 xl:bottom-2 z-20 transition-transform duration-300 hover:rotate-0 hover:scale-105">
            {/* Washi tape on top of kraft paper */}
            <div className="w-24 h-5 bg-[#C9B18B]/80 backdrop-blur-xs shadow-xs mx-auto -mb-2.5 rotate-[3deg] z-30 relative border border-stone-300/40 rounded-xs" />

            {/* Kraft Paper Board */}
            <div className="w-72 sm:w-80 bg-[#EDE5D8] rounded-xl p-3 shadow-[0_10px_24px_rgba(0,0,0,0.16)] border border-stone-300 rotate-[2deg] relative">
              <div className="flex items-center justify-between mb-2 text-[0.58rem] font-mono tracking-wider text-stone-600 border-b border-stone-300 pb-1">
                <span>LAB JOURNAL // SNAPSHOTS</span>
                <span>★ 2024–2026</span>
              </div>

              {/* 2x2 Polaroid Collage Grid */}
              <div className="grid grid-cols-2 gap-2">
                {/* Polaroid 1: Workstation Setup */}
                <div className="bg-white p-1 pb-1.5 rounded-xs shadow-xs border border-stone-200 rotate-[-2deg] transition-transform hover:scale-105">
                  <div className="relative w-full h-18 sm:h-20 rounded-2xs overflow-hidden bg-black">
                    <Image
                      src="/hero-collage/sahil-laptop-balanced.jpg"
                      alt="Sahil Saini dev workstation laptop"
                      fill
                      className="object-contain object-center"
                      sizes="140px"
                    />
                  </div>
                  <span className="text-[0.55rem] font-mono text-stone-500 block text-center mt-0.5">
                    dev workstation
                  </span>
                </div>

                {/* Polaroid 2: PyTorch Neural Code */}
                <div className="bg-white p-1 pb-1.5 rounded-xs shadow-xs border border-stone-200 rotate-[3deg] transition-transform hover:scale-105">
                  <div className="relative w-full h-18 sm:h-20 rounded-2xs overflow-hidden bg-zinc-100">
                    <Image
                      src="/hero-collage/code.jpg"
                      alt="PyTorch deep learning code"
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                  <span className="text-[0.55rem] font-mono text-stone-500 block text-center mt-0.5">
                    gpu_tensor.py
                  </span>
                </div>

                {/* Polaroid 3: Sahil looking at campus arch */}
                <div className="bg-white p-1 pb-1.5 rounded-xs shadow-xs border border-stone-200 rotate-[1deg] transition-transform hover:scale-105">
                  <div className="relative w-full h-18 sm:h-20 rounded-2xs overflow-hidden bg-zinc-100">
                    <Image
                      src="/sahil/sahil-campus-cap.jpg"
                      alt="Sahil Saini on campus"
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                  <span className="text-[0.55rem] font-mono text-stone-500 block text-center mt-0.5">
                    campus innovation
                  </span>
                </div>

                {/* Polaroid 4: Campus Architecture */}
                <div className="bg-white p-1 pb-1.5 rounded-xs shadow-xs border border-stone-200 rotate-[-3deg] transition-transform hover:scale-105">
                  <div className="relative w-full h-18 sm:h-20 rounded-2xs overflow-hidden bg-zinc-100">
                    <Image
                      src="/sahil/campus-arch.jpg"
                      alt="Innovation campus arch"
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                  <span className="text-[0.55rem] font-mono text-stone-500 block text-center mt-0.5">
                    architectural arch
                  </span>
                </div>
              </div>

              {/* Handwritten script at bottom */}
              <div className="mt-1.5 text-right">
                <span
                  className="text-stone-700 text-xs font-normal"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
                >
                  capture moments & research ~
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Status Ticker */}
        <div className="border-t border-zinc-200/80 pt-2 pb-1 flex flex-col sm:flex-row items-center justify-between text-[0.68rem] sm:text-xs font-mono text-zinc-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CORE RESEARCH: GRAPH NEURAL NETWORKS & GEOMETRIC DEEP LEARNING</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">BASED IN INDIA // READY TO COLLABORATE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
