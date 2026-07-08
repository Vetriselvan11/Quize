import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1 style={{ fontSize: '4rem', color: 'var(--primary-color)' }}>404</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Page not found.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
    );
};

export default NotFound;
