from services.json_storage import JsonStorage
from utils.id_generator import generate_id
from datetime import datetime

class QuizService:
    @staticmethod
    def create_quiz(data):
        quizzes = JsonStorage.read('quizzes.json')
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
        quizzes.append(quiz)
        JsonStorage.write('quizzes.json', quizzes)
        return quiz

    @staticmethod
    def get_all_quizzes():
        return JsonStorage.read('quizzes.json')

    @staticmethod
    def get_quiz(quiz_id):
        quizzes = JsonStorage.read('quizzes.json')
        return next((q for q in quizzes if q['quiz_id'] == quiz_id), None)

    @staticmethod
    def update_quiz(quiz_id, data):
        quizzes = JsonStorage.read('quizzes.json')
        for i, q in enumerate(quizzes):
            if q['quiz_id'] == quiz_id:
                quizzes[i].update({
                    "title": data.get("title", q["title"]),
                    "description": data.get("description", q["description"]),
                    "category": data.get("category", q["category"]),
                    "start_time": data.get("start_time", q["start_time"]),
                    "end_time": data.get("end_time", q["end_time"]),
                    "duration": int(data.get("duration", q["duration"])),
                    "status": data.get("status", q["status"]),
                    "allow_retake": data.get("allow_retake", q["allow_retake"])
                })
                JsonStorage.write('quizzes.json', quizzes)
                return quizzes[i]
        return None

    @staticmethod
    def delete_quiz(quiz_id):
        quizzes = JsonStorage.read('quizzes.json')
        filtered = [q for q in quizzes if q['quiz_id'] != quiz_id]
        if len(filtered) != len(quizzes):
            JsonStorage.write('quizzes.json', filtered)
            return True
        return False

    @staticmethod
    def add_question(data):
        questions = JsonStorage.read('questions.json')
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
        questions.append(question)
        JsonStorage.write('questions.json', questions)
        return question

    @staticmethod
    def get_questions_for_quiz(quiz_id):
        questions = JsonStorage.read('questions.json')
        return [q for q in questions if q['quiz_id'] == quiz_id]

    @staticmethod
    def get_available_quizzes():
        quizzes = JsonStorage.read('quizzes.json')
        available = []
        for q in quizzes:
            if q['status'] == 'active':
                available.append(q)
        return available
