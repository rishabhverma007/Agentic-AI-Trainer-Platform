import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    Float,
    Boolean,
    DateTime,
    ForeignKey,
    Table,
    Index,
    Enum as SQLEnum,
    JSON,
)
from sqlalchemy.orm import relationship
from app.database.base import Base

def generate_uuid():
    return str(uuid.uuid4())

# Many-to-Many junction table for Roles and Permissions
role_permissions = Table(
    "role_permissions",
    Base.metadata,
    Column("role_id", String(36), ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
    Column("permission_id", String(36), ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True),
)

class Role(Base):
    __tablename__ = "roles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(50), unique=True, nullable=False, index=True) # ADMIN, MANAGER, COLLEGE, TRAINER
    description = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False, index=True)

    users = relationship("User", back_populates="role_rel")
    permissions = relationship("Permission", secondary=role_permissions, back_populates="roles")


class Permission(Base):
    __tablename__ = "permissions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    code = Column(String(100), unique=True, nullable=False, index=True) # e.g. request:create, trainer:read
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    roles = relationship("Role", secondary=role_permissions, back_populates="permissions")


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    role_id = Column(String(36), ForeignKey("roles.id"), nullable=False, index=True)
    role_name = Column(String(50), nullable=False, default="MANAGER") # ADMIN, MANAGER, COLLEGE, TRAINER
    avatar_url = Column(String(500), nullable=True)
    phone = Column(String(20), nullable=True)
    status = Column(String(20), default="ACTIVE", index=True) # ACTIVE, INACTIVE, SUSPENDED
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False, index=True)

    role_rel = relationship("Role", back_populates="users")
    college_profile = relationship("College", back_populates="user", uselist=False)
    manager_profile = relationship("Manager", back_populates="user", uselist=False)
    trainer_profile = relationship("Trainer", back_populates="user", uselist=False)
    notifications = relationship("Notification", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")


class College(Base):
    __tablename__ = "colleges"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, unique=True, index=True)
    college_name = Column(String(200), nullable=False, index=True)
    website = Column(String(255), nullable=True)
    location = Column(String(100), nullable=False)
    contact_person = Column(String(100), nullable=False)
    designation = Column(String(100), nullable=True)
    verified = Column(Boolean, default=True)
    status = Column(String(20), default="ACTIVE", index=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    user = relationship("User", back_populates="college_profile")
    requests = relationship("TrainingRequest", back_populates="college")


class Manager(Base):
    __tablename__ = "managers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, unique=True, index=True)
    department = Column(String(100), nullable=False, default="Allocation Ops")
    title = Column(String(100), nullable=False, default="Senior Allocation Manager")
    status = Column(String(20), default="ACTIVE")
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    user = relationship("User", back_populates="manager_profile")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), unique=True, nullable=False, index=True)
    category = Column(String(50), nullable=False, index=True) # AI/ML, Web, Cloud, Security, Data, DevOps
    description = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    trainer_skills = relationship("TrainerSkill", back_populates="skill")


class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, unique=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    title = Column(String(150), nullable=False)
    bio = Column(Text, nullable=True)
    experience_years = Column(Integer, nullable=False, default=5)
    location = Column(String(100), nullable=False)
    hourly_rate = Column(Float, nullable=False, default=2500.0)
    rating = Column(Float, nullable=False, default=4.8)
    total_trainings = Column(Integer, default=0)
    resume_url = Column(String(500), nullable=True)
    certifications_json = Column(JSON, nullable=True) # Array of cert names
    past_colleges_json = Column(JSON, nullable=True) # Array of college names
    availability_status = Column(String(30), default="Available Now", index=True)
    status = Column(String(20), default="ACTIVE", index=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False, index=True)

    user = relationship("User", back_populates="trainer_profile")
    trainer_skills = relationship("TrainerSkill", back_populates="trainer", cascade="all, delete-orphan")
    availabilities = relationship("TrainerAvailability", back_populates="trainer")
    assignments = relationship("Assignment", back_populates="trainer")
    ratings = relationship("Rating", back_populates="trainer")


