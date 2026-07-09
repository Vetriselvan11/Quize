import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div style={{ textAlign: 'center', padding: '6rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: '1.1', textTransform: 'uppercase' }}>
                    ENTER THE <span style={{ color: 'var(--primary-color)' }}>DEV ARENA</span>
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', fontWeight: '500' }}>
                    Test your logic, algorithms, and syntax knowledge against time. Compete in high-pressure programming challenges and climb the ranks.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>START CODING</Link>
                    <Link to="/login" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>LOGIN</Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '4rem 1rem', borderTop: '1px solid var(--border-color)', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TIMED CHALLENGES</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Every second counts. Prove your coding speed under strict time pressure in competitive tech quizzes.</p>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>INSTANT FEEDBACK</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Get detailed breakdowns of your solutions. See your correct and incorrect syntax immediately.</p>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DEVELOPER STATS</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Track your accuracy, review challenge history, and analyze your progression in the dev dashboard.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
