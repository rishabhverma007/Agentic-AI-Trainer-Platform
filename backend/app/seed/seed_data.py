import sys
import os
import random
import uuid
from datetime import datetime, timedelta, timezone

# Add parent directory to path so script can run independently
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.database.base import Base
from app.database.session import engine, SessionLocal
from app.models.all_models import (
    Role,
    Permission,
    User,
    College,
    Manager,
    Trainer,
    Skill,
    TrainerSkill,
    TrainerAvailability,
    TrainingRequest,
    Assignment,
    Notification,
    Rating,
    Contract,
    Analytics,
)
from app.core.security import get_password_hash
from app.core.logging import logger

TECHNOLOGIES_CATALOG = [
    ("Generative AI", "AI/ML"),
    ("LangChain", "AI/ML"),
    ("LangGraph", "AI/ML"),
    ("RAG Architecture", "AI/ML"),
    ("PyTorch", "AI/ML"),
    ("TensorFlow", "AI/ML"),
    ("Prompt Engineering", "AI/ML"),
    ("MLOps", "AI/ML"),
    ("Python", "Web Development"),
    ("Next.js 15", "Web Development"),
    ("React", "Web Development"),
    ("FastAPI", "Web Development"),
    ("TypeScript", "Web Development"),
    ("Node.js", "Web Development"),
    ("AWS", "Cloud/DevOps"),
    ("Azure", "Cloud/DevOps"),
    ("Google Cloud", "Cloud/DevOps"),
    ("Docker", "Cloud/DevOps"),
    ("Kubernetes", "Cloud/DevOps"),
    ("Cyber Security", "Cybersecurity"),
    ("Ethical Hacking", "Cybersecurity"),
    ("Data Science", "Data Science"),
    ("Power BI", "Data Science"),
    ("SQL", "Data Science"),
]

COLLEGE_NAMES = [
    ("IIT Delhi - Dept of CSE", "New Delhi", "Dr. Rajesh Sharma"),
    ("BITS Pilani - Hyderabad Campus", "Hyderabad", "Dr. Meenakshi Rao"),
    ("IIIT Hyderabad", "Hyderabad", "Prof. K. S. Prasad"),
    ("IIT Bombay", "Mumbai", "Dr. Anirudh Kulkarni"),
    ("VIT Vellore", "Vellore", "Dr. S. Sundaram"),
    ("IIT Madras", "Chennai", "Prof. R. V. Ramanathan"),
    ("COEP Pune", "Pune", "Dr. Sunita Deshmukh"),
    ("RVCE Bangalore", "Bengaluru", "Prof. H. N. Murthy"),
    ("DTU New Delhi", "Delhi", "Dr. Alok Verma"),
    ("NIT Trichy", "Tiruchirappalli", "Dr. P. Swaminathan"),
    ("IIT Kharagpur", "Kharagpur", "Prof. S. Dasgupta"),
    ("SRM Institute", "Chennai", "Dr. Priya Nair"),
    ("Manipal Institute of Tech", "Manipal", "Dr. V. K. Pai"),
    ("Jadavpur University", "Kolkata", "Prof. A. Banerjee"),
    ("Thapar Institute", "Patiala", "Dr. G. S. Gill"),
]

TRAINER_FIRST_NAMES = ["Aris", "Elena", "Vikram", "Priya", "Marcus", "Siddharth", "Aisha", "Devendra", "Kavya", "Rahul", "Nisha", "Rohan", "Ananya", "Tarun", "Simran"]
TRAINER_LAST_NAMES = ["Thorne", "Rostova", "Kulkarni", "Sundaram", "Chen", "Joshi", "Khan", "Patel", "Verma", "Sen", "Gupta", "Nair", "Mehta", "Bhat", "Chawla"]

