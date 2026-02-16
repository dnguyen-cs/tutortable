from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Float, JSON, Boolean
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False) # Student name | John Smith
    grade_level = Column(Integer, nullable=False) # Grade Level | 5
    mastery_scores = Column(JSON, default=dict) # Mastery Scores | {"Fractions": 0.8, "Decimals": 0.6}
    mastery_history = Column(JSON, default=dict)
    interests = Column(JSON, default=list) # Interests | ["Gaming", "Sports", "Music"]

    sessions = relationship("Session", back_populates="student") 
    exam_results = relationship("ExamResult", back_populates="student")

class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date = Column(DateTime, default=datetime.now)
    topics_covered = Column(JSON, default=list) # Topics Covered | ["Fractions", "Decimals"]
    metrics = Column(JSON) # Metrics | {"accuracy" : .80, "questions_completed": 20}
    question_set = Column(JSON, default=list) # Question Set | [{"question_id": "1", "is_correct": True, "answer": "3/4"}]
    notes = Column(Text)

    student = relationship("Student", back_populates="sessions")

class ExamResult(Base):
    __tablename__ = "exam_results"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date_taken = Column(DateTime, default=datetime.now)
    exam_type = Column(String, nullable=False) # "Monthly Calibration" or "Practice Test"
    total_score = Column(Float) # Total Score | 93.5
    regression_alerts = Column(JSON, default=list) # [{"topic": "Fractions", "previous_score": 0.8, "current_score": 0.5}]
    question_data = Column(JSON, default=list) # [{"question_id": 1, "is_correct": False}, {"question_id": 2, "is_correct": True}]

    student = relationship("Student", back_populates="exam_results")