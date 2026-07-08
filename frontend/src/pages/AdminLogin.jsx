import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';
import '../styles/auth.css';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await authService.adminLogin(formData);
            login(data.token, data.user);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Admin login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ borderTop: '4px solid var(--primary-color)' }}>
                <h2>Admin Portal</h2>
                <p className="subtitle">Sign in to manage quizzes and users.</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Admin Email</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="admin@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required placeholder="••••••••" />
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In as Admin'}
                    </button>
                </form>
                <div style={{ marginTop: '2rem' }}>
                    <Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Back to User Login</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
