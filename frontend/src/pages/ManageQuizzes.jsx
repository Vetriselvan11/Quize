import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { Link } from 'react-router-dom';

const ManageQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [editingQuizId, setEditingQuizId] = useState(null);
    const [newQuiz, setNewQuiz] = useState({
        title: '', category: '', description: '', start_time: '', end_time: '', duration: 30, status: 'active'
    });
    
    useEffect(() => {
        adminService.getQuizzes().then(setQuizzes).catch(console.error);
    }, []);

    const formatForInput = (isoString) => {
        if (!isoString) return '';
        const d = new Date(isoString);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    };

    const handleEditClick = (q) => {
        setEditingQuizId(q.quiz_id);
        setNewQuiz({
            ...q,
            start_time: formatForInput(q.start_time),
            end_time: formatForInput(q.end_time)
        });
        window.scrollTo(0, 0);
    };

    const handleCancelEdit = () => {
        setEditingQuizId(null);
        setNewQuiz({ title: '', category: '', description: '', start_time: '', end_time: '', duration: 30, status: 'active' });
    };

    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        try {
            if (!newQuiz.start_time || !newQuiz.end_time) {
                alert("Please select both start and end times.");
                return;
            }
            
            const payload = {
                ...newQuiz,
                start_time: new Date(newQuiz.start_time).toISOString(),
                end_time: new Date(newQuiz.end_time).toISOString()
            };

            if (editingQuizId) {
                const updated = await adminService.updateQuiz(editingQuizId, payload);
                setQuizzes(quizzes.map(q => q.quiz_id === editingQuizId ? updated : q));
                alert('Quiz updated successfully!');
            } else {
                const created = await adminService.createQuiz(payload);
                setQuizzes([...quizzes, created]);
                alert('Quiz created successfully!');
            }
            handleCancelEdit();
        } catch (err) {
            console.error(err);
            alert('Error saving quiz. Check your date inputs.');
        }
    };

    return (
        <div>
            <div className="dashboard-header">
                <h2>ARENA MANAGER</h2>
            </div>
            
            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{editingQuizId ? 'EDIT MATCH SETTINGS' : 'CREATE NEW ARENA'}</h3>
                <form onSubmit={handleCreateQuiz}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Title</label>
                            <input type="text" value={newQuiz.title} onChange={e => setNewQuiz({...newQuiz, title: e.target.value})} required placeholder="e.g. React Basics" />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Class/Category</label>
                            <input type="text" value={newQuiz.category} onChange={e => setNewQuiz({...newQuiz, category: e.target.value})} required placeholder="e.g. Frontend" />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                        <label>Description</label>
                        <input type="text" value={newQuiz.description} onChange={e => setNewQuiz({...newQuiz, description: e.target.value})} required placeholder="Short description of the arena..." />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Start Time</label>
                            <input type="datetime-local" value={newQuiz.start_time} onChange={e => setNewQuiz({...newQuiz, start_time: e.target.value})} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>End Time</label>
                            <input type="datetime-local" value={newQuiz.end_time} onChange={e => setNewQuiz({...newQuiz, end_time: e.target.value})} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Time Limit (mins)</label>
                            <input type="number" value={newQuiz.duration} onChange={e => setNewQuiz({...newQuiz, duration: parseInt(e.target.value)})} required min="1" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary">{editingQuizId ? 'SAVE SETTINGS' : 'CREATE ARENA'}</button>
                        {editingQuizId && <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">CANCEL</button>}
                    </div>
                </form>
            </div>

            <div className="dashboard-section" style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTIVE ARENAS</h3>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map(q => (
                                <tr key={q.quiz_id}>
                                    <td style={{ fontWeight: '500' }}>{q.title}</td>
                                    <td>{q.category}</td>
                                    <td>
                                        <span className={`badge ${q.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                                            {q.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleEditClick(q)} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}>
                                                Edit
                                            </button>
                                            <Link to={`/admin/questions/${q.quiz_id}`} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}>
                                                Questions
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageQuizzes;
