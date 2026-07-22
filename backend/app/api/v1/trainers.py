from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import TrainerRead, APIResponse
from app.services.services import trainer_service

router = APIRouter(prefix="/trainers", tags=["Trainer Management"])

@router.get("/", response_model=APIResponse[List[TrainerRead]])
def get_trainers(
    technology: Optional[str] = Query(None, description="Filter by skill or technology keyword"),
    max_rate: Optional[float] = Query(None, description="Maximum daily or hourly rate filter"),
    availability: Optional[str] = Query(None, description="Filter by availability status"),
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Retrieve verified trainers with optional domain and rate filters."""
    trainers = trainer_service.get_trainers(db, technology, max_rate, availability, skip, limit)
    return APIResponse(message=f"Retrieved {len(trainers)} trainers", data=trainers)

@router.get("/{trainer_id}", response_model=APIResponse[TrainerRead])
def get_trainer_by_id(trainer_id: str, db: Session = Depends(get_db)):
    """Retrieve detailed trainer profile including certifications and past institutional bootcamps."""
    trainer = trainer_service.get_by_id(db, trainer_id)
    return APIResponse(message="Trainer profile retrieved", data=trainer)
