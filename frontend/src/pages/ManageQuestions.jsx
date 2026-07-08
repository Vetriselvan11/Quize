import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';

const ManageQuestions = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        quiz_id: quizId,
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: 0,
        explanation: ''
    });

    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        // Fetch questions for this quiz (we can reuse an endpoint, but since it's admin, we need one if it doesn't exist, or just use the quiz details)
        // Wait, the quiz details endpoint returns questions without correct answers. Let's create a quick way to show them or just fetch from getQuizDetails for now.
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`https://quiz-backend-2ejj.onrender.com/api/quizzes/${quizId}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('quiz_token')}` }
                });
                const data = await response.json();
                if(data.questions) setQuestions(data.questions);
            } catch(e) {
                console.error(e);
            }
        };
        fetchQuestions();
    }, [quizId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminService.addQuestion(formData);
            alert("Question added successfully!");
            setQuestions([...questions, formData]);
            setFormData({ ...formData, question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', explanation: ''});
        } catch (err) {
            alert("Failed to add question.");
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
                <h2>Manage Questions</h2>
                <button onClick={() => navigate('/admin/quizzes')} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}>Back to Quizzes</button>
            </div>
            
            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Add New Question</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Question Text</label>
                        <input type="text" value={formData.question_text} onChange={e => setFormData({...formData, question_text: e.target.value})} required placeholder="e.g. What is the output of..." />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Option A</label>
                            <input type="text" value={formData.option_a} onChange={e => setFormData({...formData, option_a: e.target.value})} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Option B</label>
                            <input type="text" value={formData.option_b} onChange={e => setFormData({...formData, option_b: e.target.value})} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Option C</label>
                            <input type="text" value={formData.option_c} onChange={e => setFormData({...formData, option_c: e.target.value})} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Option D</label>
                            <input type="text" value={formData.option_d} onChange={e => setFormData({...formData, option_d: e.target.value})} required />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.25rem', marginTop: '1.25rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Correct Option (0=A, 1=B, 2=C, 3=D)</label>
                            <input type="number" min="0" max="3" value={formData.correct_option} onChange={e => setFormData({...formData, correct_option: parseInt(e.target.value)})} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Explanation (Optional)</label>
                            <input type="text" value={formData.explanation} onChange={e => setFormData({...formData, explanation: e.target.value})} placeholder="Why is this correct?" />
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary">Add Question</button>
                    </div>
                </form>
            </div>

            <div className="dashboard-section" style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Existing Questions ({questions.length})</h3>
                {questions.length === 0 ? (
                    <div className="empty-state card">
                        <p style={{ color: 'var(--text-secondary)' }}>No questions added to this quiz yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {questions.map((q, idx) => (
                            <div key={idx} className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                                <strong style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.125rem' }}>
                                    <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>{idx + 1}.</span> {q.question_text}
                                </strong>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                                    <div style={{ padding: '0.5rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}><strong>A:</strong> {q.option_a}</div>
                                    <div style={{ padding: '0.5rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}><strong>B:</strong> {q.option_b}</div>
                                    <div style={{ padding: '0.5rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}><strong>C:</strong> {q.option_c}</div>
                                    <div style={{ padding: '0.5rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}><strong>D:</strong> {q.option_d}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageQuestions;
