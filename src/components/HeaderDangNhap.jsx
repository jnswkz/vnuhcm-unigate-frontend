import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBell, FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';

export default function Header({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Thông tin người dùng cụ thể
  const userInfo = {
    name: "Võ Phương Thanh",
    email: "vophuongthanh604@outlook.com",
    phone: "0885583693",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-8 py-3 bg-[#FFFFFF] border-b border-gray-100 shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-[40px] h-[40px] mr-4 transform transition-all duration-300 hover:scale-110">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#0056B3"/>
            <path d="M20 10L30 30H10L20 10Z" fill="#FFFFFF"/>
          </svg>
        </div>
        <div className="text-2xl font-bold font-roboto bg-gradient-to-r from-[#0056B3] to-[#003087] text-transparent bg-clip-text">
          VNUHCM-UNIGATE
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="flex space-x-8 ml-12">
          {[
            { to: "/", label: "Trang chủ" },
            { to: "/gioi-thieu", label: "Giới thiệu" },
            { to: "/thi-dgnl", label: "Thi ĐGNL" },
            { to: "/xet-tuyen", label: "Xét tuyển" },
            { to: "/tai-lieu-on-tap", label: "Tài liệu" },
            { to: "/dien-dan", label: "Diễn đàn" },
            { to: "/lien-he", label: "Liên hệ" },
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-gray-700 font-medium transition-colors font-roboto ${
                    isActive ? 'bg-[#0056B3] text-white' : 'hover:bg-[#0056B3] hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info and Notifications */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative" ref={notificationRef}>
          <button
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center transform transition-all duration-200 hover:scale-110"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <FaBell className="text-gray-600 text-lg" />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full h-4 w-4 text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl py-3 z-50 animate-fade-in">
              <h3 className="px-5 py-3 text-sm font-bold text-gray-800 border-b border-gray-100">
                Thông báo
              </h3>
              <ul className="divide-y divide-gray-100">
                {[
                  {
                    text: "Bạn có kỳ thi sắp diễn ra vào ngày 20/01/2024.",
                    time: "2 giờ trước",
                  },
                  {
                    text: "Hạn đăng ký xét tuyển kết thúc vào ngày 15/01/2024.",
                    time: "1 ngày trước",
                  },
                  {
                    text: "Cập nhật hồ sơ cá nhân để hoàn tất đăng ký.",
                    time: "3 ngày trước",
                  },
                ].map((notification, index) => (
                  <li
                    key={index}
                    className="px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-start space-x-3"
                  >
                    <FaBell className="text-[#0056B3] mt-1" />
                    <div className="flex-1">
                      <p>{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-[#EBF5FF] transform transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-[#0056B3]">
            <span className="text-gray-600 text-base font-medium font-roboto">
              {userInfo.name.charAt(0)}
            </span>
          </div>
          {/* Online Dot */}
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#10B981] rounded-full border-2 border-white"></span>
        </div>

        {/* User Name and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-1 focus:outline-none group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700 font-medium font-roboto group-hover:text-[#0056B3] transition-colors duration-200">
              {userInfo.name}
            </span>
            <svg
              className="w-5 h-5 text-gray-600 transform transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
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
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl py-4 z-50 animate-fade-in">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-[#EBF5FF] shadow-sm">
                    <span className="text-gray-600 text-2xl font-medium font-roboto">
                      {userInfo.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 font-roboto">{userInfo.name}</h3>
                    <p className="text-sm text-gray-600 font-roboto">{userInfo.email}</p>
                    <p className="text-sm text-gray-600 font-roboto">{userInfo.phone}</p>
                    <p className="text-xs text-[#10B981] font-roboto mt-1">Đã đăng nhập</p>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <NavLink
                  to="/profile"
                  className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-[#EBF5FF] hover:text-[#0056B3] transition-colors duration-200 font-roboto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUser className="mr-3 text-base text-gray-600" />
                  Thông tin cá nhân
                </NavLink>
                <NavLink
                  to="/change-password"
                  className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-[#EBF5FF] hover:text-[#0056B3] transition-colors duration-200 font-roboto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaLock className="mr-3 text-base text-gray-600" />
                  Đổi mật khẩu
                </NavLink>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout();
                  }}
                  className="flex items-center w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-[#EBF5FF] hover:text-[#0056B3] transition-colors duration-200 font-roboto"
                >
                  <FaSignOutAlt className="mr-3 text-base text-gray-600" />
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