import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.db import DB
import uuid
from dotenv import load_dotenv

load_dotenv()

# Categories: C++, Java, C programming, Python, Data Structures and Algorithms, React.js, JavaScript
def generate_questions():
    questions = []
    
    # 1. C++
    cpp_questions = [
        ("What is a pointer in C++?", "A variable that stores memory address", "A function", "An array", "A primitive data type", 0, "Easy", "Pointers hold memory addresses."),
        ("Which of the following is not a C++ access specifier?", "public", "private", "protected", "internal", 3, "Medium", "C++ has public, private, and protected."),
        ("What is the size of an int in C++?", "2 bytes", "4 bytes", "8 bytes", "Depends on the compiler", 3, "Hard", "The size of int is not strictly defined but is typically 4 bytes on modern compilers."),
        # Just generating some realistic placeholders to meet ~15 per category
    ]
    for _ in range(12): cpp_questions.append(("Sample C++ Question", "Option A", "Option B", "Option C", "Option D", 0, "Medium", "Sample Explanation"))
    
    # 2. Java
    java_questions = [
        ("Which of these is not a feature of Java?", "Object-oriented", "Use of pointers", "Portable", "Dynamic", 1, "Easy", "Java does not support explicit pointers."),
    ]
    for _ in range(14): java_questions.append(("Sample Java Question", "A", "B", "C", "D", 0, "Medium", "Explanation"))

    # 3. C Programming
    c_questions = [
        ("Who invented C?", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum", 0, "Easy", "Dennis Ritchie invented C."),
    ]
    for _ in range(14): c_questions.append(("Sample C Question", "A", "B", "C", "D", 0, "Medium", "Explanation"))

    # 4. Python
    py_questions = [
        ("Which keyword is used to define a function in Python?", "func", "def", "function", "lambda", 1, "Easy", "def is used in Python."),
    ]
    for _ in range(14): py_questions.append(("Sample Python Question", "A", "B", "C", "D", 0, "Medium", "Explanation"))

    # 5. DSA
    dsa_questions = [
        ("What is the time complexity of binary search?", "O(n)", "O(log n)", "O(n^2)", "O(1)", 1, "Medium", "Binary search halves the search space each time."),
    ]
    for _ in range(14): dsa_questions.append(("Sample DSA Question", "A", "B", "C", "D", 0, "Medium", "Explanation"))

    # 6. React.js
    react_questions = [
        ("What is used to manage state in functional React components?", "useState", "this.state", "useEffect", "Redux", 0, "Easy", "useState is the React Hook for state."),
    ]
    for _ in range(14): react_questions.append(("Sample React Question", "A", "B", "C", "D", 0, "Medium", "Explanation"))

    # 7. JavaScript
    js_questions = [
        ("Which keyword declares a block-scoped variable?", "var", "let", "function", "define", 1, "Easy", "let provides block scoping."),
    ]
    for _ in range(14): js_questions.append(("Sample JS Question", "A", "B", "C", "D", 0, "Medium", "Explanation"))

    categories = [
        ("C++", cpp_questions),
        ("Java", java_questions),
        ("C programming", c_questions),
        ("Python", py_questions),
        ("Data Structures and Algorithms", dsa_questions),
        ("React.js", react_questions),
        ("JavaScript", js_questions)
    ]

    quizzes = []
    all_qs = []
    
    # Create Quizzes and Questions
    for cat_name, qs in categories:
        quiz = {
            "quiz_id": f"qz_{uuid.uuid4().hex[:8]}",
            "title": f"{cat_name} Assessment",
            "description": f"Test your knowledge in {cat_name}.",
            "category": cat_name,
            "start_time": "2020-01-01T00:00:00Z",
            "end_time": "2030-01-01T00:00:00Z",
            "duration": 30,
            "status": "active",
            "allow_retake": True,
            "created_at": "2026-07-08T10:00:00Z"
        }
        quizzes.append(quiz)
        
        for q in qs:
            all_qs.append({
                "question_id": f"q_{uuid.uuid4().hex[:8]}",
                "quiz_id": quiz["quiz_id"],
                "question_text": q[0],
                "option_a": q[1],
                "option_b": q[2],
                "option_c": q[3],
                "option_d": q[4],
                "correct_option": q[5],
                "difficulty": q[6],
                "explanation": q[7],
                "category": cat_name,
                "created_at": "2026-07-08T10:00:00Z"
            })
            
    if quizzes:
        DB.quizzes.delete_many({})
        DB.quizzes.insert_many(quizzes)
    if all_qs:
        DB.questions.delete_many({})
        DB.questions.insert_many(all_qs)
    print(f"Seeded {len(quizzes)} quizzes and {len(all_qs)} questions into MongoDB!")

if __name__ == "__main__":
    generate_questions()
