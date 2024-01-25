import axios, { AxiosInstance } from 'axios';

const DEFAULT_BASE_URL = 'https://run.mocky.io/v3';
const API_TIMEOUT = 10000;

interface ApiProps {
  customBaseUrl?: string;
}

export const createApiInstance = ({
  customBaseUrl = DEFAULT_BASE_URL,
}: ApiProps): AxiosInstance => {
  const instance = axios.create({
    baseURL: customBaseUrl,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptors
  instance.interceptors.request.use(
    (config) => {
      // Define request logic here that will be processed on every API call
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptors
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      // Global handling of API errors
      console.error('API Error:', error.message);
    },
  );

  return instance;
};
