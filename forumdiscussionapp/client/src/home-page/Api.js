import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie'; 
import { startTransition } from 'react'; 

const useApi = () => {
  const [api, setApi] = useState(null);
  const [cookies, setCookie] = useCookies(['token', 'refreshToken']); 
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [failedQueue, setFailedQueue] = useState([]);

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    setFailedQueue([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.token; 

        const apiInstance = axios.create({
          baseURL: 'http://localhost:8081/api',  
          timeout: 5000,
          headers: { 'Authorization': `Bearer ${token}` } 
        });

        apiInstance.interceptors.request.use((request) => {
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
                  setFailedQueue([...failedQueue, {resolve, reject}]);
                }).then(token => {
                  error.config.headers['Authorization'] = 'Bearer ' + token;
                  return apiInstance(error.config);
                }).catch(err => {
                  return Promise.reject(err);
                });
              }

              error.config.__isRetryRequest = true;
              setIsRefreshing(true);

              try {
                const { data } = await axios.post('/home/refresh-token', {}, {
                  headers: {
                    Authorization: `Bearer ${cookies.refreshToken}`, 
                  },
                });

                if (data.success) {
                  startTransition(() => { 
                    setCookie('token', data.token, { path: '/' }); 
                    setCookie('refreshToken', data.refreshToken, { path: '/' });
                  });
                  error.config.headers['Authorization'] = 'Bearer ' + data.token;
                  processQueue(null, data.token);
                  return apiInstance(error.config);
                } else {
                  processQueue(data.error, null);
                  throw new Error(data.error);
                }
              } catch (err) {
                processQueue(err, null);
                throw err;
              } finally {
                setIsRefreshing(false);
              }
            }

            return Promise.reject(error);
          },
        );

        setApi(apiInstance);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, [cookies, setCookie, isRefreshing, failedQueue]);

  return api;
}

export default useApi;
