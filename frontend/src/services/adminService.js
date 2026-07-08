import api from './api';

export const adminService = {
    getStats: async () => {
        const response = await api.get('/admin/dashboard-stats');
        return response.data;
    },
    getUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },
    getQuizzes: async () => {
        const response = await api.get('/admin/quizzes');
        return response.data;
    },
    createQuiz: async (data) => {
        const response = await api.post('/admin/quizzes', data);
        return response.data;
    },
    updateQuiz: async (quizId, data) => {
        const response = await api.put(`/admin/quizzes/${quizId}`, data);
        return response.data;
    },
    addQuestion: async (data) => {
        const response = await api.post('/admin/questions', data);
        return response.data;
    },
    getResults: async () => {
        const response = await api.get('/admin/results');
        return response.data;
    }
};
