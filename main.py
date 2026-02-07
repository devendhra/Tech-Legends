import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not OPENROUTER_API_KEY:
    raise RuntimeError("OPENROUTER_API_KEY not found in .env")

app = Flask(__name__)
CORS(app)

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL_NAME = "mistralai/mistral-7b-instruct"


# -------------------------
# CATEGORY RULES (EXACT)
# -------------------------
def detect_category(text: str) -> str:
    text = text.lower()

    if any(word in text for word in ["quality", "defect", "broken", "damage"]):
        return "Product Quality"

    if any(word in text for word in ["delivery", "shipping", "late", "courier"]):
        return "Delivery & Logistics"

    if any(word in text for word in ["support", "agent", "help", "service"]):
        return "Customer Support"

    if any(word in text for word in ["crash", "bug", "error", "payment", "login"]):
        return "Reliability & Technical"

    if any(word in text for word in ["price", "cost", "expensive", "refund"]):
        return "Pricing & Value"

    if any(word in text for word in ["ui", "design", "easy", "difficult", "navigation"]):
        return "Usability / Experience"

    if any(word in text for word in ["add", "include", "should have", "feature request"]):
        return "Feature Request / Improvement"

    if any(word in text for word in ["remove", "delete", "disable", "stop"]):
        return "Removal Request"

    return "General"


# -------------------------
# SENTIMENT ANALYSIS
# -------------------------
def analyze_sentiment(text: str) -> str:
    response = requests.post(
        OPENROUTER_URL,
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": MODEL_NAME,
            "messages": [
                {
                    "role": "user",
                    "content": (
                        "Classify the sentiment of the following feedback "
                        "as Positive, Negative, or Neutral. "
                        "Respond with only one word.\n\n"
                        f"Feedback: {text}"
                    )
                }
            ]
        },
        timeout=20
    )

    if response.status_code != 200:
        raise RuntimeError("OpenRouter API failed")

    sentiment = response.json()["choices"][0]["message"]["content"].strip().capitalize()

    if sentiment not in ["Positive", "Negative", "Neutral"]:
        sentiment = "Neutral"

    return sentiment


# -------------------------
# API ENDPOINT
# -------------------------
@app.route("/lyze-batch", methods=["POST"])
def analyze_batch():
    data = request.get_json()

    user_id = data.get("user_id")
    feedbacks = data.get("feedbacks")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    if not isinstance(feedbacks, list) or len(feedbacks) == 0:
        return jsonify({"error": "feedbacks must be a non-empty list"}), 400

    results = []
    summary = {
        "positive": 0,
        "neutral": 0,
        "negative": 0,
        "total": 0
    }

    for feedback in feedbacks:
        if not isinstance(feedback, str) or not feedback.strip():
            continue

        sentiment = analyze_sentiment(feedback)
        category = detect_category(feedback)

        results.append({
            "feedback": feedback,
            "sentiment": sentiment,
            "category": category
        })

        summary[sentiment.lower()] += 1
        summary["total"] += 1

    return jsonify({
        "user_id": user_id,
        "results": results,
        "summary": summary
    })


# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
