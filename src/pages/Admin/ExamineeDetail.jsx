import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ExamineeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const examinee = location.state?.examinee; // Lấy dữ liệu thí sinh từ state

  // Nếu không có dữ liệu thí sinh, hiển thị thông báo
  if (!examinee) {
    return <div className="p-6">Không tìm thấy thông tin thí sinh.</div>;
  }

  // Hàm xử lý nút "Từ chối"
  const handleReject = () => {
    console.log('Từ chối thí sinh:', examinee.id);
    navigate('/admin/examinees'); // Quay lại trang danh sách
  };

  // Hàm xử lý nút "Duyệt"
  const handleApprove = () => {
    console.log('Duyệt thí sinh:', examinee.id);
    navigate('/admin/examinees'); // Quay lại trang danh sách
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] font-bold text-[#0056B3]">Duyệt hồ sơ Thí sinh</h1>
        <div className="space-x-4">
          <button
            onClick={handleReject}
            className="bg-[#DC2626] text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Từ chối
          </button>
          <button
            onClick={handleApprove}
            className="bg-[#22C55E] text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Duyệt
          </button>
        </div>
      </div>

      <div className="flex space-x-6">
    {/* Thông tin cá nhân */}
<div className="w-2/3 min-w-[800px] bg-white rounded-lg shadow-md p-6">
  <h2 className="text-[18px] font-bold text-gray-800 mb-4">Thông tin cá nhân</h2>
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-3">
      <div>
        <span className="font-regular text-gray-500 text-sm">Họ và tên</span>
        <p className="text-black font-semibold mt-1 text-base">Nguyen Van A</p>
      </div>
      <div>
        <span className="font-regular text-gray-500 text-sm">CCCD</span>
        <p className="text-black font-semibold mt-1 text-base">079200001234</p>
      </div>
      <div>
        <span className="font-regular text-gray-500 text-sm">Email</span>
        <p className="text-black font-semibold mt-1 text-base">nguyenvana@email.com</p>
      </div>
      <div>
        <span className="font-regular text-gray-500 text-sm">Trường THPT</span>
        <p className="text-black font-semibold mt-1 text-base">THPT Nguyen Thi Minh Khai</p>
      </div>
    </div>
    <div className="space-y-3">
      <div>
        <span className="font-regular text-gray-500 text-sm">Ngày sinh</span>
        <p className="text-black font-semibold mt-1 text-base">2000-01-01</p>
      </div>
      <div>
        <span className="font-regular text-gray-500 text-sm">Số điện thoại</span>
        <p className="text-black font-semibold mt-1 text-base">0901234567</p>
      </div>
      <div>
        <span className="font-regular text-gray-500 text-sm">Địa chỉ liên lạc</span>
        <p className="text-black font-semibold mt-1 text-base">123 Nguyen Van Cu, Quan 5, TP.HCM</p>
      </div>
      <div>
        <span className="font-regular text-gray-500 text-sm">Tỉnh/Thành phố</span>
        <p className="text-black font-semibold mt-1 text-base">TP.HCM</p>
      </div>
    </div>
  </div>

          {/* Tài liệu đính kèm */}
          <h2 className="text-[18px] font-bold text-gray-800 mt-6 mb-4">Tài liệu đính kèm</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="bg-gray-300 h-45 flex items-center justify-center rounded-md">
                <span className="text-gray-500">XEM CHI TIẾT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-700">CCCD mặt trước</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[12px]">
                  Valid
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-300 h-45 flex items-center justify-center rounded-md">
                <span className="text-gray-500">XEM CHI TIẾT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-700">CCCD mặt sau</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[12px]">
                  Pending
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-300 h-45 flex items-center justify-center rounded-md">
                <span className="text-gray-500">XEM CHI TIẾT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-700">Minh chứng - Đổi tưng ưu tiên</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-[12px]">
                  Invalid
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ghi chú */}
        <div className="w-1/3 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-[18px] font-bold text-gray-800 mb-4">Ghi chú</h2>
          <textarea
            className="w-full h-55 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#0056B3]"
            placeholder="Nhập ghi chú..."
          />
        </div>
      </div>
    </div>
  );
};

export default ExamineeDetail;