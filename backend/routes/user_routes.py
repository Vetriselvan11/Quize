from flask import Blueprint, request, jsonify
from services.result_service import ResultService
from services.db import DB
from utils.decorators import token_required

user_bp = Blueprint('user', __name__)

@user_bp.route('/results', methods=['GET'])
@token_required
def get_user_results():
    user_id = request.user.get('sub')
    results = ResultService.get_user_results(user_id)
    return jsonify(results), 200

@user_bp.route('/profile', methods=['GET'])
@token_required
def get_profile():
    user_id = request.user.get('sub')
    user = DB.users.find_one({'id': user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"id": user['id'], "name": user['name'], "email": user['email']}), 200
