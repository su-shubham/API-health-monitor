from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from src.api_agent import api_agent, fetch_metrics_from_api
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

class Metrics(BaseModel):
    traffic_count: int
    error_rate: int
    uptime: int
    cpu_usage: float
    memory_usage: float
    disk_io: float
    concurrent_users: int

class APIResponse(BaseModel):
    predicted_response_time: float
    predicted_error_occurrence: int
    error_confidence: float
    risk_level: str
    time_to_impact: str
    recommendation: str

@app.post("/predict", response_model=APIResponse)
async def predict(metrics: Metrics):
    predictions = api_agent.analyze_metrics(
        metrics.traffic_count,
        metrics.error_rate,
        metrics.uptime,
        metrics.cpu_usage,
        metrics.memory_usage,
        metrics.disk_io,
        metrics.concurrent_users
    )
    return APIResponse(**predictions)

class APIUrlRequest(BaseModel):
    api_url: HttpUrl

@app.post("/predict-from-url", response_model=APIResponse)
async def predict_from_url(api_request: APIUrlRequest):
    try:
        metrics = fetch_metrics_from_api(api_request.api_url)
        predictions = api_agent.analyze_metrics(
            metrics['traffic_count'],
            metrics['error_rate'],
            metrics['uptime'],
            metrics['cpu_usage'],
            metrics['memory_usage'],
            metrics['disk_io'],
            metrics['concurrent_users']
        )
        return APIResponse(**predictions)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch or analyze data: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")