from typing import Generic, TypeVar, Type, Optional, List
from sqlalchemy.orm import Session
from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)

class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        """Base repository providing generic CRUD operations with soft-delete filtering."""
        self.model = model

    def get_by_id(self, db: Session, id: str) -> Optional[ModelType]:
        """Retrieves a single record by primary key, filtering out soft-deleted items."""
        return db.query(self.model).filter(
            self.model.id == id,
            self.model.is_deleted == False
        ).first()

    def get_all(self, db: Session, skip: int = 0, limit: int = 100) -> List[ModelType]:
        """Retrieves paginated list of non-deleted records."""
        return db.query(self.model).filter(
            self.model.is_deleted == False
        ).offset(skip).limit(limit).all()

    def create(self, db: Session, obj_in: dict) -> ModelType:
        """Creates and commits a new database record."""
        db_obj = self.model(**obj_in)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, db_obj: ModelType, obj_in: dict) -> ModelType:
        """Updates fields on an existing database record."""
        for field, value in obj_in.items():
            if value is not None and hasattr(db_obj, field):
                setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def soft_delete(self, db: Session, id: str) -> bool:
        """Marks a record as soft-deleted (`is_deleted = True`)."""
        db_obj = self.get_by_id(db, id)
        if db_obj:
            db_obj.is_deleted = True
            db.commit()
            return True
        return False
