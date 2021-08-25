
import subprocess
import sys
import os
import accessing_database
from pymongo import MongoClient

try:
    from flask import Flask, render_template, redirect, jsonify, request
    from flask_cors import CORS
    import accessing_database
    from bson.json_util import loads, dumps
except ImportError: 
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'flask'])
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'flask_cors'])
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'bson'])
finally:  
    from flask import Flask, render_template, redirect, jsonify, request
    from flask_cors import CORS
    from bson.json_util import loads, dumps

app = Flask(__name__)
app.config['MONGO_CONNECT'] = False
CORS(app)
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
db = client.pytodo

CORS(app,support_credentials=True)
@app.route('/', methods=["GET"])
def home():
    return render_template("index.html")

@app.route('/data')
def data():
    #return jsonify(accessing_database.tables)
    washington_r= dumps(accessing_database.washington_r)
    return jsonify(washington_r)

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
    # select 


@app.route('/about')
def about():
    return render_template(about.html)

if __name__ == '__main__':    
    app.run(debug=True)