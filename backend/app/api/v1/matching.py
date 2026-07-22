from typing import Optional
from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import APIResponse
from app.agents.agents import supervisor_agent

router = APIRouter(prefix="/matching", tags=["Agentic AI Matching Engine"])

@router.post("/orchestrate", response_model=APIResponse[dict])
def orchestrate_trainer_matching(
    request_id: Optional[str] = Body(None, embed=True),
    custom_prompt: Optional[str] = Body(None, embed=True),
    db: Session = Depends(get_db)
):
    """Executes the 7-agent pipeline to extract parameters, score vector similarity, and rank Top 5 trainers."""
    result = supervisor_agent.run_pipeline(db, request_id, custom_prompt)
    return APIResponse(message="Agentic AI matching pipeline executed successfully", data=result)
