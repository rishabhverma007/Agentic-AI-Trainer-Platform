from typing import Optional, List
from sqlalchemy.orm import Session
from app.repositories.base_repository import BaseRepository
from app.models.all_models import (
    User,
    Trainer,
    College,
    TrainingRequest,
    Assignment,
    Notification,
    Rating,
    Analytics,
    Skill,
)

class UsersRepository(BaseRepository[User]):
    def __init__(self):
        super().__init__(User)

    def get_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email, User.is_deleted == False).first()


class TrainersRepository(BaseRepository[Trainer]):
    def __init__(self):
        super().__init__(Trainer)

    def search_trainers(
        self,
        db: Session,
        technology: Optional[str] = None,
        max_rate: Optional[float] = None,
        availability: Optional[str] = None,
        skip: int = 0,
        limit: int = 50,
    ) -> List[Trainer]:
        query = db.query(Trainer).filter(Trainer.is_deleted == False)
        
        if availability:
            query = query.filter(Trainer.availability_status == availability)
        if max_rate:
            query = query.filter(Trainer.hourly_rate <= max_rate)
        
        trainers = query.offset(skip).limit(limit).all()
        
        if technology:
            tech_lower = technology.lower()
            filtered = [
                t for t in trainers
                if tech_lower in (t.title or "").lower()
                or tech_lower in (t.bio or "").lower()
            ]
            return filtered
        return trainers


class CollegesRepository(BaseRepository[College]):
    def __init__(self):
        super().__init__(College)

    def get_by_user_id(self, db: Session, user_id: str) -> Optional[College]:
        return db.query(College).filter(College.user_id == user_id, College.is_deleted == False).first()


class RequestsRepository(BaseRepository[TrainingRequest]):
    def __init__(self):
        super().__init__(TrainingRequest)

    def get_by_status(self, db: Session, status: str) -> List[TrainingRequest]:
        return db.query(TrainingRequest).filter(
            TrainingRequest.status == status,
            TrainingRequest.is_deleted == False
        ).order_by(TrainingRequest.created_at.desc()).all()


class AssignmentsRepository(BaseRepository[Assignment]):
    def __init__(self):
        super().__init__(Assignment)

    def get_by_trainer(self, db: Session, trainer_id: str) -> List[Assignment]:
        return db.query(Assignment).filter(
            Assignment.trainer_id == trainer_id,
            Assignment.is_deleted == False
        ).all()


class NotificationsRepository(BaseRepository[Notification]):
    def __init__(self):
        super().__init__(Notification)

    def get_by_user(self, db: Session, user_id: str, unread_only: bool = False) -> List[Notification]:
        query = db.query(Notification).filter(
            Notification.user_id == user_id,
            Notification.is_deleted == False
        )
        if unread_only:
            query = query.filter(Notification.read == False)
        return query.order_by(Notification.created_at.desc()).all()


class RatingsRepository(BaseRepository[Rating]):
    def __init__(self):
        super().__init__(Rating)


class AnalyticsRepository(BaseRepository[Analytics]):
    def __init__(self):
        super().__init__(Analytics)

users_repo = UsersRepository()
trainers_repo = TrainersRepository()
colleges_repo = CollegesRepository()
requests_repo = RequestsRepository()
assignments_repo = AssignmentsRepository()
notifications_repo = NotificationsRepository()
ratings_repo = RatingsRepository()
analytics_repo = AnalyticsRepository()
