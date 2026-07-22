from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import AssignmentCreate, AssignmentRead, APIResponse
from app.services.services import assignment_service

router = APIRouter(prefix="/assignments", tags=["Allocation Assignments"])

@router.post("/", response_model=APIResponse[AssignmentRead])
def create_assignment(req: AssignmentCreate, db: Session = Depends(get_db)):
    """Approve a matched trainer allocation and issue assignment contract."""
    assignment = assignment_service.create_assignment(db, req)
    return APIResponse(message="Assignment generated successfully", data=assignment)

@router.get("/", response_model=APIResponse[List[AssignmentRead]])
def list_assignments(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """List platform assignments and contract status."""
    assignments = assignment_service.get_assignments(db, skip, limit)
    return APIResponse(message=f"Retrieved {len(assignments)} assignments", data=assignments)
