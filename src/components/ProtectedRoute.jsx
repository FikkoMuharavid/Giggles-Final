import React from "react";
import { Navigate } from "react-router-dom";

// Fungsi untuk mendapatkan role dari localStorage atau token
const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Contoh parsing token untuk mendapatkan role (jika menggunakan JWT)
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.role;
};

export const ProtectedRoute = ({ roleRequired, children }) => {
  const role = getRole();

  if (!role || role !== roleRequired) {
    return <Navigate to="/login" />;
  }

  return children;
};
