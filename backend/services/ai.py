from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key="")

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Explain how AI works in a few words",
)

print(response.text)