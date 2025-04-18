import React from 'react';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';

export default function AdmissionInfo() {
  // Dữ liệu giả lập cho thông tin xét tuyển
  const admissionData = {
    applicationCode: 'XT2024-1234',
    cccd: '079201012345',
    examScore: 25.75,
    priorityArea: 'KV2-NT',
    priorityObject: '01',
    admissionScore: 26.25,
    fee: '300,000 VND',
    paymentStatus: 'Chưa thanh toán',
  };

  // Hàm xử lý thanh toán (giả lập)
  const handlePayment = () => {
    console.log('Thực hiện thanh toán...');
    alert('Chuyển hướng đến cổng thanh toán...');
    // Trong thực tế, bạn có thể chuyển hướng đến cổng thanh toán hoặc gọi API
  };

  return (
    <div className="bg-white rounded shadow-md">
      {/* Thông tin xét tuyển - Hiển thị dưới dạng các ô riêng biệt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Mã hồ sơ xét tuyển */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-gray-700 font-medium">Mã hồ sơ xét tuyển</p>
          <p className="text-gray-600">{admissionData.applicationCode}</p>
        </div>

        {/* CCCD */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-gray-700 font-medium">CCCD</p>
          <p className="text-gray-600">{admissionData.cccd}</p>
        </div>

        {/* Điểm thi */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-gray-700 font-medium">Điểm thi</p>
          <p className="text-gray-600">{admissionData.examScore}</p>
        </div>

        {/* Khu vực ưu tiên */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-gray-700 font-medium">Khu vực ưu tiên</p>
          <p className="text-gray-600">{admissionData.priorityArea}</p>
        </div>

        {/* Đối tượng ưu tiên */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-gray-700 font-medium">Đối tượng ưu tiên</p>
          <p className="text-gray-600">{admissionData.priorityObject}</p>
        </div>

        {/* Điểm xét tuyển */}
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-gray-700 font-medium">Điểm xét tuyển</p>
          <p className="text-gray-600">{admissionData.admissionScore}</p>
        </div>

        {/* Lệ phí xét tuyển và Trạng thái thanh toán - Gộp thành 1 ô */}
        <div className="bg-white p-4 rounded border border-gray-200 col-span-1 md:col-span-2">
          {/* Lệ phí xét tuyển */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 font-medium">Lệ phí xét tuyển</p>
            <p className="text-gray-600">{admissionData.fee}</p>
          </div>
          {/* Trạng thái thanh toán và nút Thanh toán */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Trạng thái thanh toán</p>
            <div className="flex items-center space-x-2">
              <p className="text-red-600 font-medium">{admissionData.paymentStatus}</p>
              <button
                onClick={handlePayment}
                className="bg-[#0056B3] text-white py-2 px-4 rounded font-medium hover:bg-[#004494] transition-colors"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thông báo cảnh báo */}
      <div className="bg-yellow-50 p-4 rounded shadow-md flex items-start">
        <span className="text-yellow-600 mr-2">⚠️</span>
        <p className="text-yellow-700">
          Thông tin xét tuyển không thể chỉnh sửa. Vui lòng liên hệ ban tuyển sinh nếu có sai sót.
        </p>
      </div>
    </div>
  );
}