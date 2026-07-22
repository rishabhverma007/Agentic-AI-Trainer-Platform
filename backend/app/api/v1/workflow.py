from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import APIResponse
from app.services.assignment_workflow_service import assignment_workflow_service
from app.services.contract_pdf_service import contract_pdf_service

router = APIRouter(prefix="/workflow", tags=["Assignment Workflow Engine"])

@router.post("/approve", response_model=APIResponse[dict])
def approve_assignment(
    assignment_id: str = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    """Manager approves allocation, issues digital contract, and alerts trainer."""
    result = assignment_workflow_service.approve_assignment(db, assignment_id)
    return APIResponse(message="Assignment approved & contract issued successfully", data=result)

@router.post("/trainer-respond", response_model=APIResponse[dict])
def trainer_respond(
    assignment_id: str = Body(..., embed=True),
    action: str = Body(..., embed=True), # ACCEPT or REJECT
    db: Session = Depends(get_db)
):
    """Trainer accepts or declines bootcamp assignment."""
    result = assignment_workflow_service.respond_as_trainer(db, assignment_id, action)
    return APIResponse(message=f"Trainer response '{action}' recorded", data=result)

@router.get("/contract-pdf/{assignment_id}", response_model=APIResponse[dict])
def get_contract_pdf(assignment_id: str):
    """Retrieves PDF contract details and signature blocks."""
    doc = contract_pdf_service.generate_contract_document({"college_name": "IIT Delhi", "trainer_name": "Dr. Aris Thorne", "technology": "Generative AI"})
    return APIResponse(message="Contract document generated", data=doc)
