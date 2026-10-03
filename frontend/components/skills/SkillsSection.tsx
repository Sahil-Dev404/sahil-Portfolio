"use client";

import { useState } from "react";

export type SkillCategory = "dl" | "ml" | "lang" | "data" | "nlp" | "tools" | "web";

export interface SkillPill {
  id: string;
  name: string;
  category: SkillCategory | SkillCategory[];
  glowColor: string;
  icon: () => React.JSX.Element;
  rotation?: number; // subtle organic tilt like in reference
}

export const SKILL_PILLS: SkillPill[] = [
  // Languages
  {
    id: "python",
    name: "Python",
    category: "lang",
    glowColor: "#3776AB",
    rotation: -1.5,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.9 2c-3.1 0-5 .7-5 2.6v2h5.1v.6H4.2C2.1 7.2 1 8.5 1 11.2c0 2.8 1.4 4 3.7 4h1.7v-2.3c0-2.2 1.9-3.7 4.1-3.7h5.1V6.9c0-2.4-2.2-4.9-3.7-4.9zm-2.4 1.7c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
          fill="#387EB8"
        />
        <path
          d="M12.1 22c3.1 0 5-.7 5-2.6v-2h-5.1v-.6h7.8c2.1 0 3.2-1.3 3.2-4 0-2.8-1.4-4-3.7-4h-1.7v2.3c0 2.2-1.9 3.7-4.1 3.7H8.4v2.3c0 2.4 2.2 4.9 3.7 4.9zm2.4-1.7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
          fill="#E5A900"
        />
      </svg>
    ),
  },
  {
    id: "cpp",
    name: "C++",
    category: "lang",
    glowColor: "#00599C",
    rotation: 1.2,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2z"
          fill="#00599C"
        />
        <path
          d="M12 4.2l7.2 4.2v7.2L12 19.8l-7.2-4.2V8.4L12 4.2z"
          fill="#004482"
        />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          C++
        </text>
      </svg>
    ),
  },

  {
    id: "javascript",
    name: "JavaScript",
    category: ["lang", "web"],
    glowColor: "#F7DF1E",
    rotation: -1.3,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M7 17.5c0 1.5 1 2.2 2.4 2.2 1.5 0 2.2-.7 2.2-2.1v-6.6h-2.1v6.5c0 .5-.2.8-.7.8s-.7-.3-.7-.8V13H6.1v4.5zm8.4 2.3c2.4 0 3.7-1.2 3.7-3.1 0-1.8-1.2-2.5-2.7-3.1l-.6-.2c-.7-.3-1.1-.6-1.1-1.1 0-.5.4-.9 1.1-.9.8 0 1.3.4 1.5 1l1.7-.8c-.5-1.2-1.6-1.7-3.1-1.7-2 0-3.3 1.1-3.3 2.9 0 1.6 1 2.4 2.4 3l.6.2c.8.3 1.4.6 1.4 1.3 0 .6-.5 1-1.4 1-.9 0-1.6-.5-1.9-1.2l-1.8.9c.5 1.4 1.8 2.1 3.5 2.1z"
          fill="#000000"
        />
      </svg>
    ),
  },
  {
    id: "html",
    name: "HTML",
    category: ["lang", "web"],
    glowColor: "#E34F26",
    rotation: 1.5,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none">
        <path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#E34F26" />
        <path d="M12 3.7v16.5l4.9-1.5 1.3-15H12z" fill="#EF652A" />
        <path d="M7.4 6.5h9.2l-.3 3.2H12v2.5h3.9l-.4 4.5-3.5 1-3.5-1-.2-2.5h2.1l.1 1.2 1.5.4 1.5-.4.2-1.9H7.2L7.4 6.5z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "css",
    name: "CSS",
    category: ["lang", "web"],
    glowColor: "#1572B6",
    rotation: -1.8,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none">
        <path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#1572B6" />
        <path d="M12 3.7v16.5l4.9-1.5 1.3-15H12z" fill="#33A9DC" />
        <path d="M7.4 6.5h9.2l-.3 3.2H9.8l.2 2.5h6.3l-.4 4.5-3.9 1.1-3.9-1.1-.3-3.1h2.1l.1 1.5 1.7.5 1.7-.5.2-1.9H7.3l.1-6.7z" fill="#FFFFFF" />
      </svg>
    ),
  },

  // Deep Learning
  {
    id: "pytorch",
    name: "PyTorch",
    category: "dl",
    glowColor: "#EE4C2C",
    rotation: -1.6,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="#EE4C2C">
        <path d="M12.02 0c-.3 0-.58.15-.74.39L6.5 7.15c-.24.36-.18.84.15 1.12l2.36 1.99C7.45 12.04 6.5 14.42 6.5 17c0 4.14 3.36 7.5 7.5 7.5s7.5-3.36 7.5-7.5c0-4.71-3.46-8.73-8-9.42V.75c0-.41-.34-.75-.75-.75h-.23zm.48 2.25v4.29c3.34.66 5.86 3.59 5.86 7.08 0 3.14-2.43 5.72-5.51 5.97-3.08-.25-5.51-2.83-5.51-5.97 0-1.78.78-3.38 2.02-4.5l1.62 1.37c-.36.5-.58 1.11-.58 1.77 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.15 0-.3.02-.44.05L12.5 2.25zM17.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
      </svg>
    ),
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "dl",
    glowColor: "#FF6F00",
    rotation: 2.1,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <path
          d="M12 2.5l7.5 4.3v4.6l-7.5-4.3v-4.6zm-7.5 4.3L12 2.5v4.6L4.5 11.4V6.8z"
          fill="#FF6F00"
        />
        <path
          d="M12 7.1l7.5 4.3v4.6l-7.5-4.3V7.1zm-7.5 4.3l7.5-4.3v4.6l-7.5 4.3v-4.6z"
          fill="#FFA800"
        />
        <path
          d="M12 11.7l7.5 4.3v4.6l-7.5-4.3v-4.6zm-7.5 4.3l7.5-4.3v4.6L4.5 20.6v-4.6z"
          fill="#FF6F00"
        />
      </svg>
    ),
  },
  {
    id: "keras",
    name: "Keras",
    category: "dl",
    glowColor: "#D00000",
    rotation: -1.8,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#D00000" />
        <path
          d="M6 5.5h2.8v5.5l5.2-5.5h3.6l-5.6 5.8L18 18.5h-3.6l-4.5-5.9v5.9H6V5.5z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: "scikit",
    name: "Scikit-learn",
    category: "ml",
    glowColor: "#F7931E",
    rotation: 1.5,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <circle cx="9" cy="12" r="6" fill="#F7931E" fillOpacity="0.9" />
        <circle cx="15" cy="12" r="6" fill="#2563EB" fillOpacity="0.85" />
        <circle cx="12" cy="12" r="3" fill="#FFFFFF" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: "cnn",
    name: "CNN",
    category: "dl",
    glowColor: "#0284C7",
    rotation: -2,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "gnn",
    name: "GNN",
    category: "dl",
    glowColor: "#7C3AED",
    rotation: 2.4,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
        <circle cx="6" cy="6" r="3" fill="#7C3AED" fillOpacity="0.2" />
        <circle cx="18" cy="6" r="3" fill="#7C3AED" fillOpacity="0.2" />
        <circle cx="12" cy="18" r="3" fill="#7C3AED" fillOpacity="0.2" />
        <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
        <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
        <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
      </svg>
    ),
  },
  {
    id: "lstm",
    name: "LSTM & GRU",
    category: "dl",
    glowColor: "#DB2777",
    rotation: -1,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2">
        <path d="M4 12h3l2-6 4 12 2-6h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "ann",
    name: "ANN & RNN",
    category: "dl",
    glowColor: "#059669",
    rotation: 1,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
        <circle cx="5" cy="8" r="2.5" />
        <circle cx="5" cy="16" r="2.5" />
        <circle cx="19" cy="12" r="2.5" />
        <line x1="7.5" y1="8.5" x2="16.5" y2="11.5" />
        <line x1="7.5" y1="15.5" x2="16.5" y2="12.5" />
      </svg>
    ),
  },

  // Data Analysis
  {
    id: "numpy",
    name: "NumPy",
    category: "data",
    glowColor: "#0284C7",
    rotation: -2.3,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#013243" />
        <path
          d="M6 18V6h3l6 9V6h3v12h-3l-6-9v9H6z"
          fill="#4DABCF"
        />
      </svg>
    ),
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "data",
    glowColor: "#150458",
    rotation: 1.8,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <rect x="4" y="4" width="4" height="16" rx="1.5" fill="#E70488" />
        <rect x="10" y="8" width="4" height="12" rx="1.5" fill="#130654" />
        <rect x="16" y="5" width="4" height="15" rx="1.5" fill="#FFCA00" />
      </svg>
    ),
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    category: "data",
    glowColor: "#11557C",
    rotation: -1.2,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#11557C" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M7 14c1.5-4 3.5-4 5 0s3.5 4 5 0" stroke="#FF7F0E" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: "seaborn",
    name: "Seaborn",
    category: "data",
    glowColor: "#4C72B0",
    rotation: 1.4,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9.5" fill="#4C72B0" />
        <path
          d="M6 14c2-5 4-5 6 0s4 5 6 0"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "eda",
    name: "Exploratory Data Analysis",
    category: "data",
    glowColor: "#0891B2",
    rotation: -1.6,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 6-8" />
      </svg>
    ),
  },

  // Machine Learning Concepts
  {
    id: "feature-eng",
    name: "Feature Engineering",
    category: "ml",
    glowColor: "#7C3AED",
    rotation: 2.2,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "hyperparam",
    name: "Hyperparameter Tuning",
    category: "ml",
    glowColor: "#D97706",
    rotation: -1.7,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <circle cx="4" cy="12" r="2" fill="#D97706" />
        <circle cx="12" cy="10" r="2" fill="#D97706" />
        <circle cx="20" cy="14" r="2" fill="#D97706" />
      </svg>
    ),
  },
  {
    id: "cross-val",
    name: "Cross Validation",
    category: "ml",
    glowColor: "#059669",
    rotation: 1.1,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
        <rect x="3" y="5" width="4" height="14" rx="1" fill="#059669" fillOpacity="0.25" />
        <rect x="8" y="5" width="4" height="14" rx="1" />
        <rect x="13" y="5" width="4" height="14" rx="1" />
        <rect x="18" y="5" width="4" height="14" rx="1" />
      </svg>
    ),
  },

  // NLP
  {
    id: "nltk",
    name: "NLTK",
    category: "nlp",
    glowColor: "#2563EB",
    rotation: -2.1,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10M6 10h10M6 14h6" />
      </svg>
    ),
  },
  {
    id: "tokenization",
    name: "Tokenization",
    category: "nlp",
    glowColor: "#4F46E5",
    rotation: 1.5,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
        <rect x="3" y="7" width="7" height="10" rx="2" />
        <rect x="14" y="7" width="7" height="10" rx="2" />
      </svg>
    ),
  },
  {
    id: "vectorization",
    name: "Vectorization",
    category: "nlp",
    glowColor: "#7C3AED",
    rotation: -1.3,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
        <circle cx="5" cy="5" r="2" fill="#7C3AED" />
        <circle cx="12" cy="12" r="2" fill="#7C3AED" />
        <circle cx="19" cy="19" r="2" fill="#7C3AED" />
        <line x1="5" y1="5" x2="19" y2="19" strokeDasharray="3 3" />
      </svg>
    ),
  },

  // MLOps & Tools
  {
    id: "git",
    name: "Git",
    category: "tools",
    glowColor: "#F05032",
    rotation: 2.3,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <path
          d="M21.6 10.8L13.2 2.4a1.8 1.8 0 0 0-2.5 0l-1.8 1.8 3.2 3.2a2.1 2.1 0 0 1 2.7 2.7l3.1 3.1a2 2 0 1 1-1.3 1.3L13.5 11v5.6a2 2 0 1 1-1.8 0v-6.5a2 2 0 0 1-1.1-2.6L7.4 4.3 2.4 9.3a1.8 1.8 0 0 0 0 2.5l8.4 8.4a1.8 1.8 0 0 0 2.5 0l8.3-8.4a1.8 1.8 0 0 0 0-2.5z"
          fill="#F05032"
        />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    glowColor: "#24292F",
    rotation: -1.9,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="#24292F">
        <path d="M12 2C6.47 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    glowColor: "#007ACC",
    rotation: 1.6,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <path
          d="M17.5 2L5.8 11.2l6.2 4.9L17.5 2z"
          fill="#0065A9"
        />
        <path
          d="M17.5 22L5.8 12.8l6.2-4.9L17.5 22z"
          fill="#007ACC"
        />
        <path
          d="M22 4.8v14.4l-4.5 2.8V2L22 4.8z"
          fill="#1F9CF0"
        />
        <path
          d="M2.5 8.5l4.8 3.5-4.8 3.5c-.8.6-1.5.3-1.5-.7V9.2c0-1 .7-1.3 1.5-.7z"
          fill="#0065A9"
        />
      </svg>
    ),
  },
  {
    id: "jupyter",
    name: "Jupyter",
    category: "tools",
    glowColor: "#F37626",
    rotation: -2.2,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <path
          d="M12 4.5c-4.4 0-8 1.3-8 3s3.6 3 8 3 8-1.3 8-3-3.6-3-8-3zm0 9c-4.4 0-8 1.3-8 3s3.6 3 8 3 8-1.3 8-3-3.6-3-8-3z"
          fill="#F37626"
        />
        <circle cx="18.5" cy="5.5" r="1.5" fill="#4B5563" />
        <circle cx="5.5" cy="18.5" r="1.5" fill="#4B5563" />
      </svg>
    ),
  },
  {
    id: "colab",
    name: "Google Colab",
    category: "tools",
    glowColor: "#F9AB00",
    rotation: 1.3,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <path
          d="M7.5 7.5A4.5 4.5 0 0 0 3 12a4.5 4.5 0 0 0 4.5 4.5c2 0 3.7-1.3 4.3-3.1a5.6 5.6 0 0 1 0-2.8C11.2 8.8 9.5 7.5 7.5 7.5zm9 0c-2 0-3.7 1.3-4.3 3.1a5.6 5.6 0 0 1 0 2.8c.6 1.8 2.3 3.1 4.3 3.1A4.5 4.5 0 0 0 21 12a4.5 4.5 0 0 0-4.5-4.5z"
          fill="#F9AB00"
        />
      </svg>
    ),
  },
  {
    id: "dvc",
    name: "DVC",
    category: "tools",
    glowColor: "#13ADC7",
    rotation: -1.4,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#13ADC7" />
        <path
          d="M6 6l6 6-6 6V6zm6 0l6 6-6 6V6z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: ["web", "tools"],
    glowColor: "#009688",
    rotation: 1.8,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#009688" />
        <path
          d="M13 3.5L6.5 13H12L11 20.5L17.5 11H12.5L13 3.5Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React",
    category: "web",
    glowColor: "#61DAFB",
    rotation: -1.7,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#00D8FF" />
      </svg>
    ),
  },
  {
    id: "tailwindcss",
    name: "TailwindCSS",
    category: "web",
    glowColor: "#06B6D4",
    rotation: 1.5,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    id: "flask",
    name: "Flask",
    category: ["web", "tools"],
    glowColor: "#1F2937",
    rotation: 2,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="2">
        <path d="M9 3h6v4l4 9a2 2 0 0 1-1.8 2.8H6.8A2 2 0 0 1 5 16l4-9V3z" />
        <path d="M9 3v4M15 3v4M7 14h10" />
      </svg>
    ),
  },
  {
    id: "render",
    name: "Render",
    category: "tools",
    glowColor: "#059669",
    rotation: -1.7,
    icon: () => (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="#059669">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.9V14h3v-2h-3v-2.1a2 2 0 0 1 2-1.9h1V6h-1a4 4 0 0 0-4 4v2H9v2h2v2.9z" />
      </svg>
    ),
  },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Stack" },
    { id: "dl", label: "Deep Learning" },
    { id: "ml", label: "Machine Learning" },
    { id: "data", label: "Data & Analytics" },
    { id: "nlp", label: "NLP" },
    { id: "web", label: "Web & Full-Stack" },
    { id: "lang", label: "Languages" },
    { id: "tools", label: "MLOps & Tools" },
  ];

  return (
    <section
      id="skills"
      className="relative w-full rounded-[2rem] bg-gradient-to-b from-zinc-50/90 via-zinc-50/50 to-transparent border border-zinc-200/70 p-6 sm:p-8 my-8 shadow-xs overflow-hidden transition-colors scroll-mt-12"
      aria-label="Technical skills cloud"
    >
      {/* Subtle organic light accent blur that connects the experience to projects flow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/3 size-64 rounded-full bg-[radial-gradient(circle,rgba(255,74,61,0.06)_0%,transparent_70%)] blur-2xl"
        aria-hidden
      />
      <div className="absolute inset-0 pointer-events-none opacity-40 graph-grid" aria-hidden />

      {/* Header bar: Compact title + Category switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-2 text-[0.7rem] font-mono tracking-widest text-[#FF4A3D] uppercase">
            <span className="size-1.5 rounded-full bg-[#FF4A3D]" />
            <span>Tech Stack // 2024–2028</span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-[var(--display)]">
            Core Toolkit & Technologies
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Interactive competency cloud spanning neural architectures, statistical modeling, and ML pipelines.
          </p>
        </div>

        {/* Minimal Category Filter Pills on Light Surface */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white border border-zinc-200 shadow-2xs self-start sm:self-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-[0.7rem] font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-zinc-950 text-white font-semibold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Interactive Pill Cloud on Light Palette */}
      <div className="pt-6 pb-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-6xl 2xl:max-w-7xl mx-auto">
        {SKILL_PILLS.map((skill) => {
          const isDimmed =
            activeCategory !== "all" &&
            (Array.isArray(skill.category)
              ? !skill.category.includes(activeCategory as SkillCategory)
              : skill.category !== activeCategory);
          const isHovered = hoveredSkill === skill.id;
          const Icon = skill.icon;

          return (
            <div
              key={skill.id}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                transform: `rotate(${isHovered ? 0 : skill.rotation ?? 0}deg) scale(${
                  isHovered ? 1.05 : 1
                })`,
                boxShadow: isHovered
                  ? `0 10px 25px -3px ${skill.glowColor}25, 0 0 0 1.5px ${skill.glowColor}60`
                  : undefined,
              }}
              className={`group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full cursor-default select-none border transition-all duration-200 ${
                isDimmed
                  ? "opacity-25 scale-95 bg-zinc-100/60 border-zinc-200/50 text-zinc-400"
                  : "bg-white hover:bg-zinc-50/90 border-zinc-200 hover:border-zinc-300 text-zinc-900 shadow-xs hover:shadow-md"
              }`}
            >
              {/* Colored / Brand SVG Icon */}
              <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <Icon />
              </div>

              {/* Name */}
              <span className="text-xs sm:text-[0.84rem] font-medium tracking-tight text-zinc-800 group-hover:text-zinc-950">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subtle Footer Status Line */}
      <div className="mt-5 pt-3 border-t border-zinc-200/70 flex items-center justify-between text-[0.68rem] font-mono text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>PRODUCTION-READY COMPETENCY MATRIX</span>
        </span>
        <span className="text-zinc-500">INDEXED {SKILL_PILLS.length} FRAMEWORKS</span>
      </div>
    </section>
  );
}

export default SkillsSection;
