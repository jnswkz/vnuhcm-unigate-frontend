import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderDangNhap({ user, onLogout }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <header className="w-full h-[83px] bg-white border-b border-[#E5E7EB] flex items-center justify-center">
      <div className="max-w-[1272px] w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-5">
          <img
            src="https://placehold.co/40x40"
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
            VNUHCM-UNIGATE
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-[93px] h-[40px] rounded-md flex items-center justify-center text-[16px] font-bold font-roboto leading-[24px] ${
                isActive ? "bg-[#0056B3] text-white" : "text-black"
              }`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/gioi-thieu"
            className={({ isActive }) =>
              `text-[16px] font-bold font-roboto leading-[24px] ${
                isActive ? "text-[#0056B3] border-b-2 border-[#0056B3]" : "text-black"
              }`
            }
          >
            Giới thiệu
          </NavLink>
          <NavLink
            to="/thi-dgnl"
            className={({ isActive }) =>
              `text-[16px] font-bold font-roboto leading-[24px] ${
                isActive ? "text-[#0056B3] border-b-2 border-[#0056B3]" : "text-black"
              }`
            }
          >
            Thi ĐGNL
          </NavLink>
          <NavLink
            to="/xet-tuyen"
            className={({ isActive }) =>
              `text-[16px] font-bold font-roboto leading-[24px] ${
                isActive ? "text-[#0056B3] border-b-2 border-[#0056B3]" : "text-black"
              }`
            }
          >
            Xét tuyển
          </NavLink>
          <NavLink
            to="/tai-lieu"
            className={({ isActive }) =>
              `text-[16px] font-bold font-roboto leading-[24px] ${
                isActive ? "text-[#0056B3] border-b-2 border-[#0056B3]" : "text-black"
              }`
            }
          >
            Tài liệu
          </NavLink>
          <NavLink
            to="/dien-dan"
            className={({ isActive }) =>
              `text-[16px] font-bold font-roboto leading-[24px] ${
                isActive ? "text-[#0056B3] border-b-2 border-[#0056B3]" : "text-black"
              }`
            }
          >
            Diễn đàn
          </NavLink>
          <NavLink
            to="/lien-he"
            className={({ isActive }) =>
              `text-[16px] font-bold font-roboto leading-[24px] ${
                isActive ? "text-[#0056B3] border-b-2 border-[#0056B3]" : "text-black"
              }`
            }
          >
            Liên hệ
          </NavLink>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-5 relative">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-[42px] h-[42px] border border-[#0056B3] rounded-md flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2.5 1.66667H15V13.3333H2.5V1.66667Z"
                  stroke="#0056B3"
                  strokeWidth="2"
                />
                <path
                  d="M7.1875 16.6667H7.8125V18.3333H7.1875V16.6667Z"
                  stroke="#0056B3"
                  strokeWidth="2"
                />
              </svg>
            </button>
            {isNotificationsOpen && (
              <div className="absolute top-14 right-0 w-[320px] bg-white rounded-lg shadow-lg border border-[#E5E7EB]">
                <div className="p-4 border-b border-[#E5E7EB]">
                  <h3 className="text-[16px] font-bold text-black font-roboto leading-[24px]">
                    Thông báo
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-[14px] text-black font-roboto leading-[21px]">
                    Bạn có thông báo mới.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <img
                src="https://placehold.co/32x32"
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-[16px] font-bold text-black font-roboto leading-[24px]">
                {user?.name || "Nguyen Van A"}
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isUserDropdownOpen && (
              <div className="absolute top-12 right-0 w-[280px] bg-white rounded-lg shadow-lg border border-[#E5E7EB]">
                <div className="p-5">
                  <button
                    onClick={onLogout}
                    className="text-[14px] text-[#DC2626] font-roboto leading-[21px]"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}