import axios from 'axios';

/**
 * Axios instance with base configuration.
 * All API calls should use this instance.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — add auth token (future)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle common errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    // Handle specific status codes
    if (error.response?.status === 401) {
      // Future: redirect to login or clear token
      localStorage.removeItem('token');
    }

    return Promise.reject({ message, status: error.response?.status });
  }
);

export default api;
