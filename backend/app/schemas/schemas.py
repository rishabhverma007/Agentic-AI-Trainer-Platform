from datetime import datetime
from typing import List, Optional, Any, Generic, TypeVar
from pydantic import BaseModel, EmailStr, Field

T = TypeVar("T")

class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str = "Operation completed successfully"
    data: Optional[T] = None

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[str] = None
    exp: Optional[int] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "MANAGER"

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str = "COLLEGE" # ADMIN, MANAGER, COLLEGE, TRAINER
    organization: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role_name: str
    avatar_url: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = "ACTIVE"

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = None

class UserRead(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Skill Schemas
class SkillRead(BaseModel):
    id: str
    name: str
    category: str
    description: Optional[str] = None

    class Config:
        from_attributes = True

# Trainer Schemas
class TrainerBase(BaseModel):
    name: str
    title: str
    bio: Optional[str] = None
    experience_years: int = Field(default=5, ge=0)
    location: str
    hourly_rate: float = Field(default=2500.0, ge=0)
    rating: float = Field(default=4.8, ge=0, le=5.0)
    total_trainings: int = 0
    resume_url: Optional[str] = None
    certifications_json: Optional[List[str]] = []
    past_colleges_json: Optional[List[str]] = []
    availability_status: Optional[str] = "Available Now"

class TrainerCreate(TrainerBase):
    user_id: str
    skills: List[str] = []

class TrainerUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    experience_years: Optional[int] = None
    hourly_rate: Optional[float] = None
    availability_status: Optional[str] = None
    resume_url: Optional[str] = None

class TrainerRead(TrainerBase):
    id: str
    user_id: str
    skills: List[str] = []
    created_at: datetime

    class Config:
        from_attributes = True

# College Schemas
class CollegeBase(BaseModel):
    college_name: str
    website: Optional[str] = None
    location: str
    contact_person: str
    designation: Optional[str] = None
    verified: bool = True

class CollegeCreate(CollegeBase):
    user_id: str

class CollegeRead(CollegeBase):
    id: str
    user_id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Training Request Schemas
class TrainingRequestBase(BaseModel):
    college_name: str
    location: str
    technology: str
    skills_required_json: List[str]
    budget_per_day: float = Field(ge=0)
    start_date: str
    end_date: str
    training_mode: str = "Offline"
    number_of_students: int = 60
    duration_days: int = 5
    remarks: Optional[str] = None

class TrainingRequestCreate(TrainingRequestBase):
    college_id: Optional[str] = None

class TrainingRequestUpdate(BaseModel):
    status: Optional[str] = None
    budget_per_day: Optional[float] = None
    remarks: Optional[str] = None

class TrainingRequestRead(TrainingRequestBase):
    id: str
    college_id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Assignment Schemas
class AssignmentBase(BaseModel):
    request_id: str
    trainer_id: str
    college_name: str
    trainer_name: str
    technology: str
    start_date: str
    end_date: str
    total_budget: float
    match_score: float = 95.0

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentRead(AssignmentBase):
    id: str
    status: str
    contract_status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Notification Schemas
class NotificationCreate(BaseModel):
    user_id: str
    title: str
    message: str
    type: str = "SYSTEM"
    action_url: Optional[str] = None

class NotificationRead(BaseModel):
    id: str
    user_id: str
    title: str
    message: str
    type: str
    read: bool
    action_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Rating Schemas
class RatingCreate(BaseModel):
    assignment_id: str
    trainer_id: str
    college_id: str
    stars: float = Field(ge=1, le=5)
    feedback_text: Optional[str] = None

class RatingRead(BaseModel):
    id: str
    assignment_id: str
    trainer_id: str
    college_id: str
    stars: float
    feedback_text: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Analytics Summary DTO
class AnalyticsSummary(BaseModel):
    total_requests: int
    total_trainers: int
    total_assignments: int
    total_revenue: float
    avg_match_score: float
    popular_skills: List[dict]
    request_status_breakdown: List[dict]
