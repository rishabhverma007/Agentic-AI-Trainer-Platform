import uuid
from datetime import datetime, timezone
from app.core.logging import logger

class ContractPDFService:
    """Renders digital contract metadata and legal terms for institutional bootcamps."""

    def generate_contract_document(self, assignment_data: dict) -> dict:
        contract_number = f"CTR-2026-{uuid.uuid4().hex[:6].upper()}"
        logger.info(f"[Contract Engine] Generating legal contract '{contract_number}' for {assignment_data.get('college_name')}.")

        contract_content = f"""
================================================================================
                    ALLOCATOR.AI ENTERPRISE SERVICE AGREEMENT
================================================================================
CONTRACT REF: {contract_number}
DATE: {datetime.now(timezone.utc).strftime("%Y-%m-%d")}

PARTIES:
1. INSTITUTION: {assignment_data.get('college_name', 'University Partner')}
2. TRAINER: {assignment_data.get('trainer_name', 'Technical Specialist')}
3. PLATFORM: ALLOCATOR.AI Inc.

TERMS & SCOPE OF WORK:
- Technology Domain: {assignment_data.get('technology', 'Generative AI')}
- Bootcamp Schedule: {assignment_data.get('start_date')} to {assignment_data.get('end_date')}
- Agreed Daily Rate: ₹{assignment_data.get('total_budget', 125000)}
- Deliverables: Daily hands-on coding labs, course material, final project evaluation.

SIGNATURE BLOCKS:
[SIGNED ELECTRONICALLY BY ALLOCATOR.AI SYSTEM]
[SIGNED BY INSTITUTION REPRESENTATIVE]
[SIGNED BY TRAINER]
================================================================================
"""
        return {
            "contractNumber": contract_number,
            "status": "GENERATED",
            "content": contract_content,
            "pdfUrl": f"https://demo-storage.allocator.ai/contracts/{contract_number}.pdf",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
        }

contract_pdf_service = ContractPDFService()
