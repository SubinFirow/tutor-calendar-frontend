// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      return false;
    }
    return true;
  };
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
