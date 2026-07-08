from functools import wraps
from flask import request, jsonify
from utils.token_utils import decode_token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        payload = decode_token(token)
        if payload == "Expired":
            return jsonify({'message': 'Token has expired!'}), 401
        elif payload == "Invalid":
            return jsonify({'message': 'Invalid token!'}), 401
        
        request.user = payload
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not hasattr(request, 'user') or request.user.get('role') != 'admin':
            return jsonify({'message': 'Admin access required!'}), 403
        return f(*args, **kwargs)
    return token_required(decorated)