def seed_database():
    logger.info("Dropping existing tables and initializing fresh database schema...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # 1. Roles & Permissions
        roles = {}
        for r_name in ["ADMIN", "MANAGER", "COLLEGE", "TRAINER"]:
            role_obj = Role(name=r_name, description=f"{r_name} system role")
            db.add(role_obj)
            roles[r_name] = role_obj
        db.commit()

        # 2. Skills Catalog
        skill_objs = []
        for tech, cat in TECHNOLOGIES_CATALOG:
            sk = Skill(name=tech, category=cat, description=f"Expertise in {tech}")
            db.add(sk)
            skill_objs.append(sk)
        db.commit()

        # 3. Default Demo Users
        password_hash = get_password_hash("password123")
        
        # Managers (5)
        managers = []
        for i in range(1, 6):
            u_mgr = User(
                email=f"manager0{i}@allocator.ai" if i > 1 else "s.jenkins@allocator.ai",
                password_hash=password_hash,
                name="Sarah Jenkins" if i == 1 else f"Manager {i}",
                role_id=roles["MANAGER"].id,
                role_name="MANAGER",
                avatar_url=f"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
            )
            db.add(u_mgr)
            db.flush()
            mgr_profile = Manager(user_id=u_mgr.id, department="Allocation Operations")
            db.add(mgr_profile)
            managers.append(mgr_profile)

        # Colleges (15)
        colleges = []
        for i, (col_name, loc, contact) in enumerate(COLLEGE_NAMES):
            u_col = User(
                email=f"dean.college{i+1}@institution.edu",
                password_hash=password_hash,
                name=contact,
                role_id=roles["COLLEGE"].id,
                role_name="COLLEGE",
                avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
            )
            db.add(u_col)
            db.flush()
            col_profile = College(
                user_id=u_col.id,
                college_name=col_name,
                location=loc,
                contact_person=contact,
                designation="Head of Placement & Training",
            )
            db.add(col_profile)
            colleges.append(col_profile)

        # Trainers (50)
        trainers = []
        for i in range(1, 51):
            fname = random.choice(TRAINER_FIRST_NAMES)
            lname = random.choice(TRAINER_LAST_NAMES)
            full_name = f"Dr. {fname} {lname}" if i % 2 == 0 else f"{fname} {lname}"
            tech_primary = random.choice(TECHNOLOGIES_CATALOG)[0]
            
            u_trn = User(
                email=f"trainer{i}@ai-trainers.org",
                password_hash=password_hash,
                name=full_name,
                role_id=roles["TRAINER"].id,
                role_name="TRAINER",
                avatar_url=f"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
            )
            db.add(u_trn)
            db.flush()
            
            trn_profile = Trainer(
                user_id=u_trn.id,
                name=full_name,
                title=f"Senior {tech_primary} & AI Architect",
                bio=f"Specializing in {tech_primary}, Multi-Agent Systems, and enterprise production workflows with {random.randint(4, 14)} years experience.",
                experience_years=random.randint(4, 14),
                location=random.choice(["Bengaluru", "Hyderabad", "Pune", "Delhi NCR", "Chennai", "Remote"]),
                hourly_rate=random.choice([2500.0, 3000.0, 3500.0, 4000.0, 4500.0]),
                rating=round(random.uniform(4.75, 4.98), 2),
                total_trainings=random.randint(15, 60),
                certifications_json=["AWS Certified ML Specialist", "NVIDIA Deep Learning Institute", "Google Cloud ML Architect"],
                past_colleges_json=[random.choice(COLLEGE_NAMES)[0], random.choice(COLLEGE_NAMES)[0]],
                availability_status=random.choice(["Available Now", "Available Now", "Available Next Week"]),
            )
            db.add(trn_profile)
            trainers.append(trn_profile)
        db.commit()

        # 4. 100 Training Requests
        requests = []
        for i in range(1, 101):
            col = random.choice(colleges)
            tech = random.choice(TECHNOLOGIES_CATALOG)[0]
            req = TrainingRequest(
                college_id=col.id,
                college_name=col.college_name,
                location=col.location,
                technology=tech,
                skills_required_json=[tech, "Python", "FastAPI"],
                budget_per_day=random.choice([20000.0, 25000.0, 30000.0, 35000.0]),
                start_date=(datetime.now() + timedelta(days=random.randint(5, 40))).strftime("%Y-%m-%d"),
                end_date=(datetime.now() + timedelta(days=random.randint(41, 46))).strftime("%Y-%m-%d"),
                training_mode=random.choice(["Offline", "Online", "Hybrid"]),
                number_of_students=random.choice([60, 90, 120, 150]),
                duration_days=5,
                remarks="Requires live coding hands-on lab sessions.",
                status=random.choice(["PENDING", "AI_MATCHING", "MATCHED", "ASSIGNED", "COMPLETED"]),
            )
            db.add(req)
            requests.append(req)
        db.commit()

        # 5. 150 Assignments
        for i in range(1, 151):
            req = random.choice(requests)
            trn = random.choice(trainers)
            asgn = Assignment(
                request_id=req.id,
                trainer_id=trn.id,
                college_name=req.college_name,
                trainer_name=trn.name,
                technology=req.technology,
                start_date=req.start_date,
                end_date=req.end_date,
                total_budget=req.budget_per_day * req.duration_days,
                match_score=round(random.uniform(91.0, 99.4), 1),
                status=random.choice(["PENDING_APPROVAL", "APPROVED", "IN_PROGRESS", "COMPLETED"]),
                contract_status=random.choice(["DRAFT", "SENT", "SIGNED"]),
            )
            db.add(asgn)
        db.commit()

        # 6. 500 Notifications
        demo_mgr_user = db.query(User).filter(User.email == "s.jenkins@allocator.ai").first()
        for i in range(1, 501):
            notif = Notification(
                user_id=demo_mgr_user.id,
                title=random.choice(["AI Match Ready", "Assignment Created", "Contract Signed", "Request Submitted"]),
                message=f"Agentic AI match completed for {random.choice(COLLEGE_NAMES)[0]} requirement #{i}.",
                type=random.choice(["MATCH", "ASSIGNMENT", "SYSTEM", "APPROVAL"]),
                read=random.choice([True, False]),
            )
            db.add(notif)
        db.commit()

        logger.info("Successfully seeded database with 50 Trainers, 15 Colleges, 5 Managers, 100 Requests, 150 Assignments, and 500 Notifications!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
