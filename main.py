import pandas as pd
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, flash, url_for, json


@app.route('/')
@app.route('/index')
@app.route('/home')
def home():
    return render_template('pages/index.html')