import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const result = location.state?.result;

    if (!result) return <Navigate to="/dashboard" />;

    const isPassed = result.percentage >= 50;

    return (
        <div className="card" style={{ maxWidth: '640px', margin: '3rem auto', padding: '3rem 2rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                {isPassed ? (
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--success-bg)', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '2.5rem' }}>
                        ✓
                    </div>
                ) : (
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--danger-bg)', color: 'var(--danger-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '2.5rem' }}>
                        !
                    </div>
                )}
            </div>
            
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {isPassed ? 'Assessment Passed!' : 'Assessment Failed'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                You have successfully completed the quiz. Here is your result breakdown.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Final Score</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {result.score} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {result.answers?.length || result.total_questions}</span>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Percentage</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: isPassed ? 'var(--success-color)' : 'var(--danger-color)' }}>
                        {result.percentage.toFixed(0)}%
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/quizzes" className="btn btn-secondary">Take Another Quiz</Link>
                <Link to="/dashboard" className="btn btn-primary">Return to Dashboard</Link>
            </div>
        </div>
    );
};

export default Result;
