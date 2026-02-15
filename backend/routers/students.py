from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from db import get_db

router = APIRouter(
    prefix="/api/students",
    tags=["students"]
)
# Get list of students
@router.get("/", response_model=list[schemas.StudentRead])
def read_students(skip: int=0, limit: int=100, db: Session = Depends(get_db)):
    students = db.query(models.Student).offset(skip).limit(limit).all()
    return students

# Create new student
@router.post("/", response_model=schemas.StudentRead)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    # Check if student with name and grade level already exists
    existing_student = db.query(models.Student).filter(
        models.Student.name == student.name, 
        models.Student.grade_level == student.grade_level).first()
    
    if existing_student:
        raise HTTPException(status_code=400, detail="Student already exists")
    
    # Create new student
    db_student = models.Student(
        name=student.name,
        grade_level=student.grade_level,
        mastery_scores=student.mastery_scores,
        interests=student.interests
    )

    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# Get student by ID
@router.get("/{student_id}", response_model=schemas.StudentRead)
def read_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student