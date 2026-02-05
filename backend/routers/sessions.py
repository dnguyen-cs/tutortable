from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..db import get_db

router = APIRouter(
    prefix="/api/sessions",
    tags=["sessions"]
)

# Log new tutoring session
@router.post("/", response_model=schemas.SessionRead)
def log_session(session: schemas.SessionCreate, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == session.student_id).first()
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Create new session
    db_session = models.Session(
        student_id=session.student_id,
        topics_covered=session.topics_covered,
        metrics=session.metrics,
        question_set=session.question_set,
        notes=session.notes,
    )

    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session