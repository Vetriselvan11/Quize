import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div style={{ textAlign: 'center', padding: '6rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: '1.2' }}>
                    Master Your <span style={{ color: 'var(--primary-color)' }}>Programming Skills</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    Join the ultimate platform for developers to test their knowledge in React, Python, JavaScript, and more. Take timed quizzes and track your progress.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>Get Started Free</Link>
                    <Link to="/login" className="btn btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>Sign In</Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '4rem 1rem', borderTop: '1px solid var(--border-color)', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Timed Assessments</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Experience real-world pressure with strict time limits on every quiz attempt.</p>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Instant Results</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Get immediate feedback on your performance and see exactly where you need to improve.</p>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Track Progress</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Monitor your scores over time with detailed history and analytics on your dashboard.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
