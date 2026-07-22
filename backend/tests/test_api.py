import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_health():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"

def test_matching_endpoint():
    response = client.post("/api/v1/matching/orchestrate", json={
        "custom_prompt": "Need a senior PyTorch trainer for 5-day bootcamp in Delhi"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "recommendations" in data["data"]
    assert len(data["data"]["recommendations"]) > 0

def test_intelligence_endpoints():
    res_insights = client.get("/api/v1/intelligence/insights")
    assert res_insights.status_code == 200
    
    res_telemetry = client.get("/api/v1/intelligence/telemetry")
    assert res_telemetry.status_code == 200
    
    res_leaderboards = client.get("/api/v1/intelligence/leaderboards")
    assert res_leaderboards.status_code == 200

def test_workflow_approve():
    res = client.post("/api/v1/workflow/approve", json={"assignment_id": "asgn_test_01"})
    assert res.status_code == 200
    assert res.json()["success"] is True
    assert "contract" in res.json()["data"]

def test_admin_diagnostics():
    res = client.get("/api/v1/admin-tools/diagnostics")
    assert res.status_code == 200
    assert res.json()["data"]["status"] == "HEALTHY"
