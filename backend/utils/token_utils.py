import jwt
import datetime

SECRET_KEY = "super_secret_quiz_key_change_me_in_production"

def generate_token(user_id: str, role: str) -> str:
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id,
        'role': role
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return "Expired"
    except jwt.InvalidTokenError:
        return "Invalid"
