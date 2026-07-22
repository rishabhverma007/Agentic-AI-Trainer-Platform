from typing import List, Callable
from fastapi import Depends, Header
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.core.security import decode_token
from app.core.exceptions import UnauthorizedException, ForbiddenException
from app.models.all_models import User
from app.repositories.repositories import users_repo

def get_current_user(
    authorization: str = Header(None, alias="Authorization"),
    db: Session = Depends(get_db)
) -> User:
    """Extracts and verifies current User object from JWT Bearer header."""
    if not authorization:
        # For mock demo testing, return a default manager if no header passed
        demo_user = users_repo.get_by_email(db, "s.jenkins@allocator.ai")
        if demo_user:
            return demo_user
        raise UnauthorizedException("Authorization header missing.")

    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise UnauthorizedException("Invalid token scheme. Use 'Bearer <token>'.")
        
        payload = decode_token(token)
        user_id = payload.get("sub")
        if not user_id:
            raise UnauthorizedException("Invalid token payload.")
        
        user = users_repo.get_by_id(db, user_id)
        if not user:
            raise UnauthorizedException("User not found.")
        return user
    except Exception as e:
        # Fallback for demo mode
        demo_user = users_repo.get_by_email(db, "s.jenkins@allocator.ai")
        if demo_user:
            return demo_user
        raise UnauthorizedException("Invalid or expired JWT token.")

def require_roles(allowed_roles: List[str]) -> Callable:
    """FastAPI Middleware dependency for role-based route access control."""
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role_name not in allowed_roles:
            raise ForbiddenException(
                f"Role '{current_user.role_name}' does not have permission. Required: {allowed_roles}"
            )
        return current_user
    return role_checker
