import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "ALLOCATOR.AI Backend Service"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-jwt-key-change-in-production-allocation-ai")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200  # 30 days
    
    # Database Settings (Defaults to local SQLite for instant testing fallback if Supabase URL is unconfigured)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./allocator.db")
    
    # Supabase Settings
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://demo.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "demo-anon-key")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "demo-service-key")

    # Storage Bucket Names
    BUCKET_RESUMES: str = "resumes"
    BUCKET_CERTIFICATES: str = "certificates"
    BUCKET_CONTRACTS: str = "contracts"
    BUCKET_AVATARS: str = "avatars"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "https://allocator-ai.vercel.app",
    ]

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="ignore")

settings = Settings()
