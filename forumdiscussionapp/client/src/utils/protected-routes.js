import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};
