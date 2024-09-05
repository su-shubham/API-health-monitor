from fastapi import FastAPI
from pydantic import BaseModel
from api_agent import api_agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
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
    llm_analysis: str 

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
    
    predictions["llm_analysis"] = predictions.get("llm_analysis", "No LLM analysis provided.")
    print(predictions["llm_analysis"])
    return APIResponse(**predictions)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
