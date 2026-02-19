from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class ExamResultBase(BaseModel):
    exam_type: str
    total_score: float
    regression_alerts: List[Dict[str, Any]] = []
    question_data: List[Dict[str, Any]] = []

class ExamResultCreate(ExamResultBase):
    student_id: int

class ExamResultRead(ExamResultBase):
    id: int
    date_taken: datetime
    student_id: int

    class Config:
        from_attributes = True

class SessionBase(BaseModel):
    topics_covered: List[str] = []
    metrics: Dict[str, Any] = {}
    question_set: List[Dict[str, Any]] = []
    notes: Optional[str] = None

class SessionCreate(SessionBase):
    student_id: int

class SessionRead(SessionBase):
    id: int
    date: datetime
    student_id: int

    class Config:
        from_attributes = True

class StudentBase(BaseModel):
    name: str
    grade_level: int
    mastery_scores: Dict[str, float] = {}
    mastery_history: Dict[str, Dict[str, float]] = {}
    interests: List[str] = []

class StudentCreate(StudentBase):
    pass

class StudentRead(StudentBase):
    id: int
    sessions: List[SessionRead] = []
    exam_results: List[ExamResultRead] = []

    class Config:
        from_attributes = True

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    grade_level: Optional[int] = None
    mastery_scores: Optional[Dict] = None
    mastery_history: Optional[Dict[str, Dict[str, float]]] = None
    interests: Optional[str] = None