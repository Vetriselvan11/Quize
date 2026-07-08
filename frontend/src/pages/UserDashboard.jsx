import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { quizService } from '../services/quizService';
import { AuthContext } from '../context/AuthContext';
import '../styles/dashboard.css';
import '../styles/quiz.css';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            quizService.getAvailableQuizzes(),
            quizService.getUserResults()
        ]).then(([quizzesData, resultsData]) => {
            setQuizzes(quizzesData);
            setResults(resultsData);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="empty-state">Loading your dashboard...</div>;
    }

    const completedCount = results.length;
    const availableCount = quizzes.filter(q => new Date() >= new Date(q.start_time) && new Date() <= new Date(q.end_time)).length;
    const upcomingCount = quizzes.filter(q => new Date() < new Date(q.start_time)).length;

    return (
        <div>
            <div className="dashboard-header">
                <h2>My Dashboard</h2>
            </div>
            
            <div className="stats-grid">
                <div className="card stat-card">
                    <h3>Student Profile</h3>
                    <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ fontWeight: '600', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{user?.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user?.email}</div>
                    </div>
                </div>
                <div className="card stat-card">
                    <h3>Completed Quizzes</h3>
                    <div className="stat-value">{completedCount}</div>
                </div>
                <div className="card stat-card">
                    <h3>Available Now</h3>
                    <div className="stat-value" style={{ color: 'var(--success-color)' }}>{availableCount}</div>
                </div>
                <div className="card stat-card">
                    <h3>Upcoming Quizzes</h3>
                    <div className="stat-value" style={{ color: 'var(--warning-color)' }}>{upcomingCount}</div>
                </div>
            </div>

            <div className="dashboard-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ margin: 0 }}>Available Quizzes</h3>
                    <Link to="/quizzes" className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}>View All</Link>
                </div>
                
                <div className="quiz-grid">
                    {quizzes.length === 0 ? (
                        <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                            <h3 style={{ color: 'var(--text-primary)' }}>No Quizzes Available</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Check back later for new quizzes.</p>
                        </div>
                    ) : quizzes.slice(0, 3).map(q => {
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
                                <Link to={`/quizzes`} className={`btn ${isLive ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', marginTop: 'auto' }}>
                                    {isLive ? 'Start Quiz' : 'View Details'}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="dashboard-section">
                <h3>Recent Results</h3>
                <div className="data-table-container">
                    {results.length === 0 ? (
                        <div className="empty-state">
                            <h3>No Results Yet</h3>
                            <p>You haven't taken any quizzes. Complete a quiz to see your results here.</p>
                        </div>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Quiz ID</th>
                                    <th>Score</th>
                                    <th>Percentage</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.slice(0, 5).map(r => (
                                    <tr key={r.result_id}>
                                        <td style={{ fontWeight: '500' }}>{r.quiz_id}</td>
                                        <td>{r.score} / {r.total_questions}</td>
                                        <td>
                                            <span className={`badge ${r.percentage >= 50 ? 'badge-success' : 'badge-danger'}`}>
                                                {r.percentage.toFixed(1)}%
                                            </span>
                                        </td>
                                        <td>{new Date(r.submitted_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
