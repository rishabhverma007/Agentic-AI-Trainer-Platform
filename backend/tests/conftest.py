import sys
from pathlib import Path

# Add backend directory to sys.path for pytest resolution
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
