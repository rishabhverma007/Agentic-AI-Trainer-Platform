# ALLOCATOR.AI System Architecture Diagrams

### 1. Overall System Architecture
```mermaid
graph TD
    Client["Next.js 15 Dark Glass UI (Vercel)"] -->|HTTPS / REST API| Nginx["NGINX Reverse Proxy & Rate Limiter"]
    Nginx -->|Proxy Requests| FastAPI["FastAPI Backend (Render)"]
    FastAPI -->|pgvector Cosine Search| SupabaseDB[("Supabase PostgreSQL + pgvector")]
    FastAPI -->|Multi-Agent LangGraph| GeminiAI["Gemini 1.5 Pro AI Engine"]
    FastAPI -->|HTML / PDF Services| EmailService["Email & WhatsApp Alerts"]
    FastAPI -->|Contract Engine| PDFGenerator["Digital PDF Contract Builder"]
```

### 2. Multi-Agent AI Workflow Sequence
```mermaid
sequenceDiagram
    autonumber
    College->>FastAPI: Submit Training Requirement (Natural Language Prompt)
    FastAPI->>RequestAgent: Parse Parameters (Tech, Budget, Duration, Location)
    RequestAgent->>MatchingAgent: Query pgvector HNSW Skill Embeddings
    MatchingAgent->>AvailabilityAgent: Check Real-time Schedule Locks
    AvailabilityAgent->>BudgetAgent: Evaluate Daily Fee vs Budget Ratio
    BudgetAgent->>RankingAgent: Calculate 5-Criteria Weighted Match Matrix
    RankingAgent->>RecommendationAgent: Generate Explainable AI Reasoning & Strengths
    RecommendationAgent-->>College: Return Top 5 Ranked Candidates with Match Scores
```

### 3. Database Entity Relationships (ER Diagram)
```mermaid
erDiagram
    COLLEGES ||--o{ REQUESTS : submits
    TRAINERS ||--o{ ASSIGNMENTS : allocated_to
    REQUESTS ||--o{ ASSIGNMENTS : leads_to
    ASSIGNMENTS ||--|| CONTRACTS : issues
    TRAINERS ||--o{ SKILLS : possesses
    ASSIGNMENTS ||--o{ AUDIT_LOGS : records

    COLLEGES {
        uuid id PK
        string name
        string location
    }

    TRAINERS {
        uuid id PK
        string name
        float hourly_rate
        float rating
        string availability_status
    }

    ASSIGNMENTS {
        uuid id PK
        string status
        float match_score
        float total_budget
    }

    CONTRACTS {
        uuid id PK
        string contract_number
        string status
        string pdf_url
    }
```

### 4. Cloud Infrastructure Topology
```mermaid
graph LR
    User["Enterprise User"] --> VercelCDN["Vercel Global CDN Edge"]
    VercelCDN --> NextApp["Next.js 15 Client"]
    NextApp --> RenderBackend["Render Container (FastAPI Python 3.12)"]
    RenderBackend --> SupabaseCloud[("Supabase Cloud Database")]
    RenderBackend --> GoogleAI["Google Gemini 1.5 Pro API"]
```
