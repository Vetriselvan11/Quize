import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const result = location.state?.result;

    if (!result) return <Navigate to="/dashboard" />;

    const isPassed = result.percentage >= 50;

    return (
        <div className="card" style={{ maxWidth: '640px', margin: '4rem auto', padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(180deg, var(--card-bg) 0%, rgba(30, 41, 59, 0.4) 100%)', borderTop: `4px solid ${isPassed ? 'var(--success-color)' : 'var(--danger-color)'}` }}>
            <div style={{ marginBottom: '2rem' }}>
                {isPassed ? (
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--success-bg)', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '3.5rem', boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>
                        ✓
                    </div>
                ) : (
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--danger-bg)', color: 'var(--danger-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '3.5rem', boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
                        ✕
                    </div>
                )}
            </div>
            
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: isPassed ? 'var(--success-color)' : 'var(--danger-color)', textTransform: 'uppercase', letterSpacing: '0.1em', textShadow: `0 0 20px ${isPassed ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}` }}>
                {isPassed ? 'TEST PASSED' : 'TEST FAILED'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.125rem' }}>
                Challenge concluded. Here are your final compilation stats.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem', background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-highlight)' }}>
                <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-highlight)' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Final Score</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--text-primary)', textShadow: '0 0 15px rgba(255,255,255,0.2)' }} className="code-text">
                        {result.score} <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>/ {result.answers?.length || result.total_questions}</span>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Accuracy</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: '800', color: isPassed ? 'var(--success-color)' : 'var(--danger-color)', textShadow: `0 0 15px ${isPassed ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}` }} className="code-text">
                        {result.percentage.toFixed(0)}%
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <Link to="/quizzes" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>TRY AGAIN</Link>
                <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>DEV DASHBOARD</Link>
            </div>
        </div>
    );
};

export default Result;
