import requests
import os
import json

from flask import Flask, Response, request, session, g, redirect, url_for, abort, render_template, flash

app = Flask(__name__, static_folder='static')



@app.route("/")
def index():
    return render_template('base.html')



if __name__ == "__main__":
    app.run(debug=True)
