import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

export default function useApi() {
  const [api, setApi] = useState(null);

  useEffect(() => {
    const token = cookie.load('token');
    console.log(`Token: ${token}`);

    const apiInstance = axios.create({
      baseURL: 'http://localhost:8081/api',
      timeout: 5000,
      headers: { 'Authorization': `Bearer ${token}` } 
    });

    apiInstance.interceptors.request.use((request) => {
      console.log(`Token sent: ${request.headers['Authorization']}`);
      return request;
    });

    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
      failedQueue.forEach(prom => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });

      failedQueue = [];
    };

    apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
          if (isRefreshing) {
            return new Promise(function(resolve, reject) {
              failedQueue.push({resolve, reject});
            }).then(token => {
              error.config.headers['Authorization'] = 'Bearer ' + token;
              return apiInstance(error.config);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          error.config.__isRetryRequest = true;
          isRefreshing = true;

          return new Promise(function(resolve, reject) {
            axios.post('http://localhost:8081/home/refresh-token', {}, {
              headers: {
                Authorization: `Bearer ${cookie.load('refreshToken')}`,
              },
            }).then(({data}) => {
              if (data.success) {
                cookie.save('token', data.token, { path: '/' });
                cookie.save('refreshToken', data.refreshToken, { path: '/' });
                error.config.headers['Authorization'] = 'Bearer ' + data.token;
                processQueue(null, data.token);
                resolve(apiInstance(error.config));
              } else {
                processQueue(data.error, null);
                reject(data.error);
              }
            }).catch((err) => {
              processQueue(err, null);
              reject(err);
            }).then(() => {
              isRefreshing = false;
            });
          });
        }

        return Promise.reject(error);
      },
    );

    setApi(apiInstance);
  }, []);

  return api;
}
