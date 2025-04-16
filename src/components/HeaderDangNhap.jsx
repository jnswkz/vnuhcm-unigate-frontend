import { NavLink } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { useState } from 'react';

export default function HeaderDangNhap({ user, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  // Dữ liệu thông báo mẫu
  const notifications = [
    {
      id: 1,
      title: 'Hạn đăng ký xét tuyển',
      message: 'Hạn đăng ký xét tuyển đợt 1 sẽ kết thúc vào ngày 30/04/2025',
      time: '1 giờ trước',
      read: false
    },
    {
      id: 2,
      title: 'Lịch thi ĐGNL',
      message: 'Lịch thi đánh giá năng lực đợt 2 đã được cập nhật',
      time: '3 giờ trước',
      read: true
    },
    {
      id: 3,
      title: 'Kết quả xét tuyển',
      message: 'Kết quả xét tuyển đợt 1 đã được công bố',
      time: '1 ngày trước',
      read: true
    }
  ];

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-[40px] h-[40px] bg-gray-300 mr-4"></div>
        <div className="text-[#0056B3] text-xl font-bold">VNUHCM-UNIGATE</div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="flex space-x-6 ml-12">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors ${
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
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors ${
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
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors ${
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
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors ${
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
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors ${
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
                `px-4 py-2 rounded text-gray-700 font-medium transition-colors ${
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
        <div className="relative">
          <button 
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
            onClick={toggleNotifications}
          >
            <FaBell className="text-gray-600 text-base" />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full h-2.5 w-2.5"></span>
          </button>
          
          {/* Notification Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Thông báo</h3>
                  <span className="text-sm text-blue-600 cursor-pointer">Đánh dấu tất cả đã đọc</span>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                ))}
              </div>
              
              <div className="px-4 py-2 border-t border-gray-200">
                <NavLink to="/thong-bao" className="block text-center text-sm text-blue-600 hover:text-blue-800">
                  Xem tất cả thông báo
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-sm font-medium">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>

        {/* User Name */}
        <span className="text-gray-700 font-medium">{user?.name || 'User'}</span>

        {/* Dropdown for Logout */}
        <div className="relative group">
          <button className="text-gray-600 focus:outline-none">
            <svg
              className="w-5 h-5"
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
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}