import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout : 10000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }
    ,
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // You can handle specific status codes here
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        window.location.href = '/login';
      }
      else if (error.response.status === 500) {
        console.error("Server error - try again later");
      }
      else if (error.code === 'ECONNABORTED') {
        console.error("Request timeout - try again ");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;