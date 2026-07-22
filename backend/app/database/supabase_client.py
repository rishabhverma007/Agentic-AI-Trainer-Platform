from supabase import create_client, Client
from app.core.config import settings
from app.core.logging import logger

_supabase_client: Client = None

def get_supabase_client() -> Client:
    """Returns singleton Supabase Python SDK Client for Auth & Storage operations."""
    global _supabase_client
    if _supabase_client is None:
        try:
            _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            logger.info("Supabase Python SDK client initialized.")
        except Exception as e:
            logger.warning(f"Could not connect to live Supabase URL ({e}). Mock mode active.")
            _supabase_client = None
    return _supabase_client
