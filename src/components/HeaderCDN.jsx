import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo-dhqg.png';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
 {/* Logo */}
        <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-[45px] h-[45px] mr-4 object-contain" />
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

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/dang-nhap"
          className="px-6 py-2 rounded font-semibold text-[#0056B3] border border-[#0056B3] hover:bg-[#f0f7ff] transition-colors"
        >
          Đăng nhập
        </Link>
        <Link
          to="/dang-ky"
          className="px-6 py-2 rounded font-semibold bg-[#0056B3] text-white border border-[#0056B3] hover:bg-[#004494] transition-colors"
        >
          Đăng ký
        </Link>
      </div>
    </header>
  );
}
