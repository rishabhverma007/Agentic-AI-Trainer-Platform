from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import LoginRequest, RegisterRequest, APIResponse, Token, UserRead
from app.services.services import user_service
from app.dependencies.auth_deps import get_current_user
from app.models.all_models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=APIResponse[Token])
def login(req: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user credentials and return signed JWT bearer token."""
    token_data = user_service.authenticate(db, req.email, req.password)
    return APIResponse(message="Authentication successful", data=token_data)

@router.post("/register", response_model=APIResponse[Token])
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    """Register new institutional user account (College / Trainer / Manager)."""
    user_create = req.model_dump()
    user_create["role_name"] = req.role
    token_data = user_service.register(db, req)
    return APIResponse(message="Registration successful", data=token_data)

@router.get("/me", response_model=APIResponse[UserRead])
def get_me(current_user: User = Depends(get_current_user)):
    """Get authenticated user profile context."""
    return APIResponse(message="User context fetched", data=current_user)
