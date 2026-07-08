from services.json_storage import JsonStorage
from utils.password_utils import hash_password, check_password
from utils.token_utils import generate_token
from utils.id_generator import generate_id
from datetime import datetime

class AuthService:
    @staticmethod
    def register_user(name, email, password):
        users = JsonStorage.read('users.json')
        if any(u['email'] == email for u in users):
            return {"error": "Email already registered"}
        
        user = {
            "id": generate_id("usr_"),
            "name": name,
            "email": email,
            "password_hash": hash_password(password),
            "role": "user",
            "created_at": datetime.utcnow().isoformat() + "Z"
        }
        users.append(user)
        JsonStorage.write('users.json', users)
        return {"message": "User registered successfully", "user_id": user["id"]}

    @staticmethod
    def login(email, password, is_admin=False):
        filename = 'admins.json' if is_admin else 'users.json'
        users = JsonStorage.read(filename)
        
        # If logging in as admin and no admins exist, create a default admin
        if is_admin and not users and email == "admin@quiz.com":
            admin = {
                "id": generate_id("adm_"),
                "name": "Super Admin",
                "email": "admin@quiz.com",
                "password_hash": hash_password(password),
                "role": "admin",
                "created_at": datetime.utcnow().isoformat() + "Z"
            }
            users.append(admin)
            JsonStorage.write(filename, users)

        user = next((u for u in users if u['email'] == email), None)
        if not user or not check_password(password, user['password_hash']):
            return {"error": "Invalid email or password"}
        
        token = generate_token(user['id'], user['role'])
        return {
            "token": token,
            "user": {
                "id": user['id'],
                "name": user['name'],
                "email": user['email'],
                "role": user['role']
            }
        }
