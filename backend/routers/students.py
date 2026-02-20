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
def read_students(skip: int=0, limit: int=100, db: Session = Depends(get_db), curr_tutor_id: str = "tempvalue"):
    students = db.query(models.Student).filter(models.Student.tutor_id == curr_tutor_id).offset(skip).limit(limit).all()
    return students

# Get student by ID
@router.get("/{student_id}", response_model=schemas.StudentRead)
def read_student(student_id: int, db: Session = Depends(get_db), curr_tutor_id: str = "tempvalue"):
    student = db.query(models.Student).filter(models.Student.tutor_id == curr_tutor_id, models.Student.id == student_id).first()
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

# Create new student
# TODO : replace curr_tutor_id with Cognito User
@router.post("/", response_model=schemas.StudentRead)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db), curr_tutor_id: str = "tempvalue"):
    # Check if student with name and grade level already exists
    existing_student = db.query(models.Student).filter(models.Student.tutor_id == curr_tutor_id,
        models.Student.name == student.name,
        models.Student.grade_level == student.grade_level).first()

    if existing_student:
        raise HTTPException(status_code=400, detail="Student already exists")

    db_student = models.Student(
        tutor_id = curr_tutor_id,
        name=student.name,
        grade_level=student.grade_level,
        mastery_scores=student.mastery_scores,
        mastery_history=student.mastery_history,
        interests=student.interests,
    )

    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@router.patch("/{student_id}", response_model=schemas.StudentRead)
def update_student(student_id: int, student_update: schemas.StudentUpdate, db: Session = Depends(get_db), curr_tutor_id: str = "tempvalue"):
    db_student = db.query(models.Student).filter(models.Student.tutor_id == curr_tutor_id, models.Student.id == student_id).first()

    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")

    update_data = student_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_student, key, value)

    db.add(db_student)
    db.commit()
    db.refresh(db_student)

    return db_student

@router.delete("/{student_id}", response_model=schemas.StudentRead)
def delete_student(student_id: int, db: Session = Depends(get_db), curr_tutor_id: str = "tempvalue"):
    db_student = db.query(models.Student).filter(models.Student.tutor_id == curr_tutor_id, models.Student.id == student_id).first()

    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(db_student)
    db.commit()

    return db_student