import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/AuthProvider";

export const GuestAccess = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated?.data && location.pathname === "/login") {
    return <Navigate to="/forms/myforms" />;
  }

  return (
    <>
      <Outlet />
      {children}
    </>
  );
};

export default GuestAccess;
