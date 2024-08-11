// src/routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Calendar from "./components/Calendar";
import LoginPage from "./components/Login";

const AppRoutes = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  localStorage.setItem("token", queryParameters.get("access_token"));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
