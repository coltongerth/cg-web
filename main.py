import pandas as pd
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, flash, url_for, json

app = Flask(__name__, template_folder="templates")

@app.route('/')
@app.route('/index')
@app.route('/home')
def home():
    return render_template('pages/index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)