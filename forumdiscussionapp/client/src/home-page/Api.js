import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useApi = () => {
  const createApiInstance = () => {
    return axios.create({
      baseURL: 'http://localhost:8081',
      timeout: 5000,
    });
  };

  const setupInterceptors = (apiInstance) => {
    apiInstance.interceptors.request.use(
      (config) => {
        const token = cookies.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    apiInstance.interceptors.response.use(
      (response) => {
        console.log('Response:', response);
        return response;
      },
      async (error) => {
        console.error('Interceptor Error:', error);

        if (axios.isCancel(error)) {
          return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          console.log('Refreshing Token...');
          originalRequest._retry = true;

          try {
            const response = await apiInstance.post('/refresh-token', {}, {
              headers: {
                Authorization: `Bearer ${cookies.refreshToken}`,
              },
            });

            const newToken = response.data.access_token;
            setCookie('token', newToken, { path: '/' });

            console.log('New Token:', newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return apiInstance(originalRequest);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  };

  const [api, setApi] = useState(() => {
    const initialApiInstance = createApiInstance();
    setupInterceptors(initialApiInstance);
    return initialApiInstance;
  });

  const [cookies, setCookie] = useCookies(['token', 'refreshToken']);

  const cleanup = () => {
    console.log('Cleanup: Request canceled due to component unmounting');
  };

  useEffect(() => {
    return cleanup;
  }, []);

  return { api, cleanup };
};

export default useApi;
