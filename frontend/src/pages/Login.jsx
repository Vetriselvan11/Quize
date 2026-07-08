import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';
import '../styles/auth.css';

const Login = () => {
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
            const data = await authService.login(formData);
            login(data.token, data.user);
            navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Sign in to continue to your dashboard.</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required placeholder="••••••••" />
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="auth-link">
                    Don't have an account? <Link to="/register">Create one now</Link>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <Link to="/admin-login" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Admin Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
