import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [results, setResults] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            adminService.getUsers(),
            adminService.getResults(),
            adminService.getQuizzes()
        ]).then(([usersData, resultsData, quizzesData]) => {
            setUsers(usersData);
            setResults(resultsData);
            setQuizzes(quizzesData);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const getQuizName = (quizId) => {
        const q = quizzes.find(quiz => quiz.quiz_id === quizId);
        return q ? q.title : 'Deleted Quiz';
    };

    if (loading) return <div className="empty-state">Loading user data...</div>;

    return (
        <div>
            <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
                <h2>PLAYER INTEL & ANALYTICS</h2>
                <Link to="/admin" className="btn btn-secondary">BACK TO HQ</Link>
            </div>
            
            <div className="dashboard-section">
                <div className="data-table-container">
                    {results.length === 0 ? (
                        <div className="empty-state">
                            <h3>No Results Found</h3>
                            <p>Users have not completed any quizzes yet.</p>
                        </div>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Quiz Title</th>
                                    <th>Score</th>
                                    <th>Percentage</th>
                                    <th>Date Taken</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, idx) => {
                                    const user = users.find(u => u.id === result.user_id) || {};
                                    const percentage = Math.round((result.score / result.total_questions) * 100) || 0;
                                    return (
                                        <tr key={idx}>
                                            <td style={{ fontWeight: '500' }}>{user.name || 'Unknown User'}</td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{user.email || 'N/A'}</td>
                                            <td>{getQuizName(result.quiz_id)}</td>
                                            <td>{result.score} / {result.total_questions}</td>
                                            <td>
                                                <span className={`badge ${percentage >= 50 ? 'badge-success' : 'badge-danger'}`}>
                                                    {percentage}%
                                                </span>
                                            </td>
                                            <td style={{ color: 'var(--text-secondary)' }}>
                                                {new Date(result.created_at).toLocaleString()}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
