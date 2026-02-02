from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import engine, get_db
import models, schemas

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
@app.get("/api/health/")
def health_check():
    return {"status": "OK", "timestamp" : __import__('datetime').datetime.now().isoformat()}

@app.post("/api/students/", response_model=schemas.StudentRead)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    existing_student = db.query(models.Student).filter(
        models.Student.name == student.name, 
        models.Student.grade_level == student.grade_level, 
        models.Student.subjects == student.subjects).first()
    
    if existing_student:
        raise HTTPException(status_code=400, detail="Student already exists")
    db_student = models.Student(
        name=student.name,
        grade_level=student.grade_level,
        subjects=student.subjects,
        curriculum=student.curriculum
    )

    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@app.get("/api/students/", response_model=list[schemas.StudentRead])
def read_students(skip: int=0, limit: int=100, db: Session = Depends(get_db)):
    students = db.query(models.Student).offset(skip).limit(limit).all()
    return students

@app.get("/api/students/{student_id}/", response_model=schemas.StudentRead)
def read_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@app.post("/api/sessions/", response_model=schemas.SessionRead)
def log_session(session: schemas.SessionCreate, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == session.student_id).first()
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    
    db_session = models.Session(
        topics_covered=session.topics_covered,
        mastery_score=session.mastery_score,
        notes=session.notes,
        student_id=session.student_id
    )

    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session