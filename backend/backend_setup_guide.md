# Backend Setup & Execution Guide

Follow these steps to initialize and run the ALLOCATOR.AI FastAPI backend.

## 1. Environment Setup
```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 2. Seed Mock Database
To populate your database with 50 Trainers, 15 Colleges, 100 Requests, 150 Assignments, and 500 Notifications:
```bash
python -m app.seed.seed_data
```

## 3. Run FastAPI Server
```bash
uvicorn main:app --reload --port 8000
```

- **Interactive API Documentation (Swagger)**: http://localhost:8000/docs
- **ReDoc Documentation**: http://localhost:8000/redoc
- **API Base Route**: http://localhost:8000/api/v1
