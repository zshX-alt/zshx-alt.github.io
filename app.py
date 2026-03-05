from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "name": "Firmansyah",
        "status": "Python API aktif"
    })

@app.route("/hello")
def hello():
    return jsonify({
        "message": "Hello dari server Python"
    })