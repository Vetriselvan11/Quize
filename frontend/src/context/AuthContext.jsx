import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('quiz_token');
            if (token) {
                try {
                    const data = await authService.getProfile();
                    setUser(data.user);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('quiz_token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('quiz_token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('quiz_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
