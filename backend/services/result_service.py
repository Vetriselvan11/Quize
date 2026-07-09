from services.db import DB
from utils.id_generator import generate_id
from datetime import datetime

class ResultService:
    @staticmethod
    def start_attempt(user_id, quiz_id):
        quiz = DB.quizzes.find_one({'quiz_id': quiz_id})
        if not quiz:
            return {"error": "Quiz not found"}
        
        if not quiz.get('allow_retake'):
            existing = DB.attempts.find_one({'user_id': user_id, 'quiz_id': quiz_id})
            if existing:
                return {"error": "You have already attempted this quiz."}
        
        attempt = {
            "attempt_id": generate_id("att_"),
            "user_id": user_id,
            "quiz_id": quiz_id,
            "status": "in_progress",
            "started_at": datetime.utcnow().isoformat() + "Z",
            "score": 0,
            "total_questions": 0,
            "correct_count": 0,
            "wrong_count": 0
        }
        DB.attempts.insert_one(attempt)
        attempt.pop('_id', None)
        return attempt

    @staticmethod
    def submit_attempt(user_id, quiz_id, attempt_id, selected_answers):
        attempt = DB.attempts.find_one({'attempt_id': attempt_id, 'user_id': user_id})
        if not attempt:
            return {"error": "Attempt not found"}
            
        quiz_questions = list(DB.questions.find({'quiz_id': quiz_id}))
        
        correct_count = 0
        wrong_count = 0
        answers_record = []
        
        for q in quiz_questions:
            q_id = q['question_id']
            selected = selected_answers.get(q_id)
            is_correct = (selected == q['correct_option'])
            if is_correct:
                correct_count += 1
            else:
                wrong_count += 1
            
            answers_record.append({
                "question_id": q_id,
                "selected_option": selected,
                "is_correct": is_correct
            })
            
        total_questions = len(quiz_questions)
        score = correct_count
        percentage = (score / total_questions * 100) if total_questions > 0 else 0
        
        now = datetime.utcnow().isoformat() + "Z"
        
        DB.attempts.update_one(
            {'_id': attempt['_id']},
            {'$set': {
                "status": "completed",
                "score": score,
                "total_questions": total_questions,
                "correct_count": correct_count,
                "wrong_count": wrong_count,
                "submitted_at": now
            }}
        )
        
        result = {
            "result_id": generate_id("res_"),
            "attempt_id": attempt_id,
            "user_id": user_id,
            "quiz_id": quiz_id,
            "answers": answers_record,
            "score": score,
            "percentage": percentage,
            "submitted_at": now
        }
        DB.results.insert_one(result)
        result.pop('_id', None)
        
        return result

    @staticmethod
    def get_user_results(user_id):
        return list(DB.results.find({'user_id': user_id}, {'_id': 0}))

    @staticmethod
    def get_all_results():
        return list(DB.results.find({}, {'_id': 0}))

    @staticmethod
    def get_all_attempts():
        return list(DB.attempts.find({}, {'_id': 0}))
