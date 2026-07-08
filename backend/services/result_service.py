from services.json_storage import JsonStorage
from utils.id_generator import generate_id
from datetime import datetime

class ResultService:
    @staticmethod
    def start_attempt(user_id, quiz_id):
        attempts = JsonStorage.read('attempts.json')
        quizzes = JsonStorage.read('quizzes.json')
        
        quiz = next((q for q in quizzes if q['quiz_id'] == quiz_id), None)
        if not quiz:
            return {"error": "Quiz not found"}
        
        if not quiz.get('allow_retake'):
            existing = next((a for a in attempts if a['user_id'] == user_id and a['quiz_id'] == quiz_id), None)
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
        attempts.append(attempt)
        JsonStorage.write('attempts.json', attempts)
        return attempt

    @staticmethod
    def submit_attempt(user_id, quiz_id, attempt_id, selected_answers):
        attempts = JsonStorage.read('attempts.json')
        attempt_idx = next((i for i, a in enumerate(attempts) if a['attempt_id'] == attempt_id and a['user_id'] == user_id), None)
        if attempt_idx is None:
            return {"error": "Attempt not found"}
            
        questions = JsonStorage.read('questions.json')
        quiz_questions = [q for q in questions if q['quiz_id'] == quiz_id]
        
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
        attempts[attempt_idx].update({
            "status": "completed",
            "score": score,
            "total_questions": total_questions,
            "correct_count": correct_count,
            "wrong_count": wrong_count,
            "submitted_at": now
        })
        JsonStorage.write('attempts.json', attempts)
        
        results = JsonStorage.read('results.json')
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
        results.append(result)
        JsonStorage.write('results.json', results)
        
        return result

    @staticmethod
    def get_user_results(user_id):
        results = JsonStorage.read('results.json')
        return [r for r in results if r['user_id'] == user_id]

    @staticmethod
    def get_all_results():
        return JsonStorage.read('results.json')

    @staticmethod
    def get_all_attempts():
        return JsonStorage.read('attempts.json')
