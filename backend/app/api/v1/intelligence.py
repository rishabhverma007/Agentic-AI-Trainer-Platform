from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import APIResponse
from app.services.predictive_analytics_service import predictive_analytics_service
from app.services.system_monitoring_service import system_monitoring_service

router = APIRouter(prefix="/intelligence", tags=["Enterprise Intelligence & Analytics"])

@router.get("/insights", response_model=APIResponse[dict])
def get_insights():
    """Retrieve AI-generated domain insights, trend alerts, and predictive forecasts."""
    data = predictive_analytics_service.get_predictive_insights()
    return APIResponse(message="Predictive AI insights retrieved", data=data)

@router.get("/telemetry", response_model=APIResponse[dict])
def get_telemetry():
    """Retrieve Datadog/Grafana style system health and API telemetry metrics."""
    data = system_monitoring_service.get_telemetry_status()
    return APIResponse(message="System telemetry metrics retrieved", data=data)

@router.get("/leaderboards", response_model=APIResponse[dict])
def get_leaderboards():
    """Retrieve top-rated trainers and most active college partner leaderboards."""
    data = {
        "topTrainers": [
            {"rank": 1, "name": "Dr. Aris Thorne", "rating": 4.95, "bootcamps": 48, "revenue": 1680000},
            {"rank": 2, "name": "Elena Rostova", "rating": 4.88, "bootcamps": 36, "revenue": 1008000},
            {"rank": 3, "name": "Vikramaditya Kulkarni", "rating": 4.92, "bootcamps": 62, "revenue": 2480000},
            {"rank": 4, "name": "Priya Sundaram", "rating": 4.91, "bootcamps": 29, "revenue": 928000},
        ],
        "topColleges": [
            {"rank": 1, "name": "IIT Delhi", "requests": 14, "students": 1200, "spent": 1750000},
            {"rank": 2, "name": "BITS Pilani", "requests": 11, "students": 850, "spent": 1320000},
            {"rank": 3, "name": "IIIT Hyderabad", "requests": 9, "students": 720, "spent": 1080000},
        ]
    }
    return APIResponse(message="Leaderboards retrieved", data=data)
