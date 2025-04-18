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

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const registrationData = state?.registrationData;

  if (!registrationData) {
    navigate('/thi-dgnl');
    return null;
  }

  // Nếu đã thanh toán, điều hướng đến trang PaymentSuccess
  if (registrationData.isPaid) {
    navigate('/payment-success', { state: { registrationData } });
    return null;
  }

  const { title, date, profileCode, examLocation, isPaid, status } = registrationData;

  const handleAdjust = () => {
    navigate(`/dang-ky/${registrationData.examId}`, {
      state: { title, date },
    });
  };

  const handlePayment = () => {
    // Cập nhật trạng thái thanh toán và điều hướng đến trang PaymentSuccess
    const updatedRegistrationData = { ...registrationData, isPaid: true };
    navigate('/payment-success', { state: { registrationData: updatedRegistrationData } });
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="relative w-full max-w-[1202px] mx-auto flex-grow py-6 px-4 sm:py-10 sm:px-0">
        <div className="w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-black text-[20px] font-bold font-roboto mb-6">
            Kỳ thi sắp diễn ra
          </h2>
          <div className="space-y-6">
            <div className="w-full p-4 sm:p-6 bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div>
                  <h3 className="text-[16px] font-bold text-black">{title}</h3>
                  <p className="text-[14px] text-[#6B7280] mt-2">Ngày thi: {date}</p>
                  <p className="text-[14px] text-[#6B7280]">
                    Mã hồ sơ dự thi: {profileCode}
                  </p>
                  <p className="text-[14px] text-[#6B7280]">
                    Địa điểm dự thi: {getLocationName(examLocation)}
                  </p>
                  <p className="text-[14px] text-[#6B7280]">
                    Tình trạng thanh toán:{' '}
                    <span className={isPaid ? 'text-green-500' : 'text-red-500'}>
                      {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
                  <span
                    className={`px-4 py-1 text-[14px] rounded-full w-[127px] h-[29px] flex items-center justify-center bg-[#E5E7EB] text-black`}
                  >
                    {status}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="w-[113px] h-[37px] bg-[#0056B3] text-white text-[14px] font-bold rounded flex items-center justify-center"
                      onClick={handleAdjust}
                    >
                      Điều chỉnh
                    </button>
                    {!isPaid && (
                      <button
                        className="w-[113px] h-[37px] bg-red-500 text-white text-[14px] font-bold rounded flex items-center justify-center"
                        onClick={handlePayment}
                      >
                        Thanh toán
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;