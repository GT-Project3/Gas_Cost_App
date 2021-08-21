from flask import Flask, render_template, redirect, jsonify
import os
from flask_cors import CORS
# import sql alchemy file with data

app = Flask(__name__, template_folder='HTML')
CORS(app,support_credentials=True)

@app.route('/data')
def data():


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template(about.html)

if __name__ == '__main__':    
    app.run(debug=True)