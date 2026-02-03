from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class StudentBase(BaseModel):
    name: str
    grade_level: int
    subjects: str
    curriculum: Optional[str] = None

class SessionBase(BaseModel):
    topics_covered: str
    mastery_score: float
    notes: Optional[str] = None

class StudentCreate(StudentBase):
    pass

class SessionCreate(SessionBase):
    student_id: int

class SessionRead(SessionBase):
    id: int
    date: datetime
    student_id: int

    class Config:
        from_attributes = True

class StudentRead(StudentBase):
    id: int
    sessions: List[SessionRead] = []

    class Config:
        from_attributes = True