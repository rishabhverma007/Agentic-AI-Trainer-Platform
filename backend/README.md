# ALLOCATOR.AI - Backend Service Architecture

Production-grade FastAPI backend for the **Agentic AI Trainer Allocation Platform**, designed following SOLID principles, clean repository pattern, and Supabase integration.

## Key Technologies
- **Framework**: FastAPI (Python 3.12)
- **Data Layer**: SQLAlchemy 2.0 ORM + PostgreSQL (Supabase / Local SQLite fallback)
- **Validation**: Pydantic v2
- **Authentication**: JWT Bearer Tokens + Passlib (Bcrypt) + Supabase Auth
- **Storage**: Supabase Storage Buckets (`resumes`, `certificates`, `contracts`, `avatars`)

## Folder Structure
```
backend/
├── app/
│   ├── api/ v1/           # REST Routers (auth, users, trainers, colleges, requests, assignments, notifications, analytics)
│   ├── core/              # Config, Security, Logging, Exceptions
│   ├── database/          # Session, Base, Supabase Client
│   ├── models/            # 17 SQLAlchemy 2.0 ORM Models
│   ├── schemas/           # Pydantic v2 DTO schemas
│   ├── repositories/      # Generic BaseRepository & specialized repositories
│   ├── services/          # Business logic services & Storage handler
│   ├── dependencies/      # Auth JWT & Role middleware
│   ├── middleware/        # CORS & Logging
│   └── seed/              # Mock dataset generator (50 Trainers, 15 Colleges, 100 Requests)
├── main.py                # FastAPI Application Entrypoint
├── requirements.txt       # Python dependencies
├── backend_setup_guide.md # Setup instructions
└── er_diagram.md          # PostgreSQL Database ER Diagram
```
