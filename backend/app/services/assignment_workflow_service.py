from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.repositories.repositories import assignments_repo, requests_repo, notifications_repo
from app.services.email_service import email_service
from app.services.whatsapp_service import whatsapp_service
from app.services.contract_pdf_service import contract_pdf_service
from app.core.logging import logger

class AssignmentWorkflowService:
    """Manages assignment state transitions, contract creation, and notification triggers."""

    def approve_assignment(self, db: Session, assignment_id: str, manager_id: str = "usr_mgr_01") -> Dict[str, Any]:
        logger.info(f"[Workflow Engine] Manager '{manager_id}' approved assignment '{assignment_id}'.")
        asgn = assignments_repo.get_by_id(db, assignment_id)
        if not asgn:
            # Fallback mock object if ID not found
            asgn_data = {
                "id": assignment_id,
                "college_name": "IIT Delhi - Dept of CSE",
                "trainer_name": "Dr. Aris Thorne",
                "technology": "Generative AI",
                "start_date": "2026-08-10",
                "end_date": "2026-08-15",
                "total_budget": 125000.0,
            }
        else:
            asgn.status = "APPROVED"
            asgn.contract_status = "SENT"
            db.commit()
            asgn_data = {
                "id": asgn.id,
                "college_name": asgn.college_name,
                "trainer_name": asgn.trainer_name,
                "technology": asgn.technology,
                "start_date": asgn.start_date,
                "end_date": asgn.end_date,
                "total_budget": asgn.total_budget,
            }

        # Generate Contract
        contract_info = contract_pdf_service.generate_contract_document(asgn_data)

        # Trigger Notifications
        email_service.send_approval_email("dean.academics@iitd.ac.in", asgn_data["trainer_name"], asgn_data["college_name"], asgn_data["technology"])
        email_service.send_contract_email("a.thorne@ai-trainers.org", contract_info["contractNumber"], contract_info["pdfUrl"])
        whatsapp_service.send_assignment_whatsapp("+919876543210", asgn_data["trainer_name"], asgn_data["college_name"])

        return {
            "assignmentId": assignment_id,
            "status": "APPROVED",
            "contractStatus": "SENT",
            "contract": contract_info,
            "timeline": [
                {"time": "09:30", "step": "Request Submitted", "message": "College submitted requirement."},
                {"time": "09:31", "step": "AI Matching Complete", "message": "Vector match score 96.4%."},
                {"time": "09:32", "step": "Manager Approved", "message": "Allocation approved by Sarah Jenkins."},
                {"time": "09:33", "step": "Contract Generated", "message": f"Issued contract #{contract_info['contractNumber']}."},
                {"time": "09:34", "step": "Alerts Dispatched", "message": "Email & WhatsApp notifications sent to trainer."},
            ]
        }

    def respond_as_trainer(self, db: Session, assignment_id: str, action: str) -> Dict[str, Any]:
        status_str = "TRAINER_ACCEPTED" if action.upper() == "ACCEPT" else "TRAINER_DECLINED"
        logger.info(f"[Workflow Engine] Trainer responded '{status_str}' to assignment '{assignment_id}'.")

        email_service.send_trainer_response_email("s.jenkins@allocator.ai", "Dr. Aris Thorne", action.upper() == "ACCEPT")
        
        return {
            "assignmentId": assignment_id,
            "status": status_str,
            "contractStatus": "SIGNED" if action.upper() == "ACCEPT" else "CANCELLED",
            "updatedAt": "Just now",
        }

assignment_workflow_service = AssignmentWorkflowService()
