import type { CSSProperties } from "react";
import { INTRO } from "./intro/intro.config";

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
        {/* Top bar */}
        <header
          className="rise flex items-center justify-between"
          style={{ "--d": ".35s" } as CSSProperties}
        >
          <div
            className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--display)", fontWeight: 700 }}
          >
            {fullName}
          </div>
          <button
            type="button"
            onClick={onReplay}
            className="px-4 py-2 text-xs md:text-sm font-medium tracking-wider uppercase transition-colors duration-200 border border-[var(--ink)]/20 hover:border-[var(--ink)] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-ink)] focus-visible:outline-offset-2 cursor-pointer"
            style={{ fontFamily: "var(--mono)" }}
            aria-label="Replay intro animation"
          >
            Replay intro
          </button>
        </header>

        {/* Hero content */}
        <section className="my-auto py-12 flex flex-col items-start gap-6">
          <h1
            className="rise leading-[0.95] tracking-tight text-[var(--ink)] m-0"
            style={{
              fontFamily: "var(--display)",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 8.6vw, 7.6rem)",
              "--d": ".55s",
            } as CSSProperties}
          >
            Portfolio coming soon.
          </h1>
          <p
            className="rise max-w-xl text-base md:text-xl font-normal leading-relaxed text-[var(--mute)] m-0"
            style={{
              fontFamily: "var(--body)",
              "--d": ".7s",
            } as CSSProperties}
          >
            Selected engineering work, interaction experiments, and motion studies currently in development.
          </p>
        </section>

        {/* Footer info */}
        <footer
          className="rise flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[var(--mute)] border-t border-[var(--ink)]/10 pt-6 gap-2"
          style={{ "--d": ".85s", fontFamily: "var(--mono)" } as CSSProperties}
        >
          <span>&copy; {new Date().getFullYear()} {fullName}. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for select projects
          </span>
        </footer>
      </div>
    </main>
  );
}
