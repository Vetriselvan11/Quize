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
                <h2>COMMAND CENTER (ADMIN)</h2>
            </div>
            
            <div className="stats-grid">
                <div className="card stat-card">
                    <h3>Total Devs</h3>
                    <div className="stat-value">{stats.total_users}</div>
                </div>
                <div className="card stat-card">
                    <h3>Total Arenas</h3>
                    <div className="stat-value">{stats.total_quizzes}</div>
                </div>
                <div className="card stat-card">
                    <h3>Challenges Run</h3>
                    <div className="stat-value" style={{ color: 'var(--primary-color)' }}>{stats.total_attempts}</div>
                </div>
                <div className="card stat-card">
                    <h3>Active Arenas</h3>
                    <div className="stat-value" style={{ color: 'var(--success-color)' }}>{stats.active_quizzes}</div>
                </div>
            </div>
            
            <div className="dashboard-section">
                <h3>System Operations</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '1.125rem', textTransform: 'uppercase', color: 'var(--text-primary)' }}>Manage Arenas</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Create new challenges, update existing matches, and configure rules.</p>
                        <Link to="/admin/quizzes" className="btn btn-primary" style={{ marginTop: 'auto' }}>Open Arena Manager</Link>
                    </div>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '1.125rem', textTransform: 'uppercase', color: 'var(--text-primary)' }}>Player Intel</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>View global leaderboards, investigate player stats, and review match histories.</p>
                        <Link to="/admin/users" className="btn btn-secondary" style={{ marginTop: 'auto' }}>Access Player Database</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
