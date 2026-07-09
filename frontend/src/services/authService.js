import api from './api';

export const authService = {
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    login: async (data) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },
    adminLogin: async (data) => {
        const response = await api.post('/auth/admin-login', data);
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
