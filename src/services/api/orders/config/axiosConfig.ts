import axios from 'axios';

const BASE_URL = 'https://run.mocky.io/v3';
const API_TIMEOUT = 10000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptors
api.interceptors.request.use(
  (config) => {
    // Define request logic here that will be processed on every API call
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptors
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // Global handling of API errors
    console.error('API Error:', error.message);
  },
);

export default api;
