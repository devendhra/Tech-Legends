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


def analyze_sentiment(text: str) -> str:
    """
    Calls OpenRouter API to analyze sentiment of a single feedback text.
    Returns: Positive / Negative / Neutral
    """
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

    sentiment = response.json()["choices"][0]["message"]["content"].strip()

    # Safety normalization
    sentiment = sentiment.capitalize()
    if sentiment not in ["Positive", "Negative", "Neutral"]:
        sentiment = "Neutral"

    return sentiment


@app.route("/lyze-batch", methods=["POST"])
def analyze_batch():
    data = request.get_json()

    user_id = data.get("user_id")
    feedbacks = data.get("feedbacks", [])

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    if not feedbacks or not isinstance(feedbacks, list):
        return jsonify({"error": "feedbacks must be a non-empty list"}), 400

    results = []
    summary = {
        "total": 0,
        "positive": 0,
        "negative": 0,
        "neutral": 0
    }

    for feedback in feedbacks:
        if not isinstance(feedback, str) or not feedback.strip():
            continue

        sentiment = analyze_sentiment(feedback)

        results.append({
            "feedback": feedback,
            "sentiment": sentiment
        })

        summary["total"] += 1
        summary[sentiment.lower()] += 1

    return jsonify({
        "user_id": user_id,
        "results": results,
        "summary": summary
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)