class TrainerSkill(Base):
    __tablename__ = "trainer_skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainer_id = Column(String(36), ForeignKey("trainers.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_id = Column(String(36), ForeignKey("skills.id", ondelete="CASCADE"), nullable=False, index=True)
    proficiency_level = Column(String(30), default="Advanced") # Beginner, Intermediate, Advanced, Expert
    years_experience = Column(Integer, default=3)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    trainer = relationship("Trainer", back_populates="trainer_skills")
    skill = relationship("Skill", back_populates="trainer_skills")


class TrainerAvailability(Base):
    __tablename__ = "trainer_availability"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainer_id = Column(String(36), ForeignKey("trainers.id", ondelete="CASCADE"), nullable=False, index=True)
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=False)
    is_booked = Column(Boolean, default=False)
    booking_reference = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    trainer = relationship("Trainer", back_populates="availabilities")


class TrainingRequest(Base):
    __tablename__ = "training_requests"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    college_id = Column(String(36), ForeignKey("colleges.id"), nullable=False, index=True)
    college_name = Column(String(200), nullable=False)
    location = Column(String(100), nullable=False)
    technology = Column(String(100), nullable=False, index=True)
    skills_required_json = Column(JSON, nullable=False) # List of required skills
    budget_per_day = Column(Float, nullable=False)
    start_date = Column(String(20), nullable=False)
    end_date = Column(String(20), nullable=False)
    training_mode = Column(String(20), default="Offline") # Offline, Online, Hybrid
    number_of_students = Column(Integer, default=60)
    duration_days = Column(Integer, default=5)
    remarks = Column(Text, nullable=True)
    status = Column(String(30), default="PENDING", index=True) # PENDING, AI_MATCHING, MATCHED, ASSIGNED, COMPLETED
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False, index=True)

    college = relationship("College", back_populates="requests")
    assignments = relationship("Assignment", back_populates="request")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    request_id = Column(String(36), ForeignKey("training_requests.id"), nullable=False, index=True)
    trainer_id = Column(String(36), ForeignKey("trainers.id"), nullable=False, index=True)
    college_name = Column(String(200), nullable=False)
    trainer_name = Column(String(100), nullable=False)
    technology = Column(String(100), nullable=False)
    start_date = Column(String(20), nullable=False)
    end_date = Column(String(20), nullable=False)
    total_budget = Column(Float, nullable=False)
    match_score = Column(Float, default=95.0)
    status = Column(String(30), default="PENDING_APPROVAL", index=True) # PENDING_APPROVAL, APPROVED, IN_PROGRESS, COMPLETED
    contract_status = Column(String(30), default="DRAFT") # DRAFT, SENT, SIGNED
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    request = relationship("TrainingRequest", back_populates="assignments")
    trainer = relationship("Trainer", back_populates="assignments")
    rating = relationship("Rating", back_populates="assignment", uselist=False)
    contract = relationship("Contract", back_populates="assignment", uselist=False)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(30), default="SYSTEM") # MATCH, ASSIGNMENT, SYSTEM, APPROVAL
    read = Column(Boolean, default=False, index=True)
    action_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    user = relationship("User", back_populates="notifications")


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    assignment_id = Column(String(36), ForeignKey("assignments.id"), nullable=False, unique=True, index=True)
    trainer_id = Column(String(36), ForeignKey("trainers.id"), nullable=False, index=True)
    college_id = Column(String(36), ForeignKey("colleges.id"), nullable=False, index=True)
    stars = Column(Float, nullable=False, default=5.0)
    feedback_text = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    assignment = relationship("Assignment", back_populates="rating")
    trainer = relationship("Trainer", back_populates="ratings")


class Contract(Base):
    __tablename__ = "contracts"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    assignment_id = Column(String(36), ForeignKey("assignments.id"), nullable=False, unique=True, index=True)
    contract_url = Column(String(500), nullable=True)
    status = Column(String(30), default="GENERATED") # GENERATED, SENT, SIGNED
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

    assignment = relationship("Assignment", back_populates="contract")


class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    metric_key = Column(String(100), unique=True, nullable=False, index=True)
    metric_value = Column(Float, nullable=False)
    metadata_json = Column(JSON, nullable=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True, index=True)
    action = Column(String(100), nullable=False)
    resource_type = Column(String(50), nullable=False)
    resource_id = Column(String(100), nullable=True)
    details_json = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="audit_logs")


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    user_query = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    context_json = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), default="SYSTEM")
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
