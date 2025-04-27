import React from 'react';
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/dang-nhap" />;
  if (user?.role !== "admin") return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="ml-[240px] p-6 flex-1 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;