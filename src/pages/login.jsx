import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function LoginForm() {
  // State để lưu dữ liệu form
  const [formData, setFormData] = useState({
    cccd: '', // Thay email bằng cccd
    password: '',
  });

  // State để kiểm soát hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // State để hiển thị thông báo lỗi
  const [errors, setErrors] = useState({});

  // State để kiểm soát khi form được submit
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Xóa lỗi của trường vừa được cập nhật nếu form đã được submit trước đó
    if (formSubmitted) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Hàm xác thực form
  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra CCCD
    if (!formData.cccd) {
      newErrors.cccd = "Vui lòng nhập số CCCD";
    } else if (!/^\d{12}$/.test(formData.cccd)) {
      newErrors.cccd = "Số CCCD phải gồm 12 chữ số và không chứa chữ cái";
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (/[ăâơôđ]/i.test(formData.password)) {
      newErrors.password = "Mật khẩu không được chứa các ký tự ă, â, ơ, ô, đ";
    }

    return newErrors;
  };

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // Xử lý đăng nhập thành công
      alert('Đăng nhập thành công!');
      console.log('Form data submitted:', formData);
      // Reset form sau khi đăng nhập thành công
      setFormData({
        cccd: '',
        password: '',
      });
      setFormSubmitted(false);
      // Ở đây bạn có thể gửi API request đến server
    } else {
      setErrors(validationErrors);
    }
  };

  // Quyết định class cho input fields
  const getInputClassName = (fieldName) => {
    return `w-full p-3 rounded ${
      errors[fieldName]
        ? 'border-2 border-red-500 bg-red-50 text-red-700'
        : 'border border-gray-300 bg-white text-gray-800'
    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#0056B3] text-white px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg">VNUHCM - UNIGATE</div>
        <div className="font-bold text-lg flex-grow text-center">ĐĂNG NHẬP TÀI KHOẢN</div>
        <div>
          <Link to="/register" className="text-white hover:underline">
            Chưa có tài khoản? Đăng ký
          </Link>
        </div>
      </header>

      {/* Form Container */}
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto my-6 bg-blue-50 p-8 rounded shadow-md w-full">
          <form onSubmit={handleSubmit}>
            {/* CCCD */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Số CCCD</label>
              <div className="flex-grow">
                <input
                  type="text"
                  name="cccd"
                  className={getInputClassName('cccd')}
                  placeholder="Nhập số CCCD"
                  value={formData.cccd}
                  onChange={handleChange}
                />
                {errors.cccd && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.cccd}</p>
                )}
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Mật khẩu</label>
              <div className="flex-grow flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={getInputClassName("password")}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="ml-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🔒" : "👁️"}
                </button>
              </div>
            </div>

            {/* Quên mật khẩu */}
            <div className="mb-4 flex justify-end">
              <a href="#" className="text-blue-700 hover:underline font-medium">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#0056B3] text-white py-3 px-8 rounded font-bold hover:bg-blue-800 w-48 transition duration-300 shadow-md hover:shadow-lg"
              >
                ĐĂNG NHẬP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}