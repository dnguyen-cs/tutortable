from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import engine
import models
from routers import students, sessions

app = FastAPI(title="TutorTable API", version="1.0.0")

# CORS config
# TODO: update on production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)
app.include_router(students.router)
app.include_router(sessions.router)
@app.get("/api/health/")
def health_check():
    return {"status": "OK", "timestamp" : __import__('datetime').datetime.now().isoformat()}