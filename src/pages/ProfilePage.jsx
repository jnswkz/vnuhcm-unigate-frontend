import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/HeaderDangNhap'; 

const ProfilePage = () => {
  const user = {
    name: "Nguyen Van A",
    email: "nguyenvana@student.edu.vn",
    phone: "0912345678",
  };

  // Dữ liệu thông tin cá nhân (mẫu)
  const [profileData, setProfileData] = useState({
    cccd: "CCCD",
    fullName: "Trương THPT",
    gender: "Nam",
    dob: "01/01/2000",
    ethnicity: "Kinh",
    permanentAddress: "",
    contactAddress: "",
    province: "TP. Hồ Chí Minh",
    school: "THPT Nguyễn Thị Minh Khai",
    email: "thptnguyenthiminhkhai@example.com",
    phone: "0123456789",
    priorityArea: "", 
    priorityObject: "",
  });

  // Quản lý trạng thái chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);

  // Quản lý trạng thái ảnh
  const [images, setImages] = useState({
    cccdFront: null,
    cccdBack: null,
    priorityProof: null,
  });

  // Quản lý trạng thái duyệt ảnh
  const [approved, setApproved] = useState({
    cccdFront: true,
    cccdBack: true,
    priorityProof: true,
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý tải ảnh
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [type]: imageUrl }));
      setApproved((prev) => ({ ...prev, [type]: true })); // Giả lập duyệt
    }
  };

  // Xử lý lưu thông tin
  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    console.log("Thông tin đã lưu:", tempData);
    // Thêm logic gọi API nếu cần
  };

  // Xử lý hủy chỉnh sửa
  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  // Hàm đăng xuất (giả lập)
  const handleLogout = () => {
    console.log("Đăng xuất");
    // Thêm logic đăng xuất nếu cần
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
     
      {/* Profile Content */}
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-start">
          {/* Title and Edit/Save/Cancel Buttons */}
          <div className="flex items-center">
            <h1 className="text-[#0056B3] text-4xl font-bold font-roboto">Thông tin cá nhân</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="ml-6 w-[120px] h-10 bg-[#0056B3] text-white text-lg font-bold font-roboto rounded-lg hover:bg-[#004a99] transition-colors"
              >
                Chỉnh sửa
              </button>
            ) : (
              <div className="flex space-x-4 ml-6">
                <button
                  onClick={handleSave}
                  className="w-[120px] h-10 bg-[#0056B3] text-white text-lg font-bold font-roboto rounded-lg hover:bg-[#004a99] transition-colors"
                >
                  Lưu
                </button>
                <button
                  onClick={handleCancel}
                  className="w-[120px] h-10 bg-[#EBF5FF] text-[#0056B3] text-lg font-bold font-roboto rounded-lg hover:bg-[#d9eaff] transition-colors"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-10 grid grid-cols-2 gap-8">
          {/* Left Column - Personal Info */}
          <div>
            <div className="mb-6">
              <label className="block text-[#6B7280] text-[16px] font-bold font-roboto mb-2">
                CCCD
              </label>
              <div className="w-[544px] h-12 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg flex items-center px-4">
                {profileData.cccd ? <span className="text-[#6B7280] font-roboto">{profileData.cccd}</span> : null}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Họ và tên
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={tempData.fullName}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                />
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.fullName}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Giới tính
              </label>
              {isEditing ? (
                <select
                  name="gender"
                  value={tempData.gender}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.gender}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Ngày sinh
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={tempData.dob}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                />
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.dob}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Dân tộc
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="ethnicity"
                  value={tempData.ethnicity}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                />
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.ethnicity}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Địa chỉ thường trú
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="permanentAddress"
                  value={tempData.permanentAddress}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                />
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.permanentAddress}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Địa chỉ liên lạc
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="contactAddress"
                  value={tempData.contactAddress}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                />
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.contactAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - School and Priority Info */}
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Tỉnh/thành phố của Trường THPT
              </label>
              {isEditing ? (
                <select
                  name="province"
                  value={tempData.province}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  {/* Thêm các tỉnh/thành khác nếu cần */}
                </select>
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.province}</span>
                  <span className="ml-auto text-gray-500">▼</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Trường THPT
              </label>
              {isEditing ? (
                <select
                  name="school"
                  value={tempData.school}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                >
                  <option value="THPT Nguyễn Thị Minh Khai">THPT Nguyễn Thị Minh Khai</option>
                  {/* Thêm các trường khác nếu cần */}
                </select>
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.school}</span>
                  <span className="ml-auto text-gray-500">▼</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                />
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.email}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Số điện thoại
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={tempData.phone}
                  onChange={handleChange}
                  className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-roboto"
                />
              ) : (
                <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                  <span className="text-gray-700 font-roboto">{profileData.phone}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Khu vực ưu tiên
              </label>
              <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                {profileData.priorityArea ? <span className="text-gray-700 font-roboto">{profileData.priorityArea}</span> : null}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Đối tượng ưu tiên
              </label>
              <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                {profileData.priorityObject ? <span className="text-gray-700 font-roboto">{profileData.priorityObject}</span> : null}
              </div>
            </div>
            <div className="mb-6 bg-[#F9FAFB] p-4 rounded-lg">
              <div className="flex items-start mb-2">
                <div className="w-4 h-4 bg-[#0056B3] rounded-full mr-2 mt-1"></div>
                <p className="text-[#6B7280] text-[14px] font-roboto">
                  Để cập nhật thông tin Đối tượng ưu tiên, thí sinh vui lòng đăng tải ảnh của giấy xác nhận đối tượng liên quan.
                </p>
              </div>
              {isEditing ? (
                <label className="block">
                  <span className="inline-block w-[93px] h-10 bg-[#0056B3] text-white text-[16px] font-bold font-roboto rounded-lg flex hover:bg-[#004a99] transition-colors cursor-pointer">
                      Đăng tải
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'priorityProof')}
                    className="hidden"
                  />
                </label>
              ) : (
                approved.priorityProof && (
                  <div className="flex items-center mt-2">
                    <span className="text-[#10B981] text-[16px] font-roboto flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Đã duyệt
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-10 grid grid-cols-3 gap-8">
          <div>
            <label className="block">
              <img
                src={images.cccdFront || "https://placehold.co/300x200"}
                alt="CCCD mặt trước"
                className="w-[300px] h-[200px] rounded-lg object-cover"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'cccdFront')}
                  className="hidden"
                />
              )}
              {isEditing ? (
                <button
                  onClick={(e) => document.querySelector('input[type="file"]').click()}
                  className="mt-2 w-[93px] h-10 bg-[#0056B3] text-white text-[16px] font-bold font-roboto rounded-lg flex items-center justify-center hover:bg-[#004a99] transition-colors"
                >
                  Đăng tải
                </button>
              ) : approved.cccdFront && images.cccdFront && (
                <p className="mt-2 flex items-center text-[#10B981] text-[14px] font-roboto">
                  <span className="mr-1">✔</span> Đã duyệt
                </p>
              )}
            </label>
            <p className="mt-2 text-[#6B7280] text-[16px] font-medium font-roboto">CCCD mặt trước</p>
          </div>
          <div>
            <label className="block">
              <img
                src={images.cccdBack || "https://placehold.co/300x200"}
                alt="CCCD mặt sau"
                className="w-[300px] h-[200px] rounded-lg object-cover"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'cccdBack')}
                  className="hidden"
                />
              )}
              {isEditing ? (
                <button
                  onClick={(e) => document.querySelectorAll('input[type="file"]')[1].click()}
                  className="mt-2 w-[93px] h-10 bg-[#0056B3] text-white text-[16px] font-bold font-roboto rounded-lg flex items-center justify-center hover:bg-[#004a99] transition-colors"
                >
                  Đăng tải
                </button>
              ) : approved.cccdBack && images.cccdBack && (
                <p className="mt-2 flex items-center text-[#10B981] text-[14px] font-roboto">
                  <span className="mr-1">✔</span> Đã duyệt
                </p>
              )}
            </label>
            <p className="mt-2 text-[#6B7280] text-[16px] font-medium font-roboto">CCCD mặt sau</p>
          </div>
          <div>
            <label className="block">
              <img
                src={images.priorityProof || "https://placehold.co/300x200"}
                alt="Minh chứng đối tượng ưu tiên"
                className="w-[300px] h-[200px] rounded-lg object-cover"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'priorityProof')}
                  className="hidden"
                />
              )}
              {isEditing ? (
                <button
                  onClick={(e) => document.querySelectorAll('input[type="file"]')[2].click()}
                  className="mt-2 w-[93px] h-10 bg-[#0056B3] text-white text-[16px] font-bold font-roboto rounded-lg flex items-center justify-center hover:bg-[#004a99] transition-colors"
                >
                  Đăng tải
                </button>
              ) : approved.priorityProof && images.priorityProof && (
                <p className="mt-2 flex items-center text-[#10B981] text-[14px] font-roboto">
                  <span className="mr-1">✔</span> Đã duyệt
                </p>
              )}
            </label>
            <p className="mt-2 text-[#6B7280] text-[16px] font-medium font-roboto">
              Minh chứng <br />Đối tượng ưu tiên
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;