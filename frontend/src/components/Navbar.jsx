import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active-link' : '';

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span style={{ color: 'var(--text-primary)' }}>DEV_</span>QUIZ
            </Link>
            
            <div className="navbar-links">
                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-secondary">Log in</Link>
                        <Link to="/register" className="btn btn-primary">Sign up</Link>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', gap: '1.5rem', marginRight: '1rem', borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
                            {user.role === 'admin' ? (
                                <>
                                    <Link to="/admin" className={isActive('/admin')}>Overview</Link>
                                    <Link to="/admin/quizzes" className={isActive('/admin/quizzes')}>Quizzes</Link>
                                    <Link to="/admin/users" className={isActive('/admin/users')}>Users</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                                    <Link to="/quizzes" className={isActive('/quizzes')}>Quizzes</Link>
                                </>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user.name}</span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--primary-color)', textTransform: 'uppercase', fontWeight: '600' }}>{user.role === 'admin' ? 'SYS_ADMIN' : 'PLAYER_01'}</span>
                            </div>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}>
                                Sign out
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
