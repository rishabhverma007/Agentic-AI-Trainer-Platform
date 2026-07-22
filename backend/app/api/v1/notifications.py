from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import NotificationRead, APIResponse
from app.repositories.repositories import notifications_repo
from app.dependencies.auth_deps import get_current_user
from app.models.all_models import User

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/", response_model=APIResponse[List[NotificationRead]])
def get_user_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve notification drawer items for authenticated user."""
    notifs = notifications_repo.get_by_user(db, current_user.id)
    return APIResponse(message=f"Retrieved {len(notifs)} notifications", data=notifs)
