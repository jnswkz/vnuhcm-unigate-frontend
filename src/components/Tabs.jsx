import { NavLink } from 'react-router-dom';

export default function Tabs() {
  return (
    <div className="max-w-[1224px] mx-auto mt-12 border-b border-gray-200">
      <div className="flex space-x-8">
        <NavLink
          to="/gioi-thieu/ky-thi"
          className={({ isActive }) =>
            `pb-2 text-base font-bold font-roboto ${
              isActive ? 'text-[#0056B3] border-b-2 border-[#0056B3]' : 'text-black'
            }`
          }
        >
          Giới thiệu kỳ thi
        </NavLink>
        <NavLink
          to="/gioi-thieu/cau-truc-de-thi"
          className={({ isActive }) =>
            `pb-2 text-base font-bold font-roboto ${
              isActive ? 'text-[#0056B3] border-b-2 border-[#0056B3]' : 'text-black'
            }`
          }
        >
          Cấu trúc đề thi
        </NavLink>
        <NavLink
          to="/gioi-thieu/lich-thi"
          className={({ isActive }) =>
            `pb-2 text-base font-bold font-roboto ${
              isActive ? 'text-[#0056B3] border-b-2 border-[#0056B3]' : 'text-black'
            }`
          }
        >
          Lịch thi
        </NavLink>
      </div>
    </div>
  );
}