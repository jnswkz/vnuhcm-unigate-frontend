import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../HeaderDangNhap';

const ChangePasswordPage = () => {
  const user = {
    name: "Nguyen Van A",
    email: "nguyenvana@student.edu.vn",
    phone: "0912345678",
  };

  // Quản lý trạng thái form
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Quản lý trạng thái hiển thị/ẩn mật khẩu
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!formData.currentPassword) {
      setErrorMessage("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }

    if (!formData.newPassword) {
      setErrorMessage("Vui lòng nhập mật khẩu mới.");
      return;
    }

    // Kiểm tra mật khẩu không chứa các ký tự tiếng Việt có dấu
    if (/[ăâêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵđ]/i.test(formData.newPassword)) {
      setErrorMessage("Mật khẩu không được chứa các ký tự tiếng Việt có dấu.");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (formData.newPassword.length < 8) {
      setErrorMessage("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau không
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    // Nếu không có lỗi, xóa thông báo lỗi và xử lý logic đổi mật khẩu
    setErrorMessage('');
    console.log("Dữ liệu form:", formData);

    // Thêm logic gọi API đổi mật khẩu
    alert("Đổi mật khẩu thành công!");
  };

  // Xử lý đăng xuất (giả lập)
  const handleLogout = () => {
    console.log("Đăng xuất");
    // Thêm logic đăng xuất nếu cần
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">

      {/* Change Password Form */}
      <div className="flex justify-center items-center min-h-[calc(100vh-83px)]">
        <div className="w-[500px] bg-white rounded-lg border border-gray-200 shadow-lg p-8">
          <h1 className="text-[#0056B3] text-4xl font-bold font-roboto mb-10">Đổi mật khẩu</h1>

          <form onSubmit={handleSubmit}>
            {/* Hiển thị thông báo lỗi */}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm font-medium">{errorMessage}</div>
            )}

            {/* Mật khẩu hiện tại */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium font-roboto mb-2">
                Mật khẩu hiện tại
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full h-[50px] px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showCurrentPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Mật khẩu mới */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium font-roboto mb-2">
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full h-[50px] px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div className="mb-12">
              <label className="block text-gray-700 text-sm font-medium font-roboto mb-2">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full h-[50px] px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-[142px] h-12 bg-[#0056B3] text-white text-lg font-bold font-roboto rounded-lg hover:bg-[#004a99] transition-colors"
              >
                Đổi mật khẩu
              </button>
              <Link
                to="/profile"
                className="w-[76px] h-12 bg-[#EBF5FF] text-[#0056B3] text-lg font-bold font-roboto rounded-lg flex items-center justify-center hover:bg-[#d9eaff] transition-colors"
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;