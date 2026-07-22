# ALLOCATOR.AI - Enterprise Agentic AI Trainer Allocation Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python 3.12](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)](https://python.org)
[![Supabase pgvector](https://img.shields.io/badge/Supabase-pgvector-3ECF8E?logo=supabase)](https://supabase.com/)
[![Google Gemini 1.5](https://img.shields.io/badge/AI-Gemini%201.5%20Pro-4285F4?logo=google)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ALLOCATOR.AI** is an enterprise-grade autonomous SaaS web platform that automates technical trainer matching and resource allocation between universities, bootcamps, and industry experts. Built with **Next.js 15 App Router**, **FastAPI**, **LangGraph**, and **Supabase pgvector**, the platform replaces 3–5 days of manual search and negotiation with autonomous AI matching in under 4 seconds.

---

## 🏗️ System Architecture

```mermaid
graph TD
    Client["Next.js 15 Frontend<br/>(React 19 / Tailwind / Framer Motion)"]
    
    subgraph FastAPI Backend Engine
        API["FastAPI Gateway (/api/v1)"]
        Auth["Supabase JWT & RBAC Middleware"]
        ORMSvc["SQLAlchemy 2.0 Async Data Access Layer"]
        
        subgraph Multi-Agent Matching System
            Supervisor["Supervisor Orchestrator Agent"]
            ParseAgent["Request Understanding Agent"]
            VectorAgent["pgvector Matcher Agent"]
            AvailAgent["Availability Checker Agent"]
            BudgetAgent["Budget & Cost Compliance Agent"]
            RankAgent["Weighted Multi-Criteria Ranker"]
            ExplainAgent["Recommendation Synthesizer"]
        end
        
        AnalyticsEngine["Intelligence & Predictive Analytics"]
    end
    
    subgraph Data & AI Infrastructure
        pgvector["Supabase PostgreSQL + pgvector (HNSW Index)"]
        Gemini["Google Gemini 1.5 Pro / OpenRouter API"]
    end
    
    Client <-->|REST API / TanStack Query| API
    API --> Auth
    API --> ORMSvc
    API --> Supervisor
    
    Supervisor --> ParseAgent
    ParseAgent --> Gemini
    Supervisor --> VectorAgent
    VectorAgent --> pgvector
    Supervisor --> AvailAgent
    Supervisor --> BudgetAgent
    Supervisor --> RankAgent
    Supervisor --> ExplainAgent
    ExplainAgent --> Gemini
    
    API --> AnalyticsEngine
    AnalyticsEngine --> ORMSvc
```

---

## 🔄 Agentic AI Multi-Agent Matching Flowchart

```mermaid
flowchart TD
    A[College Submits Training Request] --> B[Supervisor Agent Received Event]
    B --> C[Request Understanding Agent]
    C -->|Extract Skills, Dates, Budget| D[Generate Query Vector]
    
    D --> E[Trainer Matching Agent]
    E -->|Cosine Similarity Search| F[Fetch Candidate Pool via pgvector]
    
    F --> G[Availability Agent]
    G -->|Calendar Lock Validation| H[Filtered Available Candidates]
    
    H --> I[Budget Agent]
    I -->|Fee vs Budget Ratio Check| J[Cost-Compliant Candidates]
    
    J --> K[Ranking Agent]
    K -->|Calculate Weighted Score| L[Ranked Leaderboard]
    
    L --> M[Recommendation Agent]
    M -->|Gemini Synthesis| N[Explainable Recommendation & Risk Analysis]
    
    N --> O[Manager Dashboard Review]
    O -->|Manager Approves| P[Generate Contract PDF & Dispatch Alerts]
    O -->|Manager Rejects / Adjusts| Q[Feedback Loop & Re-ranking]
```

---

## 🌟 Key Features & Module Overview

### 1. Enterprise Landing Page & Perspective Switcher
- Dark mode aesthetic (`#09090B`) with glassmorphism, Aurora background effects, and glowing gradients.
- Interactive perspective switching between **Manager**, **College Dean**, **Trainer**, and **Admin** modes.
- Instant floating **Reset Demo** button to refresh initial dataset state for live client demonstrations.

### 2. Autonomous Multi-Agent Allocation Engine
- **7 Specialized Agents**:
  - `RequestUnderstandingAgent`: Parses natural language requirements into structured JSON specs.
  - `TrainerMatchingAgent`: Executes semantic vector search via HNSW `pgvector` indexes.
  - `AvailabilityAgent`: Validates schedule conflicts against active calendar slots.
  - `BudgetAgent`: Ensures rate compliance and computes cost efficiency scores.
  - `RankingAgent`: Computes a 5-factor weighted matrix (35% Skill, 25% Availability, 20% Budget, 10% Rating, 10% Exp).
  - `RecommendationAgent`: Generates AI explainability write-ups, strengths, risks, and confidence scores.
  - `SupervisorAgent`: Orchestrates the state graph workflow with fallback strategies.

### 3. Complete Assignment Lifecycle Workflow
- Interactive **Manager Approval Modal** with real-time risk assessment and candidate comparison.
- Digital **PDF Contract Engine** (`CTR-2026-xxx`) with automated checksum verification.
- **7-Step Assignment Timeline** tracking status from request submission to calendar locking.
- Simulated Email & WhatsApp notification alerts for trainers and college deans.

### 4. Executive Intelligence & Datadog-style Telemetry
- Recharts visualizations: Trainer Utilization Radar, Monthly Demand Bar Charts, Budget Breakdown Donut Charts.
- Gemini-powered **Predictive Demand Forecasting** for emerging technology domains (GenAI, Cloud Native, Cybersecurity).
- Live Telemetry dashboard showing API Gateway Latency, HNSW Index Vector Speed, Token Usage, and Health Diagnostics.
- On-demand **PDF & CSV Executive Report Generator**.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & UI** | Tailwind CSS, Glassmorphism design, Framer Motion animations |
| **State & Data Fetching** | TanStack Query (React Query v5), React Hook Form, Zod |
| **Data Visualizations** | Recharts, Lucide Icons |
| **Backend Framework** | FastAPI (Python 3.12), Uvicorn |
| **ORM & Database** | SQLAlchemy 2.0 Async, Supabase PostgreSQL, `pgvector` extension |
| **AI Orchestration** | LangGraph, LangChain, Google Gemini 1.5 Pro API |
| **DevOps & Containers** | Docker, Docker Compose, NGINX Reverse Proxy, GitHub Actions CI/CD |

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: v20+
- **Python**: v3.12+
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/rishabhverma007/Agentic-AI-Trainer-Platform.git
cd Agentic-AI-Trainer-Platform
```

### 2. Setup & Run Backend (FastAPI)
```bash
cd backend
python -m venv venv

# Windows PowerShell:
.\venv\Scripts\activate

# macOS / Linux:
# source venv/bin/activate

pip install -r requirements.txt
python -m app.seed.seed_data
uvicorn main:app --reload --port 8000
```
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Swagger Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Setup & Run Frontend (Next.js 15)
In the root directory:
```bash
npm install
npm run dev
```
- **Web App**: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Deployment

To run the complete platform in isolated production containers using Docker Compose:

```bash
docker-compose up --build -d
```

Services exposed:
- **Frontend App**: `http://localhost:3000`
- **FastAPI Backend**: `http://localhost:8000`
- **NGINX Reverse Proxy**: `http://localhost:80`

---

## 🧪 Automated Testing

### Backend Unit & Integration Tests (Pytest)
```bash
cd backend
.\venv\Scripts\pytest
```
Runs tests covering:
- `/api/v1/health` diagnostic checks
- Multi-agent matching engine pipeline
- Executive intelligence API
- Workflow approval endpoints

### Frontend Typecheck & Build
```bash
npm run build
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

Developed with ❤️ by **Rishabh Verma** using Google DeepMind Agentic AI principles.
