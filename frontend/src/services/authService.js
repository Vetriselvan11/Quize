import api from './api';

export const authService = {
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    adminLogin: async (email, password) => {
        const response = await api.post('/auth/admin-login', { email, password });
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
