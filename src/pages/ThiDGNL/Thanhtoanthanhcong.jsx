import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';

const getLocationName = (locationValue) => {
  switch (locationValue) {
    case 'khanh-hoa':
      return 'Khánh Hòa';
    case 'ho-chi-minh':
      return 'Hồ Chí Minh';
    case 'ha-noi':
      return 'Hà Nội';
    default:
      return locationValue;
  }
};

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const registrationData = state?.registrationData;

  if (!registrationData) {
    navigate('/dashboard/');
    return null;
  }

  const { title, profileCode, examLocation, examId } = registrationData;

  // Lưu dữ liệu đăng ký vào localStorage
  const registeredExams = JSON.parse(localStorage.getItem('registeredExams')) || [];
  const updatedRegistrationData = {
    examId: examId.toString(), // Đảm bảo examId là string
    title,
    profileCode,
    examLocation,
    isPaid: true,
    status: 'Sắp diễn ra',
  };

  // Cập nhật hoặc thêm dữ liệu đăng ký vào danh sách
  const existingIndex = registeredExams.findIndex((exam) => exam.examId === examId.toString());
  if (existingIndex >= 0) {
    registeredExams[existingIndex] = updatedRegistrationData;
  } else {
    registeredExams.push(updatedRegistrationData);
  }
  localStorage.setItem('registeredExams', JSON.stringify(registeredExams));

  const handleDownloadTicket = () => {
    alert('Tải giấy báo dự thi...');
  };

  const handleBackToHome = () => {
    navigate('/dashboard/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="relative w-full max-w-[1202px] mx-auto flex-grow py-6 px-4 sm:py-10 sm:px-0">
        <div className="w-full bg-white rounded-lg shadow-md p-6 sm:p-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-black text-[24px] font-bold font-roboto mb-2">
            Thanh toán thành công!
          </h2>
          <p className="text-[#6B7280] text-center mb-6">
            Cảm ơn bạn đã đăng ký tham gia kỳ thi. Vui lòng kiểm tra email để xem thông tin chi tiết.
          </p>

          <div className="w-full max-w-[500px] text-left">
            <div className="flex justify-between mb-2">
              <span className="text-[#6B7280]">Mã hồ sơ</span>
              <span className="text-black font-medium">{profileCode}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[#6B7280]">Kỳ thi</span>
              <span className="text-black font-medium">{title}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[#6B7280]">Ngày thi</span>
              <span className="text-black font-medium">15/03/2024</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[#6B7280]">Địa điểm</span>
              <span className="text-black font-medium">{getLocationName(examLocation)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-[#6B7280]">Số tiền</span>
              <span className="text-black font-medium">300,000 VND</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              className="w-full sm:w-[200px] h-[42px] border border-[#E5E7EB] text-black text-base font-normal font-roboto rounded-md"
              onClick={handleDownloadTicket}
            >
              Tải giấy báo dự thi
            </button>
            <button
              className="w-full sm:w-[150px] h-[37px] bg-[#0056B3] text-white text-base font-bold font-roboto rounded-md"
              onClick={handleBackToHome}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;