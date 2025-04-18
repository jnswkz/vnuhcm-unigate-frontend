import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBell, FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';

export default function Header({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Thêm state cho thông báo
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsNotificationOpen(false); // Đóng thông báo khi nhấn ra ngoài
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-[40px] h-[40px] bg-gray-300 mr-4"></div>
        <div className="text-[#0056B3] text-xl font-bold font-roboto">VNUHCM-UNIGATE</div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="flex space-x-6 ml-12">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors font-roboto ${
                  isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                }`
              }
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gioi-thieu"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors font-roboto ${
                  isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                }`
              }
            >
              Giới thiệu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/thi-dgnl"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors ${
                  isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                }`
              }
            >
              Thi ĐGNL
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/xet-tuyen"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors font-roboto ${
                  isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                }`
              }
            >
              Xét tuyển
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tai-lieu"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors font-roboto ${
                  isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                }`
              }
            >
              Tài liệu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dien-dan"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors font-roboto ${
                  isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                }`
              }
            >
              Diễn đàn
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lien-he"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors font-roboto ${
                  isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                }`
              }
            >
              Liên hệ
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* User Info and Notifications */}
      <div className="flex items-center space-x-3">
        {/* Notification Icon */}
        <div className="relative" ref={notificationRef}>
          <button
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)} // Toggle thông báo
          >
            <FaBell className="text-gray-600 text-base" />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full h-2.5 w-2.5"></span>
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50">
              <h3 className="px-4 py-2 text-sm font-bold text-gray-700">Thông báo</h3>
              <ul className="divide-y divide-gray-200">
                <li className="px-4 py-2 text-sm text-gray-600">Bạn có kỳ thi sắp diễn ra vào ngày 20/01/2024.</li>
                <li className="px-4 py-2 text-sm text-gray-600">Hạn đăng ký xét tuyển kết thúc vào ngày 15/01/2024.</li>
                <li className="px-4 py-2 text-sm text-gray-600">Cập nhật hồ sơ cá nhân để hoàn tất đăng ký.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-sm font-medium font-roboto">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>

        {/* User Name and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-1 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700 font-medium font-roboto">{user?.name || 'User'}</span>
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg font-medium font-roboto">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 font-roboto">{user.name}</h3>
                    <p className="text-sm text-gray-600 font-roboto">{user.email}</p>
                    <p className="text-sm text-gray-600 font-roboto">{user.phone}</p>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <NavLink
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-roboto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUser className="mr-2 text-gray-600" />
                  Thông tin cá nhân
                </NavLink>
                <NavLink
                  to="/change-password"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-roboto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaLock className="mr-2 text-gray-600" />
                  Đổi mật khẩu
                </NavLink>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout();
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-roboto"
                >
                  <FaSignOutAlt className="mr-2 text-gray-600" />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}