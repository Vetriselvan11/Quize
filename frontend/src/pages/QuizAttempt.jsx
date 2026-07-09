import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { quizService } from '../services/quizService';
import '../styles/quiz.css';

const QuizAttempt = () => {
    const { quizId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const attempt = location.state?.attempt;
    
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    
    useEffect(() => {
        if (!attempt) {
            navigate('/quizzes');
            return;
        }
        quizService.getQuizDetails(quizId).then(data => {
            setQuiz(data.quiz);
            setQuestions(data.questions);
        }).catch(console.error);
    }, [quizId, attempt, navigate]);

    const handleSelectOption = (questionId, optionIndex) => {
        setAnswers({ ...answers, [questionId]: optionIndex });
    };

    const handleSubmit = async () => {
        const answeredCount = Object.keys(answers).length;
        if (answeredCount < questions.length) {
            if (!window.confirm(`You have only answered ${answeredCount} out of ${questions.length} questions. Are you sure you want to submit?`)) return;
        } else {
            if (!window.confirm("Are you sure you want to submit your assessment?")) return;
        }

        try {
            const result = await quizService.submitQuiz(quizId, { attempt_id: attempt.attempt_id, answers });
            navigate('/result', { state: { result } });
        } catch (err) {
            alert(err.response?.data?.error || "Failed to submit");
        }
    };

    if (!quiz) return <div className="empty-state">Loading your assessment...</div>;

    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / questions.length) * 100;

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{quiz.title}</h2>
                    <span className="badge badge-warning" style={{ fontSize: '1rem', padding: '0.5rem 1rem', boxShadow: '0 0 10px rgba(234, 179, 8, 0.4)' }}>TIMER: {quiz.duration}:00</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    PROGRESS: {answeredCount} / {questions.length} MATCHES
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--border-color)', borderRadius: '9999px', marginTop: '0.5rem', overflow: 'hidden', border: '1px solid var(--border-highlight)' }}>
                    <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'var(--primary-color)', transition: 'width 0.3s ease', boxShadow: '0 0 10px var(--primary-color)' }}></div>
                </div>
            </div>
            
            {questions.map((q, idx) => (
                <div key={q.question_id} className="card question-card">
                    <div className="question-text">
                        <span style={{ color: 'var(--primary-color)', marginRight: '0.75rem', fontSize: '1.5rem' }}>{idx + 1}.</span> {q.question_text}
                    </div>
                    <ul className="options-list">
                        {['option_a', 'option_b', 'option_c', 'option_d'].map((opt, i) => (
                            <li 
                                key={i} 
                                className={`option-item ${answers[q.question_id] === i ? 'selected' : ''}`}
                                onClick={() => handleSelectOption(q.question_id, i)}
                            >
                                <span style={{ 
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
                                    width: '32px', height: '32px', borderRadius: '4px', 
                                    border: `2px solid ${answers[q.question_id] === i ? 'var(--primary-color)' : 'var(--text-muted)'}`,
                                    marginRight: '1.25rem',
                                    backgroundColor: answers[q.question_id] === i ? 'var(--primary-color)' : 'transparent',
                                    color: answers[q.question_id] === i ? 'white' : 'var(--text-secondary)',
                                    fontSize: '0.875rem', fontWeight: '800', transition: 'all 0.2s'
                                }}>
                                    {String.fromCharCode(65 + i)}
                                </span>
                                {q[opt]}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', paddingBottom: '4rem' }}>
                <button onClick={handleSubmit} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem', boxShadow: 'var(--shadow-md)' }}>
                    END MATCH
                </button>
            </div>
        </div>
    );
};

export default QuizAttempt;
