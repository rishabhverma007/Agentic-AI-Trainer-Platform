from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import CollegeRead, APIResponse
from app.repositories.repositories import colleges_repo

router = APIRouter(prefix="/colleges", tags=["College Partners"])

@router.get("/", response_model=APIResponse[List[CollegeRead]])
def list_colleges(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """List verified partner universities & engineering colleges."""
    colleges = colleges_repo.get_all(db, skip, limit)
    return APIResponse(message=f"Retrieved {len(colleges)} partner colleges", data=colleges)
