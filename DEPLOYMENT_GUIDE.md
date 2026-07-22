# ALLOCATOR.AI Zero-Cost Production Deployment Guide

Deploy the complete application to free-tier cloud infrastructure in under 10 minutes using **Vercel** (Frontend), **Render** (Backend API), and **Supabase** (PostgreSQL, pgvector, and Storage).

---

## 1. Database Setup (Supabase Free Tier)

1. Create a free project at [Supabase.com](https://supabase.com).
2. Enable `pgvector` extension in SQL Editor:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. Copy your Connection String (`DATABASE_URL`) and Anon API Key from Settings -> API.

---

## 2. Backend Deployment (Render Free Tier)

1. Sign in to [Render.com](https://render.com) and create a **New Web Service**.
2. Connect your GitHub repository and select the `/backend` directory.
3. Configure settings:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m app.seed.seed_data && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables:
   - `PROJECT_NAME`: `ALLOCATOR.AI Backend`
   - `DATABASE_URL`: Your Supabase PostgreSQL URL
   - `GEMINI_API_KEY`: Your Google AI Studio Free Key
5. Click **Deploy Web Service**.

---

## 3. Frontend Deployment (Vercel Free Tier)

1. Sign in to [Vercel.com](https://vercel.com) and import your repository.
2. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
3. Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://your-render-app.onrender.com/api/v1`
4. Click **Deploy**. Your app will be live on `https://your-app.vercel.app`.
