import React, { useState } from 'react';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';
export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.subject) {
      newErrors.subject = 'Vui lòng nhập chủ đề';
    }

    if (!formData.message) {
      newErrors.message = 'Vui lòng nhập nội dung';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data submitted:', formData);
      alert('Gửi tin nhắn thành công!');
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const getInputClassName = (fieldName) => {
    return `w-full p-3 rounded border ${
      errors[fieldName]
        ? 'border-red-500 bg-red-50 text-red-700'
        : 'border-gray-300 bg-white text-gray-800'
    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-8 bg-blue-50 rounded shadow-md">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Liên hệ với chúng tôi</h1>

      {/* Thông tin liên hệ - Chia 2 cột */}
      <div className="bg-white p-6 rounded shadow-md mb-6 flex flex-col md:flex-row">
        {/* Cột 1: Thông tin liên hệ */}
        <div className="flex-1 mb-4 md:mb-0 md:pr-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin liên hệ</h2>
          <p className="text-gray-600 mb-4">
            Liên hệ trực tiếp với chúng tôi qua các kênh sau:
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 font-medium flex items-center">
                <span className="mr-2">📧</span> Email:
              </p>
              <p className="text-gray-600">support@vnuhcm.unigate.vn</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium flex items-center">
                <span className="mr-2">📞</span> Hotline:
              </p>
              <p className="text-gray-600">(028) 3835 4266</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium flex items-center">
                <span className="mr-2">📍</span> Địa chỉ:
              </p>
              <p className="text-gray-600">
                Phòng 105, Nhà điều hành ĐHQG-HCM, Phường Linh Trung, Thành phố Thủ Đức, TP.HCM
              </p>
            </div>
          </div>
        </div>

        {/* Cột 2: Giờ làm việc */}
        <div className="flex-1 md:pl-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Giờ làm việc</h2>
          <div>
            <p className="text-gray-600">
              Thứ Hai - Thứ Sáu 8:00 - 17:00 <br />
              Thứ Bảy, Chủ Nhật: Nghỉ
            </p>
          </div>
        </div>
      </div>

      {/* Form liên hệ */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Họ và tên</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              className={getInputClassName('fullName')}
              placeholder="Nhập họ và tên của bạn"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              className={getInputClassName('email')}
              placeholder="Nhập địa chỉ email của bạn"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="subject"
              className={getInputClassName('subject')}
              placeholder="Nhập chủ đề"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              name="message"
              className={getInputClassName('message')}
              placeholder="Nhập nội dung"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-[#0056B3] text-white py-2 px-6 rounded font-medium hover:bg-[#004494] transition-colors"
            >
              Gửi tin nhắn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}