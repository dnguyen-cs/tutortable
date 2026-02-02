from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import engine, get_db
import models

app = FastAPI(title="TutorTable API", version="1.0.0")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)
@app.get("/api/health")
def health_check():
    return {"status": "OK", "timestamp" : __import__('datetime').datetime.now().isoformat()}

@app.post("/api/test-student")
def create_test_student(db: Session = Depends(get_db)):
    new_student = models.Student(name="Test", grade_level=5, subjects="Math, Science")
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student