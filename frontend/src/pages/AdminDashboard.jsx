import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        adminService.getStats().then(setStats).catch(console.error);
    }, []);

    if (!stats) return <div className="empty-state">Loading dashboard stats...</div>;

    return (
        <div>
            <div className="dashboard-header">
                <h2>Admin Overview</h2>
            </div>
            
            <div className="stats-grid">
                <div className="card stat-card">
                    <h3>Total Users</h3>
                    <div className="stat-value">{stats.total_users}</div>
                </div>
                <div className="card stat-card">
                    <h3>Total Quizzes</h3>
                    <div className="stat-value">{stats.total_quizzes}</div>
                </div>
                <div className="card stat-card">
                    <h3>Total Attempts</h3>
                    <div className="stat-value" style={{ color: 'var(--primary-color)' }}>{stats.total_attempts}</div>
                </div>
                <div className="card stat-card">
                    <h3>Active Quizzes</h3>
                    <div className="stat-value" style={{ color: 'var(--success-color)' }}>{stats.active_quizzes}</div>
                </div>
            </div>
            
            <div className="dashboard-section">
                <h3>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '1.125rem' }}>Manage Quizzes</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Create, update, or remove quizzes and their questions.</p>
                        <Link to="/admin/quizzes" className="btn btn-primary" style={{ marginTop: 'auto' }}>Go to Quizzes</Link>
                    </div>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '1.125rem' }}>User Results</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>View student scores, performance, and detailed attempt history.</p>
                        <Link to="/admin/users" className="btn btn-secondary" style={{ marginTop: 'auto' }}>View Users & Scores</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
