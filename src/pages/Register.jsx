import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function RegistrationForm() {
  // State để lưu dữ liệu form
  const [formData, setFormData] = useState({
    cccd: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // State để kiểm soát hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State cho checkbox
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [notRobot, setNotRobot] = useState(false);

  // State để hiển thị thông báo lỗi
  const [errors, setErrors] = useState({});
  
  // State để kiểm soát khi form được submit
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Xóa lỗi của trường vừa được cập nhật nếu form đã được submit trước đó
    if (formSubmitted) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Hàm xử lý thay đổi checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'agreeTerms') {
      setAgreeTerms(checked);
      if (formSubmitted && checked) {
        setErrors(prev => ({
          ...prev,
          agreeTerms: ''
        }));
      }
    } else if (name === 'notRobot') {
      setNotRobot(checked);
      if (formSubmitted && checked) {
        setErrors(prev => ({
          ...prev,
          notRobot: ''
        }));
      }
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

    // Kiểm tra họ và tên
    if (!formData.fullName) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    // Kiểm tra email
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Kiểm tra số điện thoại
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải gồm 10 chữ số";
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (/[ăâêôơưđáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(formData.password)) {
      newErrors.password = "Mật khẩu không được chứa các ký tự tiếng Việt có dấu";
    }

    // Kiểm tra xác nhận mật khẩu
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    // Kiểm tra checkbox điều khoản
    if (!agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng";
    }

    // Kiểm tra checkbox không phải robot
    if (!notRobot) {
      newErrors.notRobot = "Vui lòng xác nhận bạn không phải là robot";
    }

    return newErrors;
  };

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // Xử lý đăng ký thành công
      alert('Đăng ký thành công!');
      console.log('Form data submitted:', formData);
      // Reset form sau khi đăng ký thành công
      setFormData({
        cccd: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      setAgreeTerms(false);
      setNotRobot(false);
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
      <header className="bg-[#0056B3] text-white px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg">VNUHCM - UNIGATE</div>
        <div className="font-bold text-lg flex-grow text-center">ĐĂNG KÍ TÀI KHOẢN</div>
        <div>
          <Link to="/" className="text-white hover:underline">
            Đã có tài khoản? Đăng nhập
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
                {errors.cccd && <p className="text-red-500 text-sm mt-1 font-medium">{errors.cccd}</p>}
              </div>
            </div>

            {/* Họ và tên */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Họ và tên</label>
              <div className="flex-grow">
                <input
                  type="text"
                  name="fullName"
                  className={getInputClassName('fullName')}
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1 font-medium">{errors.fullName}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Email</label>
              <div className="flex-grow">
                <input
                  type="email"
                  name="email"
                  className={getInputClassName('email')}
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>}
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Số điện thoại</label>
              <div className="flex-grow">
                <input
                  type="tel"
                  name="phone"
                  className={getInputClassName('phone')}
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-medium">{errors.phone}</p>}
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Mật khẩu</label>
              <div className="flex-grow relative flex items-center">
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

            {/* Xác nhận mật khẩu */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Xác nhận mật khẩu</label>
              <div className="flex-grow relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={getInputClassName("confirmPassword")}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="ml-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🔒" : "👁️"}
                </button>
              </div>
            </div>

            {/* Checkbox Điều khoản */}
            <div className="mb-1 ml-32 flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                className={`mr-2 h-5 w-5 rounded border ${errors.agreeTerms ? 'border-2 border-red-500' : 'border-gray-300'}`}
                checked={agreeTerms}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="agreeTerms" className="text-gray-800">
                Tôi đồng ý với{' '}
                <a href="#" className="text-blue-700 hover:underline font-medium">Điều khoản sử dụng</a>{' '}
                và{' '}
                <a href="#" className="text-blue-700 hover:underline font-medium">Chính sách bảo mật</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm ml-32 mb-4 font-medium">{errors.agreeTerms}</p>}

            {/* Checkbox Not Robot */}
            <div className="mb-1 ml-32 flex items-center">
              <input
                type="checkbox"
                id="notRobot"
                name="notRobot"
                className={`mr-2 h-5 w-5 rounded border ${errors.notRobot ? 'border-2 border-red-500' : 'border-gray-300'}`}
                checked={notRobot}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="notRobot" className="text-gray-800">Tôi không phải là robot</label>
            </div>
            {errors.notRobot && <p className="text-red-500 text-sm ml-32 mb-4 font-medium">{errors.notRobot}</p>}

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#0056B3] text-white py-3 px-8 rounded font-bold hover:bg-blue-800 w-48 transition duration-300 shadow-md hover:shadow-lg"
              >
                ĐĂNG KÍ
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer - Updated */}
      <footer className="bg-[#0056B3] text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Cột 1: Về chúng tôi */}
            <div>
              <h3 className="font-bold text-lg mb-3">Về chúng tôi</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-white hover:underline">Giới thiệu</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Các trường thành viên</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Tin tức & Sự kiện</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Liên hệ</a></li>
              </ul>
            </div>

            {/* Cột 2: Kì thi ĐGNL */}
            <div>
              <h3 className="font-bold text-lg mb-3">Kì thi ĐGNL</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-white hover:underline">Thông tin kỳ thi</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Lịch thi</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Cấu trúc đề thi</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Quy chế thi</a></li>
              </ul>
            </div>

            {/* Cột 3: Xét tuyển */}
            <div>
              <h3 className="font-bold text-lg mb-3">Xét tuyển</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-white hover:underline">Quy chế xét tuyển</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Chỉ tiêu tuyển sinh</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Điểm chuẩn tham khảo</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Hướng dẫn đăng ký</a></li>
              </ul>
            </div>

            {/* Cột 4: Tài nguyên */}
            <div>
              <h3 className="font-bold text-lg mb-3">Tài nguyên</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-white hover:underline">Thư viện số</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Bài thi thử</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Diễn đàn học tập</a></li>
                <li><a href="#" className="text-sm text-white hover:underline">Hỏi đáp thường gặp</a></li>
              </ul>
            </div>

            {/* Cột 5: Kết nối với chúng tôi */}
            <div>
              <h3 className="font-bold text-lg mb-3">Kết nối với chúng tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400">
                  <i className="fab fa-facebook-f text-[#0056B3]"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400">
                  <i className="fab fa-twitter text-[#0056B3]"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Dòng bản quyền */}
          <div className="border-t border-blue-400 mt-6 pt-6 text-center text-sm text-white">
            © 2025 VNUHCM-UNIGATE | Cổng thông tin tuyển sinh thông minh ĐHQG TP.HCM | Đăng ký bản quyền.
          </div>
        </div>
      </footer>
    </div>
  );
}