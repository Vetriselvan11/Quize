from flask import Flask, jsonify
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.quiz_routes import quiz_bp
from routes.admin_routes import admin_bp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/user')
app.register_blueprint(quiz_bp, url_prefix='/api/quizzes')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/')
def index():
    return jsonify({"message": "Quiz Backend API Running!"})

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Route not found"}), 404

if __name__ == '__main__':
    # Ensure data directory exists
    os.makedirs(os.path.join(os.path.dirname(__file__), 'data'), exist_ok=True)
    app.run(debug=True, port=5000)
