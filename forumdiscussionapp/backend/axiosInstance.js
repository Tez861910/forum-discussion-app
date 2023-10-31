const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define an Axios interceptor for authorization checks
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['authorization'] =` ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = axiosInstance;
