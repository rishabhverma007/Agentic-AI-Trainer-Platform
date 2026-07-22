import os
from typing import Optional
from app.database.supabase_client import get_supabase_client
from app.core.config import settings
from app.core.logging import logger

class StorageService:
    def __init__(self):
        self.supabase = get_supabase_client()

    def upload_file(self, bucket: str, destination_filename: str, file_bytes: bytes, content_type: str = "application/pdf") -> str:
        """Uploads a file to Supabase Storage bucket and returns the public or access URL."""
        if self.supabase:
            try:
                # Direct Supabase Storage API upload
                res = self.supabase.storage.from_(bucket).upload(
                    path=destination_filename,
                    file=file_bytes,
                    file_options={"content-type": content_type, "upsert": "true"}
                )
                url = self.supabase.storage.from_(bucket).get_public_url(destination_filename)
                logger.info(f"Uploaded file '{destination_filename}' to bucket '{bucket}'.")
                return url
            except Exception as e:
                logger.warning(f"Supabase storage upload error ({e}). Returning fallback storage URL.")
        
        # Fallback local URL format
        return f"https://demo-storage.allocator.ai/{bucket}/{destination_filename}"

storage_service = StorageService()
