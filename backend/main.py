from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.logging import setup_logging, logger
from app.database.base import Base
from app.database.session import engine

# Import Routers
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.trainers import router as trainers_router
from app.api.v1.colleges import router as colleges_router
from app.api.v1.requests import router as requests_router
from app.api.v1.assignments import router as assignments_router
from app.api.v1.notifications import router as notifications_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.matching import router as matching_router
from app.api.v1.workflow import router as workflow_router
from app.api.v1.intelligence import router as intelligence_router
from app.api.v1.admin_tools import router as admin_tools_router

setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing database schema and connection pools...")
    Base.metadata.create_all(bind=engine)
    logger.info("ALLOCATOR.AI Backend API Engine initialized successfully.")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Production-Grade FastAPI Backend for Agentic AI Trainer Allocation Platform (Supabase & Gemini AI)",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Exception on path {request.url.path}: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An unexpected internal server error occurred.", "detail": str(exc)}
    )

# Root Healthcheck Endpoint
@app.get("/", tags=["Health"])
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": "2.0.0",
        "docs": "/docs",
        "telemetry": "Agentic AI Ready"
    }

# Include API v1 Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(users_router, prefix=settings.API_V1_STR)
app.include_router(trainers_router, prefix=settings.API_V1_STR)
app.include_router(colleges_router, prefix=settings.API_V1_STR)
app.include_router(requests_router, prefix=settings.API_V1_STR)
app.include_router(assignments_router, prefix=settings.API_V1_STR)
app.include_router(notifications_router, prefix=settings.API_V1_STR)
app.include_router(analytics_router, prefix=settings.API_V1_STR)
app.include_router(matching_router, prefix=settings.API_V1_STR)
app.include_router(workflow_router, prefix=settings.API_V1_STR)
app.include_router(intelligence_router, prefix=settings.API_V1_STR)
app.include_router(admin_tools_router, prefix=settings.API_V1_STR)
