
import subprocess
import sys
import os
import json
from sqlalchemy import create_engine
import datetime
# from pymongo import MongoClient

try:
    from flask import Flask, render_template, redirect, jsonify, request
    from flask_cors import CORS
    # from bson.json_util import loads, dumps
except ImportError: 
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'flask'])
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'flask_cors'])
    # subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'bson'])
finally:  
    from flask import Flask, render_template, redirect, jsonify, request
    from flask_cors import CORS
    # from bson.json_util import loads, dumps

app = Flask(__name__)
client = os.getenv("SQL_URI","gaspriceproject.chejw18rcl0w.us-east-1.rds.amazonaws.com:5432/gaspriceproject" )
CORS(app)

# CONNECT TO POSTGRES
rds_connection_string = "postgres:postgress@gaspriceproject.chejw18rcl0w.us-east-1.rds.amazonaws.com:5432/gaspriceproject"
engine = create_engine(f'postgresql://{rds_connection_string}')
tables = engine.table_names()

# NAME AWS TABLES
regionstates = engine.execute(f'select * from regionstates').fetchall()

# Define a function we'll use to determine the next Sunday of the user provided date
def next_weekday(d, weekday):
    days_ahead = weekday - d.weekday()
    if days_ahead <= 0: # Target day already happened this week
        days_ahead += 7
    return d + datetime.timedelta(days_ahead)

CORS(app,support_credentials=True)
@app.route('/', methods=["GET"])
def home():
    return render_template("index.html")



@app.route("/api/create_todo", methods=["POST"])
def post_create_todo():
    fuel_eff = request.form["fuel_eff"]
    if fuel_eff == "compact":
        tank_size = 12
    elif fuel_eff == "sedan":
        tank_size = 15
    elif fuel_eff == "suv":
        tank_size = 19
    else:
        tank_size = 25
    
    

    start_date = request.form["start_date"]
    year = int(start_date[:4])
    month = int(start_date[5:7])
    day = int(start_date[8:10])
    d = datetime.date(year, month, day)
    next_sunday = next_weekday(d, 6).strftime('%Y-%m-%d')   
    
    fuel_type = request.form["fuel_type"]
    if fuel_type == "1":
        grade = "r"
    elif fuel_type == "1.25":
        grade = "m"
    else:
        grade = "p"
    
    states = request.form["states"] # VALUES TO BE GIVEN BY PETER
    states = states.replace("[","")
    states = states.replace("]","")
    states = states.replace('"',"")
    states = states.split(',')
    print(states)
    state_length = len(states)
    states = states[1:state_length]
    print(states)
    
    

    tables_needed = []

    for state in states:
        for record in regionstates:
            if state == record[0]:
                region = record[1].replace(" ","").lower()
                table_name = region + "_" + grade
                tables_needed.append(table_name)

    #tables_needed = tables_needed[2:len(tables_needed)-2]
    print(tables_needed)
    total_cost = 0

    for table in tables_needed:
        astr = table
        locals()[astr] = engine.execute(f'select * from {table}').fetchall()
    
    for table in tables_needed:
        new_table = locals()[table]
        for record in new_table:
            if next_sunday == record[0]:
                gas_price = float(record[1])
                cost = gas_price*tank_size
                total_cost = cost + total_cost
                break
    
            
    total_cost = "{:.2f}".format(total_cost)
    print(total_cost)
    return total_cost

# @app.route('/getpythondata')
# def get_python_data():
#     total_cost = post_create_todo()
#     return total_cost




@app.route('/about')
def about():
    return render_template("about.html")

if __name__ == '__main__':    
    app.run(debug=True)



# @app.route("/api", methods=["GET"])
# def get_all_todos():
#     todos = []
#     for todo in list(db.todos.find()):
#         todos.append({
#             "fuel_eff": todo["fuel_eff"]
#         })
#     return jsonify(data={"status": 200, "msg": "Found Todos", "todos": todos})