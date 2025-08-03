from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Static dummy data
INTERN_DATA = {
    "name": "Praveen Revalla",
    "referralCode": "praveen2025",
    "totalDonations": 1700
}

LEADERBOARD_DATA = [
    {"name": "Anu", "referral": "anu2025", "total": 2200},
    {"name": "Praveen", "referral": "praveen2025", "total": 1700},
    {"name": "Ravi", "referral": "ravi2025", "total": 900}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    name = request.args.get('name', 'Praveen')
    return render_template('dashboard.html', name=name)

@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')

@app.route('/api/intern')
def api_intern():
    return jsonify(INTERN_DATA)

@app.route('/api/leaderboard')
def api_leaderboard():
    return jsonify(LEADERBOARD_DATA)

if __name__ == '__main__':
    app.run(debug=True) 