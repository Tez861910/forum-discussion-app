import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const useApi = () => {
  const createApiInstance = () => {
    const instance = axios.create({
      baseURL: "http://localhost:8081",
      timeout: 5000,
      withCredentials: true,
    });

    // Ensure withCredentials is set for all requests
    instance.defaults.withCredentials = true;

    return instance;
  };

  const [cookies, setCookie] = useCookies(["token", "refreshToken"]);

  const setupInterceptors = (apiInstance) => {
    apiInstance.interceptors.response.use(
      (response) => {
        console.log("Response:", response);
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Check if the refresh token exists
          if (!cookies.refreshToken) {
            // Redirect the user to the login page
            window.location.href = "/login";
            return Promise.reject(error);
          }

          try {
            const refreshResponse = await apiInstance.post(
              "/miscs/refreshtokens/refresh-token",
              { token: cookies.refreshToken }
            );

            setCookie("token", refreshResponse.data.accessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshResponse.data.accessToken}`;

            return apiInstance(originalRequest);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);

            // Handle refresh token errors
            if (refreshError.response && refreshError.response.status === 401) {
              // Redirect the user to the login page
              window.location.href = "/login";
            }

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
