// src/pages/Admin.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

export default function Admin() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <div className="ml-[240px] w-full p-6">
        <Outlet /> {/* Đây là nơi render các trang con (overview, examinees, ...) */}
      </div>
    </div>
  );
}