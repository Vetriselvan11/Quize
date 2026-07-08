from flask import Blueprint, request, jsonify
from services.auth_service import AuthService
from utils.decorators import token_required

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    result = AuthService.register_user(data.get('name'), data.get('email'), data.get('password'))
    if "error" in result:
        return jsonify(result), 400
    return jsonify(result), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    result = AuthService.login(data.get('email'), data.get('password'), is_admin=False)
    if "error" in result:
        return jsonify(result), 401
    return jsonify(result), 200

@auth_bp.route('/admin-login', methods=['POST'])
def admin_login():
    data = request.json
    result = AuthService.login(data.get('email'), data.get('password'), is_admin=True)
    if "error" in result:
        return jsonify(result), 401
    return jsonify(result), 200

@auth_bp.route('/me', methods=['GET'])
@token_required
def me():
    return jsonify({"user": request.user}), 200
