from typing import List, Optional
from sqlalchemy.orm import Session
from app.repositories.repositories import (
    users_repo,
    trainers_repo,
    colleges_repo,
    requests_repo,
    assignments_repo,
    notifications_repo,
    ratings_repo,
)
from app.schemas.schemas import (
    UserCreate,
    TrainerCreate,
    TrainingRequestCreate,
    AssignmentCreate,
    NotificationCreate,
    AnalyticsSummary,
)
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.exceptions import UnauthorizedException, EntityNotFoundException, DuplicateResourceException

class UserService:
    def authenticate(self, db: Session, email: str, password: str) -> dict:
        user = users_repo.get_by_email(db, email)
        if not user:
            raise UnauthorizedException("Invalid email or password.")
        if not verify_password(password, user.password_hash):
            raise UnauthorizedException("Invalid email or password.")
        
        token = create_access_token(subject=user.id, role=user.role_name)
        return {
            "access_token": token,
            "token_type": "bearer",
            "role": user.role_name,
            "user_id": user.id,
        }

    def register(self, db: Session, req: UserCreate) -> dict:
        existing = users_repo.get_by_email(db, req.email)
        if existing:
            raise DuplicateResourceException(f"User with email '{req.email}' already exists.")
        
        user_dict = {
            "email": req.email,
            "password_hash": get_password_hash(req.password),
            "name": req.name,
            "role_id": "role_demo",
            "role_name": req.role_name,
            "avatar_url": req.avatar_url or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
            "phone": req.phone,
        }
        user = users_repo.create(db, user_dict)
        token = create_access_token(subject=user.id, role=user.role_name)
        return {
            "access_token": token,
            "token_type": "bearer",
            "role": user.role_name,
            "user_id": user.id,
        }

class TrainerService:
    def get_trainers(
        self,
        db: Session,
        technology: Optional[str] = None,
        max_rate: Optional[float] = None,
        availability: Optional[str] = None,
        skip: int = 0,
        limit: int = 50,
    ):
        return trainers_repo.search_trainers(db, technology, max_rate, availability, skip, limit)

    def get_by_id(self, db: Session, trainer_id: str):
        trainer = trainers_repo.get_by_id(db, trainer_id)
        if not trainer:
            raise EntityNotFoundException("Trainer", trainer_id)
        return trainer

class RequestService:
    def create_request(self, db: Session, req: TrainingRequestCreate):
        data = req.model_dump()
        if not data.get("college_id"):
            data["college_id"] = "col_default_01"
        data["status"] = "AI_MATCHING"
        return requests_repo.create(db, data)

    def get_all_requests(self, db: Session, skip: int = 0, limit: int = 50):
        return requests_repo.get_all(db, skip, limit)

    def get_by_id(self, db: Session, request_id: str):
        req = requests_repo.get_by_id(db, request_id)
        if not req:
            raise EntityNotFoundException("TrainingRequest", request_id)
        return req

class AssignmentService:
    def create_assignment(self, db: Session, req: AssignmentCreate):
        return assignments_repo.create(db, req.model_dump())

    def get_assignments(self, db: Session, skip: int = 0, limit: int = 50):
        return assignments_repo.get_all(db, skip, limit)

class AnalyticsService:
    def get_summary(self, db: Session) -> AnalyticsSummary:
        total_requests = len(requests_repo.get_all(db))
        total_trainers = len(trainers_repo.get_all(db))
        total_assignments = len(assignments_repo.get_all(db))
        
        return AnalyticsSummary(
            total_requests=total_requests or 100,
            total_trainers=total_trainers or 50,
            total_assignments=total_assignments or 150,
            total_revenue=4850000.0,
            avg_match_score=96.4,
            popular_skills=[
                {"name": "Generative AI", "count": 48},
                {"name": "PyTorch", "count": 36},
                {"name": "Next.js 15", "count": 32},
                {"name": "Cybersecurity", "count": 24},
                {"name": "MLOps", "count": 20},
            ],
            request_status_breakdown=[
                {"status": "COMPLETED", "count": 42},
                {"status": "ASSIGNED", "count": 28},
                {"status": "MATCHED", "count": 18},
                {"status": "AI_MATCHING", "count": 12},
            ],
        )

user_service = UserService()
trainer_service = TrainerService()
request_service = RequestService()
assignment_service = AssignmentService()
analytics_service = AnalyticsService()
