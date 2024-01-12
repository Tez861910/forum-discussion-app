import * as React from "react";
import { useApi } from "../home-page/Api";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { api } = useApi();

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/auth/home/check-auth");
      setIsLoggedIn(response.data.isAuthenticated);
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  };

  // Run the checkAuthStatus when the component mounts
  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
