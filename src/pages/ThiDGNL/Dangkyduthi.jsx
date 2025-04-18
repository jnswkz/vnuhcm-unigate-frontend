import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExamRegistrationForm = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isPaid, setIsPaid] = useState(false);
  const [formData, setFormData] = useState({
    profileCode: '',
    examLocation: 'khanh-hoa',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    setIsPaid(true);
    toast.success('Thanh toán thành công!', { position: 'top-right', autoClose: 3000 });
  };

  const validateForm = () => {
    if (!formData.profileCode) {
      toast.error('Vui lòng nhập mã hồ sơ dự thi.', { position: 'top-right', autoClose: 3000 });
      return false;
    }
    if (!/^[A-Z0-9]{6,10}$/.test(formData.profileCode)) {
      toast.error('Mã hồ sơ phải là 6-10 ký tự chữ hoặc số.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const registrationData = {
      examId: examId,
      title: state?.title || `Kỳ thi ĐGNL lần: ${examId}`,
      date: state?.date,
      profileCode: formData.profileCode,
      examLocation: formData.examLocation,
      isPaid: isPaid,
      status: 'Sắp diễn ra',
    };

    // Lưu dữ liệu đăng ký vào localStorage
    const registeredExams = JSON.parse(localStorage.getItem('registeredExams')) || [];
    const existingIndex = registeredExams.findIndex((exam) => exam.examId === examId);
    if (existingIndex >= 0) {
      registeredExams[existingIndex] = registrationData;
    } else {
      registeredExams.push(registrationData);
    }
    localStorage.setItem('registeredExams', JSON.stringify(registeredExams));

    toast.success('Thông tin đăng ký đã được gửi.', {
      position: 'top-right',
      autoClose: 1000,
      onClose: () =>
        navigate('/sau-khi-xac-nhan', { state: { registrationData } }),
    });
  };

  const handleClose = () => {
    toast.info('Đóng giao diện đăng ký.', {
      position: 'top-right',
      autoClose: 1000,
      onClose: () => navigate('/thi-dgnl'),
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-black text-xl font-bold font-roboto leading-[30px] mb-4">
          Đăng ký dự thi - {state?.title || `Kỳ thi ĐGNL lần: ${examId}`}
        </h2>

        <div className="flex flex-col space-y-2 mb-4">
          <label className="text-black text-sm font-bold font-roboto leading-[21px]">
            Mã hồ sơ dự thi
          </label>
          <input
            type="text"
            name="profileCode"
            aria-label="Mã hồ sơ dự thi"
            className="w-full h-[42px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-md px-4"
            placeholder="Nhập mã hồ sơ"
            value={formData.profileCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          <label className="text-black text-sm font-bold font-roboto leading-[21px]">
            Địa điểm dự thi
          </label>
          <select
            name="examLocation"
            aria-label="Địa điểm dự thi"
            className="w-full h-[42px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-md px-4"
            value={formData.examLocation}
            onChange={handleInputChange}
          >
            <option value="khanh-hoa">Khánh Hòa</option>
            <option value="ho-chi-minh">Hồ Chí Minh</option>
            <option value="ha-noi">Hà Nội</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          <label className="text-black text-sm font-bold font-roboto leading-[21px]">
            Lệ phí thi
          </label>
          <div className="w-full h-[42px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-md flex items-center justify-center">
            <span className="text-black text-base font-normal font-roboto">
              300,000 đồng
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          <label className="text-black text-sm font-bold font-roboto leading-[21px]">
            Tình trạng thanh toán
          </label>
          <div className="w-full h-[42px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-md flex items-center justify-center">
            <span className="text-black text-base font-normal font-roboto">
              {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            className="w-full sm:w-[128px] h-[42px] bg-[#0056B3] text-white text-base font-bold font-roboto rounded-md"
            onClick={handlePayment}
          >
            Thanh toán
          </button>
          <button
            className="w-full sm:w-[114px] h-[42px] bg-[#0056B3] text-white text-base font-bold font-roboto rounded-md"
            onClick={handleSubmit}
          >
            Xác nhận
          </button>
          <button
            className="w-full sm:w-[88px] h-[42px] border border-[#E5E7EB] text-black text-base font-normal font-roboto rounded-md"
            onClick={handleClose}
          >
            Đóng
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExamRegistrationForm;