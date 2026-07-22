from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import UserRead, APIResponse
from app.repositories.repositories import users_repo
from app.dependencies.auth_deps import get_current_user, require_roles

router = APIRouter(prefix="/users", tags=["Users Governance"])

@router.get("/", response_model=APIResponse[List[UserRead]])
def list_users(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    user=Depends(require_roles(["ADMIN", "MANAGER"]))
):
    """List system users (Manager / Admin governance)."""
    users = users_repo.get_all(db, skip=skip, limit=limit)
    return APIResponse(message=f"Fetched {len(users)} users", data=users)
