from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import requests, os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from utils.pdf_reader import extract_pdf_text
from utils.docx_reader import extract_docx_text
from utils.excel_reader import extract_excel_text

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL_NAME = "openai/gpt-3.5-turbo"

class TextInput(BaseModel):
    user_id: str
    feedbacks: list[str]

def analyze_with_ai(text):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [{
            "role": "user",
            "content": f"Classify sentiment as Positive, Negative or Neutral:\n{text}"
        }]
    }
    r = requests.post(url, headers=headers, json=payload)
    res = r.json()["choices"][0]["message"]["content"].lower()

    if "positive" in res:
        return "Positive"
    elif "negative" in res:
        return "Negative"
    return "Neutral"

def process_feedbacks(user_id, feedbacks):
    results = []
    summary = {"positive": 0, "negative": 0, "neutral": 0}

    for fb in feedbacks:
        sentiment = analyze_with_ai(fb)
        results.append({"feedback": fb, "sentiment": sentiment})
        summary[sentiment.lower()] += 1
    
    return {
        "user_id": user_id,
        "results": results,
        "summary": {
            "total": len(feedbacks),
            **summary
        }
    }

@app.post("/analyze-text")
def analyze_text(data: TextInput):
    return process_feedbacks(data.user_id, data.feedbacks)

@app.post("/upload-file")
async def upload_file(user_id: str, file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1].lower()

    if ext == "pdf":
        feedbacks = extract_pdf_text(file.file)
    elif ext in ["docx"]:
        feedbacks = extract_docx_text(file.file)
    elif ext in ["xlsx", "xls", "csv"]:
        feedbacks = extract_excel_text(file.file)
    else:
        return {"error": "Unsupported file type"}

    return process_feedbacks(user_id, feedbacks)


def generate_summary(feedbacks: list) -> str:
    """
    Calls OpenRouter API to generate a summary of multiple feedback texts.
    """
    combined_feedback = "\n".join([f"- {f}" for f in feedbacks])
    response = requests.post(
        OPENROUTER_URL,
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": MODEL_NAME, # You might want a stronger model for summarization, e.g., "google/gemini-pro"
            "messages": [
                {
                    "role": "user",
                    "content": (
                        "Summarize the following customer feedback in 2-3 concise sentences. "
                        "Highlight overall sentiment and key points mentioned across feedbacks.\n\n"
                        f"Feedbacks:\n{combined_feedback}"
                    )
                }
            ],
            "max_tokens": 150 # Limit summary length
        },
        timeout=30 # Longer timeout for summary
    )

    if response.status_code != 200:
        print(f"OpenRouter API for summary failed: {response.text}")
        return "Could not generate summary."

    summary_text = response.json()["choices"][0]["message"]["content"].strip()
    return summary_text

@app.post("/lyze-batch")
def analyze_batch(data: TextInput):
    user_id = data.user_id
    feedbacks = data.feedbacks
    results = []
    summary = {"positive": 0, "negative": 0, "neutral": 0}

    for feedback in feedbacks:
        sentiment = analyze_with_ai(feedback)
        results.append({"feedback": feedback, "sentiment": sentiment})
        summary[sentiment.lower()] += 1

    # After the loop, generate the AI summary
    ai_generated_summary = generate_summary(feedbacks)

    return {
        "user_id": user_id,
        "results": results,
        "summary": {
            "total": len(feedbacks),
            **summary
        },
        "ai_summary": ai_generated_summary,
        "timestamp": datetime.now().isoformat()
    }