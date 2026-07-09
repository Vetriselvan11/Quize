import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import '../styles/auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authService.register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>NEW PLAYER REGISTRATION</h2>
                <p className="subtitle">Create an account to join the competitive quiz arena.</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required placeholder="••••••••" minLength="6" />
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to="/login">Sign in here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
