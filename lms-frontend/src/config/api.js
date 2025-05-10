const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // Content endpoints
  CONTENT: `${API_BASE_URL}/content`,
  CONTENT_BY_ID: (id) => `${API_BASE_URL}/content/${id}`,
  
  // User endpoints
  USER_PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
};

export default API_BASE_URL; 