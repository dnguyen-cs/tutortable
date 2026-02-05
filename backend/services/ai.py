from google import genai
from google.genai import types
from config import settings
from models import Student
from prompts import prompt_list

API_KEY = settings.GEMINI_API_KEY
MODEL = settings.GEMINI_MODEL
SYS_PROMPT = prompt_list["math"]
client = genai.Client(api_key=API_KEY)

def generate_practice_questions(student, topic_input, mode, num_questions):
    user_prompt = (
        f"Generate practice questions for the following context:\n"
        f"- Grade Level: {student.grade_level}\n"
        f"- Topic: {topic_input} (e.g., 'Multiplying Fractions')\n"
        f"- Student Interests: {', '.join(student.interests)}\n"
        f"- Mode: {mode}\n"
        f"- Count: {num_questions} questions"
    )

    response = client.models.generate_content(
        model=MODEL,
        contents=user_prompt,
        config=types.GenerateContentConfig(system_instruction=SYS_PROMPT, max_output_tokens=20000, temperature=0.3, response_mime_type="application/json")
    )
    print(response.text)

# temp_student = Student(
#     id=1,
#     name="Test Student",
#     grade_level="5th Grade",
#     interests=["soccer", "video games", "space"]
# )
# generate_practice_questions(temp_student, "Multiplying Fractions", "Practice", 5)