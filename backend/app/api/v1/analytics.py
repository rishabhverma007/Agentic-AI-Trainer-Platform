from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import AnalyticsSummary, APIResponse
from app.services.services import analytics_service

router = APIRouter(prefix="/analytics", tags=["Platform Intelligence"])

@router.get("/summary", response_model=APIResponse[AnalyticsSummary])
def get_analytics_summary(db: Session = Depends(get_db)):
    """Fetch high-level intelligence metrics, match success rates, and skill distribution."""
    summary = analytics_service.get_summary(db)
    return APIResponse(message="Platform analytics summary generated", data=summary)
