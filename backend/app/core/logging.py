import logging
import sys

def setup_logging():
    """Configures structured logging format for backend production diagnostics."""
    logging_format = "%(asctime)s - [%(levelname)s] - %(name)s - %(message)s"
    
    logging.basicConfig(
        level=logging.INFO,
        format=logging_format,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

logger = logging.getLogger("allocator_backend")
