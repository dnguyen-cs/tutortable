from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Float
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False) # Student name | John Smith
    grade_level = Column(Integer, nullable=False) # Grade Level | 5
    subjects = Column(String, nullable=False) # Subjects | Math, English

    sessions = relationship("Session", back_populates="student") 
    lesson_plans = relationship("LessonPlan", back_populates="student")

class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date = Column(DateTime, default=datetime.now)
    topics_covered = Column(String, nullable=False)
    mastery_score = Column(Float, nullable=False)
    notes = Column(Text)

    student = relationship("Student", back_populates="sessions")

class LessonPlan(Base):
    __tablename__ = "lesson_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date_created = Column(DateTime, default=datetime.now)

    weaknesses = Column(String) # Weaknesses | Fractions, Grammar
    strengths = Column(String) # Strengths | Multiplication, Vocabulary
    ai_gen_content = Column(Text) 

    student = relationship("Student", back_populates="lesson_plans")

class Curriculum(Base):
    """
    Stores the official school standards or syllabus.
    Example: 
    - Name: "NYS Common Core Grade 5 Math"
    - Description: "Focuses on fractions, decimals, and volume..."
    - File_URL: (Optional) Link to PDF on S3 if you add that later.
    """
    __tablename__ = "curriculums"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=False)