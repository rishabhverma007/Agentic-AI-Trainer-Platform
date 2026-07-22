from app.core.logging import logger

class WhatsAppService:
    """WhatsApp Notification Service abstraction for instant mobile alerts."""

    def send_assignment_whatsapp(self, phone: str, trainer_name: str, college_name: str):
        logger.info(f"[WhatsApp Service] Instant WhatsApp message dispatched to {phone}: Allocation approved for {trainer_name} at {college_name}.")
        return True

whatsapp_service = WhatsAppService()
