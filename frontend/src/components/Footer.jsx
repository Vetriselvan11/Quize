import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-highlight)',
            padding: '2.5rem 1.5rem 1.5rem',
            marginTop: 'auto',
            backgroundColor: 'var(--bg-color)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
        }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
                <a 
                    href="https://www.instagram.com/?next=%2F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="code-text" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Instagram</span>
                </a>
                
                <a 
                    href="https://www.linkedin.com/feed/?shareActive=true&url=https%3A%2F%2Ftr.ee%2FEyaKoXc1Ov&shareUrl=https%3A%2F%2Ftr.ee%2FEyaKoXc1Ov&linkOrigin=LI_BADGE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="code-text" style={{ fontSize: '0.875rem', fontWeight: '500' }}>LinkedIn</span>
                </a>
            </div>
            
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }} className="code-text">
                &copy; {new Date().getFullYear()} Quiz Platform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
