import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của Toastify
import Footer from "../components/Footer"; // Import Footer component
import api from "../api/axios"; 

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    cccd: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (formSubmitted) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cccd) {
      newErrors.cccd = "Vui lòng nhập số CCCD";
    } else if (!/^\d{12}$/.test(formData.cccd)) {
      newErrors.cccd = "Số CCCD phải gồm 12 chữ số và không chứa chữ cái";
    }

    if (!formData.fullName) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải gồm 10 chữ số";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (/[ăâêôơưđáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(formData.password)) {
      newErrors.password = "Mật khẩu không được chứa các ký tự tiếng Việt có dấu";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng";
    }

    if (!notRobot) {
      newErrors.notRobot = "Vui lòng xác nhận bạn không phải là robot";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await api.post("/api/register", {
          cccd: formData.cccd,
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phone,
          password: formData.password
        });

        toast.success('Đăng ký thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Reset form
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

      } catch (error) {
        const errorMsg = error.response?.data?.detail || 'Có lỗi xảy ra khi đăng ký.';
        toast.error(errorMsg, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      setErrors(validationErrors);
      toast.error('Vui lòng kiểm tra lại thông tin!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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
              <div className="flex-grow flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={getInputClassName("password")}
                  placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
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
              {errors.password && <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Xác nhận mật khẩu</label>
              <div className="flex-grow flex items-center">
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
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 font-medium">{errors.confirmPassword}</p>}
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
      <ToastContainer />
    </div>
  );
}