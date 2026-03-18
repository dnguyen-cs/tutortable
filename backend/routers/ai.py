from fastapi import APIRouter, Depends, HTTPException
from google import genai
from config import settings
from sqlalchemy.orm import Session
import models
from schemas import ExamRequest
from db import get_db

client = genai.Client(api_key=settings.GEMINI_API_KEY)

router = APIRouter(
    prefix="/api/ai",
    tags=["ai"]
)

# Grade level, topics, interests
@router.post("/diagnostic")
def generate_exam(data: ExamRequest, db: Session = Depends(get_db)):
    diagnostic = models.DiagnosticExam(
        student_id = data.student_id,
        status = "processing",
        metadata_snapshot={"topics": data.topics, "interests": data.interests}
    )
    db.add(diagnostic)
    db.commit()
    db.refresh(diagnostic)

    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=f"""
            You are an expert educational diagnostician. Your task is to generate a baseline diagnostic exam for a new student to assess their current proficiency across specified subjects.
    
            INPUT PARAMETERS:
            - Grade Level: {data.grade_level}
            - Target Topics: {data.topics}
            - Student Interests: {data.interests}
    
            INSTRUCTIONS:
            1. Create a comprehensive diagnostic exam covering all {data.topics} appropriate for a {data.grade_level} student.
            2. Progression Rule: The exam MUST be structured in strict order of ascending difficulty. Begin with foundational, easy questions and progressively scale up to highly advanced, challenging questions.
            3. Distribute the topics evenly throughout the difficulty curve so each subject is tested at multiple cognitive levels.
            4. Weave the student's {data.interests} into the scenarios and word problems to build rapport and engagement.
    
            OUTPUT FORMAT:
            Generate the exam strictly in Markdown format. 
            - Use standard Markdown for formatting (e.g., `##` for headings, `1.` for numbered lists, `**` for bold).
            - For ANY mathematical equations, variables, or expressions, you MUST use LaTeX math mode.
            - Use a single `$` for inline math (e.g., $x = 5$).
            - Use double `$$` for display/block math on its own line.
            - Do not output any conversational preamble or postscript.
            """
        )
        diagnostic.content = response.text
        diagnostic.status = "completed"
        db.commit()
        db.refresh(diagnostic)
    except Exception as e:
        diagnostic.status = "failed"
        db.commit()
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate the exam.")

    formatted_date = diagnostic.date_created.strftime("%Y/%m/%d")
    return {
        "id": diagnostic.id,
        "type": "diagnostic",
        "taken": formatted_date
    }