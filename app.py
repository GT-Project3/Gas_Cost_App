from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os
import datetime

app = Flask(__name__)
app.config['MONGO_CONNECT'] = False
CORS(app)
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
db = client.pytodo

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/api", methods=["GET"])
def get_all_todos():
    todos = []
    for todo in list(db.todos.find()):
        todos.append({
            "fuel_eff": todo["fuel_eff"]
        })
    return jsonify(data={"status": 200, "msg": "Found Todos", "todos": todos})

@app.route("/api/create_todo", methods=["POST"])
def post_create_todo():
    fuel_eff = request.form["fuel_eff"]
    print("fuel_eff", fuel_eff)


if __name__ == "__main__":
    app.run(debug=True)
    