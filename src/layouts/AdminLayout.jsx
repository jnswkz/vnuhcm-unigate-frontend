import React from 'react';
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
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