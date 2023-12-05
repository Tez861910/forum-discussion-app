import { Route, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoute = ({ children, ...props }) => {
  const cookies = new Cookies();
  const isAuthenticated = Boolean(cookies.get('token'));

  return (
    <Route {...props} element={isAuthenticated ? children : <Navigate to="/login" replace />} />
  );
};

export default PrivateRoute;
