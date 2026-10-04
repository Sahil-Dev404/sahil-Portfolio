# Deployment Guide: Vercel (Frontend) + Render (Backend)

This repository is structured as a monorepo containing:
- `frontend/` - Next.js 16 (App Router + Tailwind CSS + GSAP)
- `backend/` - FastAPI + Pydantic + Uvicorn

---

## Part 1: Push Changes to GitHub

Before creating services on Render and Vercel, make sure your latest code and deployment configurations are pushed to GitHub:

```bash
git add .
git commit -m "Configure deployment settings for Render and Vercel"
git push origin main
```

---

## Part 2: Deploy Backend on Render

Render hosts your FastAPI backend as a free Python Web Service.

### Option A: Using the Render Dashboard (Recommended)

1. Go to [dashboard.render.com](https://dashboard.render.com) and click **New +** > **Web Service**.
2. Connect your GitHub repository: `Sahil-Dev404/sahil-Portfolio`.
3. Fill in the following settings:
   - **Name**: `sahil-portfolio-api` (or any unique name)
   - **Region**: Pick your closest region (e.g. Singapore, Frankfurt, or Oregon)
   - **Root Directory**: `backend` *(CRITICAL: do not leave blank)*
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`
4. Expand **Advanced** and set:
   - **Health Check Path**: `/api/health`
5. Under **Environment Variables**, add:
   - `PYTHON_VERSION`: `3.11.9`
   - `FRONTEND_ORIGIN`: `https://*.vercel.app` (or your specific Vercel URL once generated)
6. Click **Create Web Service**.
7. Wait 2–3 minutes for deployment to complete.
8. Copy your live backend URL (e.g. `https://sahil-portfolio-api.onrender.com`).
   - Test it by visiting `https://your-api.onrender.com/api/health` — it should return `{"status":"ok"}`.

### Option B: Using Render Blueprint (`render.yaml`)

Because we added `render.yaml` to the root of your repo, you can also:
1. Go to Render Dashboard > **New +** > **Blueprint**.
2. Select your repository. Render will automatically read `render.yaml` and configure the service.
3. Click **Apply**.

---

## Part 3: Deploy Frontend on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Under **Import Git Repository**, select `Sahil-Dev404/sahil-Portfolio`.
3. In the **Configure Project** screen:
   - **Project Name**: `sahil-portfolio` (or your choice)
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** and choose `frontend` *(CRITICAL)*
4. Expand **Environment Variables** and add:
   | Key | Value | Notes |
   |---|---|---|
   | `NEXT_PUBLIC_API_URL` | `https://sahil-portfolio-api.onrender.com` | Your live Render backend URL (no trailing slash) |
   | `NEXT_PUBLIC_FORMSPREE_ID` | `mdekqjla` | Your Formspree form ID |
5. Click **Deploy**.
6. Vercel will install dependencies, compile Next.js, and output your live URL (e.g. `https://sahil-portfolio.vercel.app`).

---

## Part 4: Final CORS & Cold Start Notes

1. **CORS already configured**:
   The backend in `app/main.py` is configured with `allow_origin_regex=r"https://.*\.vercel\.app"`. Any Vercel deployment (preview or production) will automatically be accepted by the backend.
   If you configure a custom domain on Vercel (e.g. `https://sahilsaini.dev`), add that URL to `FRONTEND_ORIGIN` in Render's Environment Variables settings.

2. **Render Free Tier Cold Starts**:
   Render's free tier spins down after ~15 minutes of inactivity. The first request after idling may take 30–50 seconds while the container wakes up. The contact form also falls back directly to Formspree if the backend is waking up, ensuring zero message loss!
