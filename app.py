from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)

# ambil API key dari Railway
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

# cek server
@app.route("/")
def home():
    return jsonify({
        "status": "AI Server Aktif",
        "model": "gpt-4o-mini"
    })

# endpoint chat
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        message = data.get("message", "")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": message}
            ]
        )

        reply = response.choices[0].message.content

        return jsonify({
            "user": message,
            "reply": reply
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)