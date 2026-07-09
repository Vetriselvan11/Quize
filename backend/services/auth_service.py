from services.db import DB
from utils.password_utils import hash_password, check_password
from utils.token_utils import generate_token
from utils.id_generator import generate_id
from datetime import datetime

class AuthService:
    @staticmethod
    def register_user(name, email, password):
        if DB.users.find_one({'email': email}):
            return {"error": "Email already registered"}
        
        user = {
            "id": generate_id("usr_"),
            "name": name,
            "email": email,
            "password_hash": hash_password(password),
            "role": "user",
            "created_at": datetime.utcnow().isoformat() + "Z"
        }
        DB.users.insert_one(user)
        return {"message": "User registered successfully", "user_id": user["id"]}

    @staticmethod
    def login(email, password, is_admin=False):
        collection = DB.admins if is_admin else DB.users
        
        # If logging in as admin and no admins exist, create a default admin
        if is_admin and DB.admins.count_documents({}) == 0 and email == "admin@quiz.com":
            admin = {
                "id": generate_id("adm_"),
                "name": "Super Admin",
                "email": "admin@quiz.com",
                "password_hash": hash_password(password),
                "role": "admin",
                "created_at": datetime.utcnow().isoformat() + "Z"
            }
            DB.admins.insert_one(admin)

        user = collection.find_one({'email': email})
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
