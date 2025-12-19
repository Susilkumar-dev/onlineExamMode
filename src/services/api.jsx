import axios from 'axios';

// Use import.meta.env instead of process.env in Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  logout: () => api.post('/auth/logout'),
};

// User endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getUsers: (params) => api.get('/users', { params }),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Exam endpoints
export const examAPI = {
  getExams: (params) => api.get('/exams', { params }),
  getExam: (id) => api.get(`/exams/${id}`),
  createExam: (examData) => api.post('/exams', examData),
  updateExam: (id, examData) => api.put(`/exams/${id}`, examData),
  deleteExam: (id) => api.delete(`/exams/${id}`),
  startExam: (id) => api.post(`/exams/${id}/start`),
  submitExam: (id, answers) => api.post(`/exams/${id}/submit`, { answers }),
  getResults: (examId) => api.get(`/exams/${examId}/results`),
  getMyExams: () => api.get('/exams/me'),
};

// Question endpoints
export const questionAPI = {
  getQuestions: (params) => api.get('/questions', { params }),
  getQuestion: (id) => api.get(`/questions/${id}`),
  createQuestion: (questionData) => api.post('/questions', questionData),
  updateQuestion: (id, questionData) => api.put(`/questions/${id}`, questionData),
  deleteQuestion: (id) => api.delete(`/questions/${id}`),
  uploadBulkQuestions: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/questions/bulk', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Code execution endpoints
export const codeExecutionAPI = {
  executeCode: (code, language, testCases) => 
    api.post('/code/execute', { code, language, testCases }),
  validateCode: (code, language, questionId) => 
    api.post('/code/validate', { code, language, questionId }),
  getLanguages: () => api.get('/code/languages'),
};

// Analytics endpoints
export const analyticsAPI = {
  getPlatformStats: () => api.get('/analytics/platform'),
  getUserStats: (userId) => api.get(`/analytics/users/${userId}`),
  getExamStats: (examId) => api.get(`/analytics/exams/${examId}`),
  getCourseStats: (courseId) => api.get(`/analytics/courses/${courseId}`),
  getRevenueStats: (params) => api.get('/analytics/revenue', { params }),
};

// File upload endpoint
export const uploadAPI = {
  uploadFile: (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;