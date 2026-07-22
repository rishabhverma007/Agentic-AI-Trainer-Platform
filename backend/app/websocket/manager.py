from typing import Dict, List
from fastapi import WebSocket
from app.core.logging import logger

class ConnectionManager:
    def __init__(self):
        """WebSocket connection manager foundation for real-time broadcasts."""
        self.active_connections: Dict[str, List[WebSocket]] = {
            "managers": [],
            "trainers": [],
            "colleges": [],
            "notifications": []
        }

    async def connect(self, channel: str, websocket: WebSocket):
        await websocket.accept()
        if channel in self.active_connections:
            self.active_connections[channel].append(websocket)
            logger.info(f"WebSocket client connected to channel: '{channel}'")

    def disconnect(self, channel: str, websocket: WebSocket):
        if channel in self.active_connections and websocket in self.active_connections[channel]:
            self.active_connections[channel].remove(websocket)
            logger.info(f"WebSocket client disconnected from channel: '{channel}'")

    async def broadcast_to_channel(self, channel: str, message: dict):
        if channel in self.active_connections:
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    logger.error(f"Error broadcasting to WebSocket connection: {e}")

ws_manager = ConnectionManager()
