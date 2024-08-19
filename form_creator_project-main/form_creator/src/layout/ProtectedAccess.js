import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";

export const ProtectedAccess = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated?.data) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <SideNavbar />
      <Outlet />
      {children}
    </>
  );
};

export default ProtectedAccess;
