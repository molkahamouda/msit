import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
const Layout = () => {
  return (
    <div className="layout-container">
      <Header />  
      <div className="layout-content">
        <Sidebar />  
        <div className="main-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}; 

export default Layout;
