from flask import Blueprint, request, jsonify
from services.quiz_service import QuizService
from services.result_service import ResultService
from utils.decorators import token_required
from datetime import datetime

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/available', methods=['GET'])
@token_required
def get_available_quizzes():
    return jsonify(QuizService.get_available_quizzes()), 200

@quiz_bp.route('/<quiz_id>', methods=['GET'])
@token_required
def get_quiz(quiz_id):
    quiz = QuizService.get_quiz(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    
    # Do not return answer keys if they exist in questions payload
    questions = QuizService.get_questions_for_quiz(quiz_id)
    safe_questions = []
    for q in questions:
        safe_q = dict(q)
        safe_q.pop('correct_option', None)
        safe_q.pop('explanation', None)
        safe_questions.append(safe_q)
        
    return jsonify({"quiz": quiz, "questions": safe_questions}), 200

@quiz_bp.route('/<quiz_id>/start', methods=['POST'])
@token_required
def start_quiz(quiz_id):
    user_id = request.user.get('sub')
    
    quiz = QuizService.get_quiz(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
        
    # Check time constraints
    now = datetime.utcnow()
    try:
        start = datetime.fromisoformat(quiz['start_time'].replace('Z', ''))
        end = datetime.fromisoformat(quiz['end_time'].replace('Z', ''))
        if now < start:
            return jsonify({"error": "Quiz has not started yet."}), 403
        if now > end:
            return jsonify({"error": "Quiz has ended."}), 403
    except Exception:
        pass
        
    result = ResultService.start_attempt(user_id, quiz_id)
    if "error" in result:
        return jsonify(result), 400
    return jsonify(result), 201

@quiz_bp.route('/<quiz_id>/submit', methods=['POST'])
@token_required
def submit_quiz(quiz_id):
    user_id = request.user.get('sub')
    data = request.json
    attempt_id = data.get('attempt_id')
    answers = data.get('answers', {})
    
    # Strict validation of time is also recommended here (optional but good)
    
    result = ResultService.submit_attempt(user_id, quiz_id, attempt_id, answers)
    if "error" in result:
        return jsonify(result), 400
    return jsonify(result), 200
