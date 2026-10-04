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

export interface ProjectDiagramStep {
  step: string;
  title: string;
  desc: string;
}

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  longDescription?: string;
  accent?: string;
  initials?: string;
  stat?: string;
  image?: string;
  tag?: string;
  href?: string;
  tech?: string;
  github?: string;
  live?: string;
  highlights?: string[];
  diagramSteps?: ProjectDiagramStep[];
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
    name: "Student Performance Predictor",
    role: "End-to-End Machine Learning Pipeline",
    description:
      "End-to-end ML system predicting student mathematics scores from 7 demographic & academic indicators, achieving R² = 0.88 with Linear Regression.",
    longDescription:
      "A production-grade, modular ML pipeline built from the ground up to predict student exam performance. Features systematic exploratory data analysis, automated ColumnTransformer pipelines (OneHotEncoder for categorical features + StandardScaler for numerical scores), benchmark evaluation across 9 regression algorithms (Linear Regression, Ridge, Lasso, KNN, Decision Tree, Random Forest, XGBoost, CatBoost, AdaBoost), and live inference serving via a Flask web application on Render.",
    tech: "Python · Scikit-learn · CatBoost · XGBoost · Flask · Pandas · Render",
    accent: "#f8d66d",
    initials: "SP",
    stat: "R² = 0.88",
    tag: "Regression Analysis",
    image: "/images/projects/student-performance-architecture.jpg",
    github: "https://github.com/Sahil-Dev404/End-to-End-Student-Performance-Indicator",
    live: "https://end-to-end-student-performance-indicator.onrender.com/",
    highlights: [
      "1,000 student records analyzed across 7 demographic, parental education, lunch, and test prep indicators.",
      "Benchmarked 9 regression algorithms; Linear Regression achieved top generalization with R² = 0.88 and lowest variance.",
      "Industrial MLOps architecture: decoupled Data Ingestion, Data Transformation, Model Trainer, and Prediction pipelines.",
      "Custom logging and exception handling framework with automated artifact serialization (model.pkl, preprocessor.pkl).",
    ],
    diagramSteps: [
      { step: "01", title: "Raw Data Ingestion", desc: "Ingests 1,000 records across 7 demographic & academic features with automated train/test splits" },
      { step: "02", title: "ColumnTransformer Pipeline", desc: "OneHotEncoder for categorical features & StandardScaler for numerical scores" },
      { step: "03", title: "Multi-Model Benchmark", desc: "Evaluated 9 regressors (Linear, Ridge, Lasso, KNN, DT, RF, XGBoost, CatBoost, AdaBoost)" },
      { step: "04", title: "Optimal Model Selection", desc: "Linear Regression achieved R² = 0.88 with minimal complexity and robust generalization" },
      { step: "05", title: "Flask & Render Deployment", desc: "Interactive prediction UI & REST endpoints deployed live on Render cloud platform" },
    ],
  },
  {
    name: "Shelf Sense — Book Recommender",
    role: "Content-Based NLP Recommendation Engine",
    description:
      "Content-based recommendation engine utilizing NLTK, Gensim embeddings, and TF-IDF Cosine Similarity across 15,000 features to match books semantically.",
    longDescription:
      "An intelligent information retrieval system that maps literary semantic proximity across thousands of titles. Merges book synopses, author backgrounds, genres, and contextual metadata into high-dimensional representations, computing directional cosine similarity to deliver nuanced recommendations with instant autocomplete search.",
    tech: "Python 3.10+ · Scikit-learn · NLTK · Gensim · Flask · Gunicorn · Render",
    accent: "#78dcca",
    initials: "SS",
    stat: "15K Features",
    tag: "Recommendation System",
    image: "/images/projects/book-recommendation-architecture.jpg",
    github: "https://github.com/Sahil-Dev404/Book-Recommendation-System",
    live: "https://book-recommendation-system-l2x7.onrender.com/",
    highlights: [
      "NLTK text normalization pipeline: tokenization, custom literary stopword suppression, and lemmatization.",
      "High-dimensional TF-IDF vectorization with 15,000 unigram/bigram n-gram features and Gensim embeddings.",
      "Sub-15ms Cosine Similarity scoring across book feature vectors for instant top-N candidate retrieval.",
      "Fast, lightweight Flask + Gunicorn web interface with live fuzzy-matched title autocomplete and health monitoring.",
    ],
    diagramSteps: [
      { step: "01", title: "Corpus & Metadata Ingestion", desc: "Ingests rich book titles, author profiles, genres, descriptions, and ratings" },
      { step: "02", title: "NLP Text Normalization", desc: "Tokenization, punctuation stripping, custom stopword suppression, and WordNet lemmatization" },
      { step: "03", title: "Vectorization & Embeddings", desc: "Constructs a 15,000-dimensional TF-IDF matrix capturing semantic literary relationships" },
      { step: "04", title: "Pairwise Cosine Metric", desc: "Computes directional cosine similarity matrix between query books and corpus candidates" },
      { step: "05", title: "Ranking & Autocomplete API", desc: "Flask & Gunicorn backend delivers ranked top-K recommendations with live search" },
    ],
  },
  {
    name: "SOCLens — Compliance AI",
    role: "Automated Security Audit & Compliance",
    description:
      "Privacy-first platform that parses multi-page SOC 2 Type 1 & 2 audit PDFs, extracting controls, exceptions, subservice orgs, and mapping CUECs using TF-IDF.",
    longDescription:
      "A privacy-centric compliance intelligence platform designed to eliminate the manual overhead of vendor security reviews. Ingests 100+ page SOC 2 Type 1 and Type 2 audit PDFs, performs native text extraction with Tesseract OCR fallback, and automatically maps Complementary User Entity Controls (CUECs) to internal controls using TF-IDF cosine similarity, exporting structured data to JSON and Excel.",
    tech: "FastAPI · Uvicorn · Python 3.11 · Scikit-learn · Tesseract OCR · React · Vite · Vercel",
    accent: "#b9a7ff",
    initials: "SL",
    stat: "SOC 2 Type 1 & 2",
    tag: "Compliance Engineering",
    image: "/images/projects/soclens-architecture.jpg",
    github: "https://github.com/Sahil-Dev404/System-and-Organization-controls-2-report-info-extraction",
    live: "https://system-and-organization-controls-2.vercel.app/",
    highlights: [
      "100% private, on-premise execution: parses confidential audit PDFs locally with zero external LLM API leakage.",
      "Automated extraction of report metadata, auditor opinion letters, control exceptions, and subservice vendor risks.",
      "CUEC mapping engine: applies TF-IDF and Cosine Similarity to map vendor controls to internal controls (Mapped, Partial, Gap).",
      "Full-stack architecture: asynchronous FastAPI backend on Render with modern React/Vite frontend on Vercel and multi-sheet Excel export.",
    ],
    diagramSteps: [
      { step: "01", title: "PDF Validation & Ingestion", desc: "Magic-byte (%PDF) verification and streaming upload supporting files up to 50MB" },
      { step: "02", title: "Text Parsing & OCR Fallback", desc: "Extracts native PDF text streams with automatic Tesseract OCR fallback for scanned pages" },
      { step: "03", title: "Heuristic Section Segmentation", desc: "Segments Scope, Auditor's Opinion, System Description, and Test Exceptions" },
      { step: "04", title: "CUEC Semantic Alignment", desc: "TF-IDF vector matching maps vendor CUECs against internal controls with confidence scoring" },
      { step: "05", title: "Interactive React Dashboard", desc: "Real-time compliance dashboard on Vercel with structured JSON & styled Excel workbook export" },
    ],
  },
  {
    name: "Forest Fire Prediction System",
    role: "Meteorological ML & Wildfire Modeling",
    description:
      "Predicts Algerian Forest Fire Weather Index (FWI) from 246 meteorological records, achieving R² = 0.9842 using L2 Ridge Regularization.",
    longDescription:
      "An end-to-end meteorological machine learning system designed to forecast the Forest Fire Weather Index (FWI) using 246 observations from the Bejaia and Sidi Bel-abbes regions of Algeria. Evaluates temperature, relative humidity, wind speed, precipitation, and moisture indices (FFMC, DMC, ISI) to predict fire hazard severity, deployed as a live cloud application on Render.",
    tech: "Python · Scikit-learn · Flask · Pandas · NumPy · Render",
    accent: "#ff9f68",
    initials: "FF",
    stat: "R² = 0.9842",
    tag: "Wildfire Modeling",
    image: "/images/projects/forest-fire-architecture.jpg",
    github: "https://github.com/Sahil-Dev404/forest-fire-ml",
    live: "https://forest-fire-ml-2.onrender.com/",
    highlights: [
      "246 meteorological records analyzed spanning temperature, RH, wind speed, rain, FFMC, DMC, and ISI.",
      "Conducted extensive EDA, correlation heatmaps, and multicollinearity handling across Algerian wildfire zones.",
      "Ridge Regression model achieved exceptional accuracy with R² = 0.9842, MSE = 0.045, and MAE = 0.158.",
      "Lightweight, production-ready Flask application deployed live on Render with automated standard scaling inference.",
    ],
    diagramSteps: [
      { step: "01", title: "Climatic Data Ingestion", desc: "246 observations spanning Algerian regions (Temperature, Humidity, Wind, Rain, FFMC, DMC, ISI)" },
      { step: "02", title: "Data Preprocessing & Scaling", desc: "Handling missing data, feature scaling via StandardScaler, and regional categorical encoding" },
      { step: "03", title: "Regression Benchmarking", desc: "Evaluated Linear, Ridge, Lasso, and ElasticNet models against Fire Weather Index (FWI)" },
      { step: "04", title: "Ridge Regularization (λ=1.0)", desc: "Achieved outstanding predictive accuracy with R² = 0.9842 and minimal generalization error" },
      { step: "05", title: "Cloud Web Deployment", desc: "Flask microservice deployed live on Render for real-time hazard estimation and scoring" },
    ],
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
  defaultActiveIndex = 1,
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
  const [windowWidth, setWindowWidth] = useState(1200);
  const touchStartX = useRef<number | null>(null);

  // Responsive spread detection for smooth scaling across viewports
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop keeps full 168 spread; mobile dynamically tightens so cards never cause horizontal overflow
  const effectiveSpread =
    windowWidth < 480 ? 34 : windowWidth < 768 ? 58 : spread;

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

  // Mobile Touch Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        // Swiped left -> next card
        activate((activeIndex + 1) % cards.length);
      } else {
        // Swiped right -> previous card
        activate((activeIndex - 1 + cards.length) % cards.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={cn(
        "relative flex flex-col min-h-full w-full items-center justify-center overflow-visible py-6 sm:py-8 px-2 sm:px-4",
        className,
      )}
    >
      <div
        ref={stageRef}
        className="relative h-[500px] sm:h-[550px] w-full max-w-[1040px] flex items-center justify-center touch-pan-y"
        onMouseLeave={close}
        onBlur={leaveFocus}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
                "group absolute left-1/2 top-1/2 w-[min(82vw,21.5rem)] h-[500px] sm:h-[515px] flex flex-col justify-between origin-bottom cursor-pointer rounded-[1.9rem] border border-zinc-900/15 bg-gradient-to-b from-[#FCFBF8] via-[#FAF9F5] to-[#F4F2EB] p-4 text-[#141414] outline-none select-none",
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
              <div className="relative shrink-0">
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
                  <ArrowUpRight className="size-5 stroke-[2.2]" aria-hidden />
                </span>
              </div>

              <div className="px-2 pb-1 pt-3.5 flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.72rem] font-mono font-bold uppercase tracking-[0.18em] text-zinc-700">
                      {item.role}
                    </p>
                    <span className="size-1.5 rounded-full bg-zinc-950" />
                  </div>
                  <h3 className="mt-1.5 text-[1.45rem] sm:text-[1.6rem] font-semibold leading-tight tracking-[-0.03em] text-zinc-950 font-[var(--display)] min-h-[2.4rem] sm:min-h-[2.6rem] flex items-center">
                    {item.name}
                  </h3>
                  <p className="mt-1 max-w-[17.5rem] text-[0.82rem] sm:text-[0.86rem] font-medium leading-[1.38] tracking-[-0.01em] text-zinc-700 line-clamp-3">
                    {item.description}
                  </p>
                  {item.tech && (
                    <div className="mt-auto pt-2 border-t border-zinc-900/10">
                      <p className="text-[0.65rem] font-mono font-medium text-zinc-600 truncate">
                        {item.tech}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-zinc-900/15 pt-2.5 shrink-0">
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

      {/* Mobile Swipe Indicators & Navigation Dots (< md) */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-40 select-none">
        {cards.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => activate(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === activeIndex
                ? "w-7 h-2 bg-zinc-950"
                : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400"
            }`}
            aria-label={`Go to project card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default OrbitCardStack;
