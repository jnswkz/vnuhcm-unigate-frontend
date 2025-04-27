export default function ProfileCard({ user }) {
    return (
      <div className="absolute top-0 right-0 w-[280px] bg-white rounded-lg shadow-lg">
        <div className="p-5 border-b border-[#E5E7EB]">
          <div className="flex items-center space-x-4">
            <img
              src="https://placehold.co/48x48"
              alt="Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-[16px] font-bold text-black font-roboto leading-[24px]">
                {user.ho_ten}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-[#6B7280] font-roboto leading-[21px]">
            {user.email}
          </p>
          <p className="mt-1 text-[14px] text-[#6B7280] font-roboto leading-[21px]">
            {user.phone}
          </p>
        </div>
        <div className="p-5">
          <div className="flex items-center space-x-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M11.6667 12.5C11.6667 13.4205 10.9205 14.1667 10 14.1667C9.07952 14.1667 8.33333 13.4205 8.33333 12.5C8.33333 11.5795 9.07952 10.8333 10 10.8333C10.9205 10.8333 11.6667 11.5795 11.6667 12.5Z" stroke="black" strokeWidth="2"/>
              <path d="M5.83333 2.5C5.83333 3.88071 4.88071 4.83333 3.5 4.83333C2.11929 4.83333 1.16667 3.88071 1.16667 2.5C1.16667 1.11929 2.11929 0.166667 3.5 0.166667C4.88071 0.166667 5.83333 1.11929 5.83333 2.5Z" stroke="black" strokeWidth="2"/>
            </svg>
            <span className="text-[14px] text-black font-roboto leading-[21px]">
              Thông tin cá nhân
            </span>
          </div>
          <div className="flex items-center space-x-3 mt-5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 9.16667H17.5" stroke="black" strokeWidth="2"/>
              <path d="M7.08333 1.66667H12.9167V18.3333H7.08333V1.66667Z" stroke="black" strokeWidth="2"/>
            </svg>
            <span className="text-[14px] text-black font-roboto leading-[21px]">
              Đổi mật khẩu
            </span>
          </div>
          <div className="flex items-center space-x-3 mt-5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 2.5H12.5V17.5H2.5V2.5Z" stroke="#DC2626" strokeWidth="2"/>
              <path d="M11.6667 5.83333H16.6667V11.6667H11.6667V5.83333Z" stroke="#DC2626" strokeWidth="2"/>
            </svg>
            <span className="text-[14px] text-[#DC2626] font-roboto leading-[21px]">
              Đăng xuất
            </span>
          </div>
        </div>
      </div>
    );
  }