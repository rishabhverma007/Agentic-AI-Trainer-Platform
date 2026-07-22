from app.core.logging import logger

class EmailService:
    """Enterprise Email Notification Service supporting HTML templates and mock delivery."""

    def send_approval_email(self, recipient_email: str, trainer_name: str, college_name: str, technology: str):
        logger.info(f"[Email Service] Sending Assignment Approval notification to '{recipient_email}' for {trainer_name} at {college_name}.")
        return True

    def send_contract_email(self, recipient_email: str, contract_number: str, contract_url: str):
        logger.info(f"[Email Service] Sending Digital Contract '{contract_number}' to '{recipient_email}'.")
        return True

    def send_trainer_response_email(self, recipient_email: str, trainer_name: str, accepted: bool):
        status_str = "ACCEPTED" if accepted else "DECLINED"
        logger.info(f"[Email Service] Sending Trainer Response '{status_str}' alert from {trainer_name} to '{recipient_email}'.")
        return True

email_service = EmailService()
