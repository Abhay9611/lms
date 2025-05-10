import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  
  // Admin Routes
  GRADES: '/api/admin/grades',
  SUBJECTS: '/api/admin/subjects',
  TOPICS: '/api/admin/topics',
  CONTENTS: '/api/admin/contents',
  TEACHING_GUIDES: '/api/admin/teaching-guides',
  PLANNER: '/api/admin/planner',
  
  // File Upload
  UPLOAD: '/api/uploads'
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
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

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 