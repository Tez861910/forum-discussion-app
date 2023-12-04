import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function useApi() {
  const [api, setApi] = useState(null);
  const [cookies, setCookie] = useCookies(['token', 'refreshToken']);

  useEffect(() => {
    const apiInstance = axios.create({
      baseURL: 'http://localhost:8081/api',
      timeout: 5000,
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

    apiInstance.interceptors.request.use((request) => {
      request.headers['Authorization'] = `Bearer ${cookies.token}`;
      return request;
    });

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
                Authorization: `Bearer ${cookies.refreshToken}`,
              },
            }).then(({data}) => {
              if (data.success) {
                setCookie('token', data.token, { path: '/' });
                setCookie('refreshToken', data.refreshToken, { path: '/' });
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
  }, [cookies, setCookie]);

  return api;
}