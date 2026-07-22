from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import TrainingRequestCreate, TrainingRequestRead, APIResponse
from app.services.services import request_service

router = APIRouter(prefix="/requests", tags=["Training Requests"])

@router.post("/", response_model=APIResponse[TrainingRequestRead])
def create_training_request(req: TrainingRequestCreate, db: Session = Depends(get_db)):
    """Submit a new institutional training requirement to initiate agentic allocation."""
    created = request_service.create_request(db, req)
    return APIResponse(message="Training request created successfully", data=created)

@router.get("/", response_model=APIResponse[List[TrainingRequestRead]])
def get_all_training_requests(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """List all training requests submitted across institutions."""
    requests = request_service.get_all_requests(db, skip, limit)
    return APIResponse(message=f"Retrieved {len(requests)} training requests", data=requests)

@router.get("/{request_id}", response_model=APIResponse[TrainingRequestRead])
def get_training_request_by_id(request_id: str, db: Session = Depends(get_db)):
    """Get details for a single training request."""
    req = request_service.get_by_id(db, request_id)
    return APIResponse(message="Training request details retrieved", data=req)
