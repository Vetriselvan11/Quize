from flask import Blueprint, request, jsonify
from services.quiz_service import QuizService
from services.result_service import ResultService
from services.db import DB
from utils.decorators import admin_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_users():
    users = list(DB.users.find({}, {"_id": 0, "password_hash": 0}))
    return jsonify(users), 200

@admin_bp.route('/quizzes', methods=['GET'])
@admin_required
def get_all_quizzes():
    return jsonify(QuizService.get_all_quizzes()), 200

@admin_bp.route('/quizzes', methods=['POST'])
@admin_required
def create_quiz():
    return jsonify(QuizService.create_quiz(request.json)), 201

@admin_bp.route('/quizzes/<quiz_id>', methods=['PUT'])
@admin_required
def update_quiz(quiz_id):
    result = QuizService.update_quiz(quiz_id, request.json)
    if result:
        return jsonify(result), 200
    return jsonify({"error": "Not found"}), 404

@admin_bp.route('/quizzes/<quiz_id>', methods=['DELETE'])
@admin_required
def delete_quiz(quiz_id):
    if QuizService.delete_quiz(quiz_id):
        return jsonify({"message": "Deleted"}), 200
    return jsonify({"error": "Not found"}), 404

@admin_bp.route('/questions', methods=['POST'])
@admin_required
def add_question():
    return jsonify(QuizService.add_question(request.json)), 201

@admin_bp.route('/results', methods=['GET'])
@admin_required
def get_all_results():
    results = ResultService.get_all_results()
    return jsonify(results), 200

@admin_bp.route('/dashboard-stats', methods=['GET'])
@admin_required
def get_dashboard_stats():
    return jsonify({
        "total_users": DB.users.count_documents({}),
        "total_quizzes": DB.quizzes.count_documents({}),
        "total_attempts": DB.attempts.count_documents({}),
        "active_quizzes": DB.quizzes.count_documents({"status": "active"})
    }), 200
