import api from './api';

export const quizService = {
    getAvailableQuizzes: async () => {
        const response = await api.get('/quizzes/available');
        return response.data;
    },
    getQuizDetails: async (quizId) => {
        const response = await api.get(`/quizzes/${quizId}`);
        return response.data;
    },
    startQuiz: async (quizId) => {
        const response = await api.post(`/quizzes/${quizId}/start`);
        return response.data;
    },
    submitQuiz: async (quizId, payload) => {
        const response = await api.post(`/quizzes/${quizId}/submit`, payload);
        return response.data;
    },
    getUserResults: async () => {
        const response = await api.get('/user/results');
        return response.data;
    }
};
