# Production Dockerfile for FastAPI Python 3.12 Backend
FROM python:3.12-slim

WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run database auto-seeding then launch Uvicorn server
EXPOSE 8000
CMD ["sh", "-c", "python -m app.seed.seed_data && uvicorn main:app --host 0.0.0.0 --port 8000"]
