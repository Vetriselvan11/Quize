from services.db import DB
from utils.id_generator import generate_id
from datetime import datetime

class QuizService:
    @staticmethod
    def create_quiz(data):
        quiz = {
            "quiz_id": generate_id("qz_"),
            "title": data.get("title"),
            "description": data.get("description"),
            "category": data.get("category"),
            "start_time": data.get("start_time"),
            "end_time": data.get("end_time"),
            "duration": int(data.get("duration", 30)),
            "status": data.get("status", "active"),
            "allow_retake": data.get("allow_retake", False),
            "created_at": datetime.utcnow().isoformat() + "Z"
        }
        DB.quizzes.insert_one(quiz)
        quiz.pop('_id', None)
        return quiz

    @staticmethod
    def get_all_quizzes():
        quizzes = list(DB.quizzes.find({}, {'_id': 0}))
        return quizzes

    @staticmethod
    def get_quiz(quiz_id):
        return DB.quizzes.find_one({'quiz_id': quiz_id}, {'_id': 0})

    @staticmethod
    def update_quiz(quiz_id, data):
        update_data = {
            "title": data.get("title"),
            "description": data.get("description"),
            "category": data.get("category"),
            "start_time": data.get("start_time"),
            "end_time": data.get("end_time"),
            "duration": int(data.get("duration", 30)) if data.get("duration") else None,
            "status": data.get("status"),
            "allow_retake": data.get("allow_retake")
        }
        update_data = {k: v for k, v in update_data.items() if v is not None}
        
        result = DB.quizzes.find_one_and_update(
            {'quiz_id': quiz_id},
            {'$set': update_data},
            return_document=True
        )
        if result:
            result.pop('_id', None)
        return result

    @staticmethod
    def delete_quiz(quiz_id):
        result = DB.quizzes.delete_one({'quiz_id': quiz_id})
        return result.deleted_count > 0

    @staticmethod
    def add_question(data):
        question = {
            "question_id": generate_id("q_"),
            "quiz_id": data.get("quiz_id"),
            "question_text": data.get("question_text"),
            "option_a": data.get("option_a"),
            "option_b": data.get("option_b"),
            "option_c": data.get("option_c"),
            "option_d": data.get("option_d"),
            "correct_option": data.get("correct_option"),
            "difficulty": data.get("difficulty", "Medium"),
            "explanation": data.get("explanation"),
            "category": data.get("category"),
            "created_at": datetime.utcnow().isoformat() + "Z"
        }
        DB.questions.insert_one(question)
        question.pop('_id', None)
        return question

    @staticmethod
    def get_questions_for_quiz(quiz_id):
        return list(DB.questions.find({'quiz_id': quiz_id}, {'_id': 0}))

    @staticmethod
    def get_available_quizzes():
        return list(DB.quizzes.find({'status': 'active'}, {'_id': 0}))
