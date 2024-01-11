import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const useApi = () => {
  const createApiInstance = () => {
    return axios.create({
      baseURL: "http://localhost:8081",
      timeout: 5000,
      withCredentials: true,
    });
  };

  const [cookies, setCookie] = useCookies(["token", "refreshToken"]);

  const setupInterceptors = (apiInstance) => {
    apiInstance.interceptors.response.use(
      (response) => {
        console.log("Response:", response);
        return response;
      },
      async (error) => {
        console.error("Interceptor Error:", error);

        if (axios.isCancel(error)) {
          return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          console.log("Refreshing Token...");
          originalRequest._retry = true;

          try {
            const refreshResponse = await apiInstance.post(
              "/auth/login/refresh-token",
              { token: cookies.refreshToken }
            );

            setCookie("token", refreshResponse.data.accessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshResponse.data.accessToken}`;

            return apiInstance(originalRequest);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  };

  const [api] = useState(() => {
    const initialApiInstance = createApiInstance();
    setupInterceptors(initialApiInstance);
    return initialApiInstance;
  });

  const cleanup = () => {
    console.log("Cleanup: Request canceled due to component unmounting");
  };

  useEffect(() => {
    return cleanup;
  }, []);

  return { api, cleanup };
};
