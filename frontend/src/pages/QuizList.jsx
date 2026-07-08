import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizService } from '../services/quizService';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        quizService.getAvailableQuizzes().then(setQuizzes).catch(console.error);
    }, []);

    const startQuiz = async (quizId) => {
        try {
            const attempt = await quizService.startQuiz(quizId);
            navigate(`/quiz/${quizId}/attempt`, { state: { attempt } });
        } catch (err) {
            alert(err.response?.data?.error || "Error starting quiz");
        }
    };

    return (
        <div>
            <div className="dashboard-header">
                <h2>Available Quizzes</h2>
            </div>
            
            <div className="quiz-grid" style={{ marginTop: '1.5rem' }}>
                {quizzes.length === 0 ? (
                    <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                        <h3 style={{ color: 'var(--text-primary)' }}>No Quizzes Found</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>There are no active quizzes available at the moment.</p>
                    </div>
                ) : quizzes.map(q => {
                    const now = new Date();
                    const start = new Date(q.start_time);
                    const end = new Date(q.end_time);
                    let badgeClass = "badge-success";
                    let statusText = "Live";
                    let isLive = true;

                    if (now < start) {
                        statusText = `Starts ${start.toLocaleDateString()}`;
                        badgeClass = "badge-warning";
                        isLive = false;
                    } else if (now > end) {
                        statusText = "Ended";
                        badgeClass = "badge-danger";
                        isLive = false;
                    }

                    return (
                        <div key={q.quiz_id} className="card quiz-card">
                            <h3>{q.title}</h3>
                            <p>{q.description}</p>
                            <div className="quiz-meta">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className={`badge ${badgeClass}`}>{statusText}</span>
                                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{q.duration} min</span>
                                </div>
                                <span>Category: {q.category}</span>
                            </div>
                            <button onClick={() => startQuiz(q.quiz_id)} className={`btn ${isLive ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', marginTop: 'auto' }}>
                                {isLive ? 'Start Assessment' : 'View Status'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizList;
