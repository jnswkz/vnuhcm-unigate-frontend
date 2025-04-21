import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <div className="w-[240px] bg-white h-screen fixed top-0 left-0 shadow-md">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-2">
        <img src="https://via.placeholder.com/40" alt="Logo" className="w-10 h-10" />
        <h1 className="text-[18px] font-bold text-[#0056B3]">VNUHCM-UNIGATE</h1>
      </div>

      {/* Menu điều hướng */}
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/overview"
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v2z"
                />
              </svg>
              Tổng quan
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/examinees"
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Thí sinh
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/admission-quota" 
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h-4"
                />
              </svg>
              Trường
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/exams"
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"
                />
              </svg>
              Quản lý kết quả thi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/recruitment"
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Quản lý xét tuyển
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/documents"
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Quản lý tài liệu số
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/forums"
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              Quản lý diễn đàn
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/messages"
              className={({ isActive }) =>
                `flex items-center p-4 text-[16px] font-medium ${
                  isActive ? 'text-[#0056B3] bg-[#F0F7FF]' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Tin nhắn
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
