import { Route, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children, ...props }) => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(cookies.get('token')));
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(Boolean(cookies.get('token')));
  }, [location]);

  return isAuthenticated ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
