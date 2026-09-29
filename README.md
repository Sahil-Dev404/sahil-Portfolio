# Portfolio Project

A modern portfolio featuring a custom GSAP walk-and-reveal intro animation, built with Next.js (App Router), TypeScript, Tailwind CSS, and a FastAPI starter backend.

## Project Structure

```
portfolio/
├── frontend/                        (Next.js app, everything the browser runs)
│   ├── app/
│   │   ├── layout.tsx               (fonts via next/font, metadata, <html lang="en">)
│   │   ├── page.tsx                 (server component, renders <Home />)
│   │   └── globals.css              (tokens, intro styles, reveal animation)
│   ├── components/
│   │   ├── Home.tsx                 ("use client": owns replay state, renders Intro + SimplePage)
│   │   ├── SimplePage.tsx           (the plain placeholder page)
│   │   └── intro/
│   │       ├── Intro.tsx            ("use client": the GSAP timeline and markup)
│   │       ├── intro.config.ts      (timings and name, easy to tweak)
│   │       ├── Character.tsx        (inline SVG character)
│   │       └── Character.module.css (walk cycle keyframes)
│   ├── public/
│   │   └── reference/
│   │       ├── 01-end-of-push.png   (screenshot 1)
│   │       ├── 02-mid-push.png      (screenshot 2)
│   │       └── 03-start-of-push.png (screenshot 3)
│   ├── .env.example                 (NEXT_PUBLIC_API_URL=http://localhost:8000)
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                         (FastAPI starter, not needed by the intro yet)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  (FastAPI app, CORS, router registration)
│   │   ├── config.py                (settings read from environment variables)
│   │   ├── schemas.py               (Pydantic models)
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── health.py            (GET /api/health)
│   │       └── contact.py           (POST /api/contact, placeholder)
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md                    (how to create a venv, install, run)
├── .gitignore                       (node_modules, .next, .venv, __pycache__, .env, .DS_Store)
└── README.md                        (how to run both folders, where to change the name and timings)
```

---

## Getting Started

### 1. Frontend Setup & Run (Port 3000)

The frontend is completely self-contained and runs without needing the backend.

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the intro animation and portfolio placeholder.

To verify code quality and build:
```bash
npm run lint
npm run build
```

### 2. Backend Setup & Run (Port 8000)

The backend is a starter FastAPI scaffold ready for expansion (contact form handling, email dispatch, persistence, etc.).

**Windows (PowerShell):**
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**macOS / Linux:**
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The interactive API documentation is accessible at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## Customization Guide

### How to Change the Name and Timings

All intro configurations are centralized in [`frontend/components/intro/intro.config.ts`](frontend/components/intro/intro.config.ts):

```ts
export const INTRO = {
  firstName: "Sahil",   // line 1 of the huge red name
  lastName: "Saini",    // line 2 of the huge red name
  push: 4800,           // ms: character pushes wall across screen
  hold: 1000,           // ms: pause on name page after wall exits
  exit: 950,            // ms: name page slides up & away
} as const;
```

Adjust `push`, `hold`, and `exit` to speed up or slow down each phase of the intro.

### How to Replace or Edit the Character

The character is an isolated SVG component in [`frontend/components/intro/Character.tsx`](frontend/components/intro/Character.tsx) paired with animation keyframes in [`frontend/components/intro/Character.module.css`](frontend/components/intro/Character.module.css).

To substitute your own illustration:
1. Replace the SVG in `Character.tsx`, ensuring the character's hands touch the right boundary of the viewBox (viewBox default `0 0 200 260`) so they align flush against the black wall.
2. The walking cycle keyframes (leg rotations, body bobbing, foot unstep, and arm shoves) are defined in `Character.module.css`.

### How to Customize Colors & Design Tokens

CSS variables are defined in [`frontend/app/globals.css`](frontend/app/globals.css):
- `--accent`: The red shade used for the hero name (`#FF4A3D`).
- `--wall`: Pure black wall color (`#000000`).
- `--ground`: Pure white background (`#FFFFFF`).
- `--font-display`, `--font-mono`, `--font-body`: Managed via `next/font/google` in `layout.tsx`.
