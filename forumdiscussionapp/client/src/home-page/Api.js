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
    // Interceptor to add authentication headers
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

    // Interceptor to refresh token if needed
    apiInstance.interceptors.response.use(
      (response) => {
        console.log('Response:', response);
        return response;
      },
      async (error) => {
        console.error('Interceptor Error:', error);

        if (axios.isCancel(error)) {
          // Request was canceled, do not retry
          return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== '/home/refresh-token'
        ) {
          console.log('Refreshing Token...');
          originalRequest._retry = true;

          try {
            const newToken = await refreshAccessToken();
            if (newToken) {
              console.log('Token Refreshed. Retrying original request...');
              // Create a new axios instance with the new token
              const newApiInstance = createApiInstance();
              newApiInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

              // Retry the original request with the new token
              return newApiInstance(originalRequest);
            }
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            // Handle refresh error as needed
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

  const refreshAccessToken = async () => {
    try {
      // Make a request to your backend to refresh the access token
      const response = await axios.post(
        'http://localhost:8081/home/refresh-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken}`,
          },
        }
      );

      // Update the cookie with the new token
      const newToken = response.data.access_token;
      setCookie('token', newToken, { path: '/' });

      console.log('New Token:', newToken);
      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle refresh error as needed
      return null;
    }
  };

  // Cleanup function to cancel any pending requests
  const cleanup = () => {
    console.log('Cleanup: Request canceled due to component unmounting');
    // You might need to cancel requests or perform other cleanup here
  };

  useEffect(() => {
    return cleanup;
  }, []); // Cleanup on unmount

  // Return the API instance and cleanup function
  return { api, cleanup };
};

export default useApi;
