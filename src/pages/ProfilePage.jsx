import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/HeaderDangNhap'; 
import { useAuth } from "../components/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return <div>Đang tải...</div>;
  // console.log("1");
  // console.log(user);

  const schoolByProvince = {
    "An Giang": [
    "THPT Chuyên Thoại Ngọc Hầu",
    "THPT Nguyễn Quang Diêu",
    "THPT Long Xuyên",
    "THPT Nguyễn Hiền",
    "THPT Châu Phú",
    "THPT Tân Châu",
    "THPT Bình Khánh",
    "THPT Vĩnh Nguơn",
    "THPT Thoại Ngọc Hầu",
    "THPT Nguyễn Trung Trực",
    "THPT Tịnh Biên",
    "THPT An Phú",
    "THPT Lương Thế Vinh",
    "THPT Thủ Khoa Nghĩa",
    "THPT Tri Tôn"
  ],
  "Bà Rịa - Vũng Tàu": [
    "THPT Chuyên Lê Quý Đôn",
    "THPT Vũng Tàu",
    "THPT Nguyễn Huệ",
    "THPT Trần Nguyên Hãn",
    "THPT Bà Rịa",
    "THPT Nguyễn Thị Minh Khai",
    "THPT Châu Thành",
    "THPT Long Hải",
    "THPT Đất Đỏ",
    "THPT Phú Mỹ",
    "THPT Xuyên Mộc",
    "THPT Minh Đạm",
    "THPT Nguyễn Trãi",
    "THPT Tân Hải",
    "THPT Hòa Hội"
  ],
  "Bắc Giang": [
    "THPT Chuyên Bắc Giang",
    "THPT Lục Ngạn Số 1",
    "THPT Lạng Giang Số 1",
    "THPT Yên Dũng Số 1",
    "THPT Việt Yên Số 1",
    "THPT Hiệp Hòa Số 1",
    "THPT Tân Yên Số 1",
    "THPT Lục Nam",
    "THPT Sơn Động Số 1",
    "THPT Bắc Giang",
    "THPT Ngô Sĩ Liên",
    "THPT Thái Thuận",
    "THPT Bích Động",
    "THPT Tăng Tiến",
    "THPT Đồi Ngô"
  ],
  "Bắc Kạn": [
    "THPT Chuyên Bắc Kạn",
    "THPT Bắc Kạn",
    "THPT Ba Bể",
    "THPT Chợ Đồn",
    "THPT Nà Phặc",
    "THPT Bạch Thông",
    "THPT Ngân Sơn",
    "THPT Chợ Mới",
    "THPT Bình Trung",
    "THPT Yến Lạc",
    "THPT Pác Nặm",
    "THPT Quảng Khê",
    "THPT Nông Thượng",
    "THPT Vân Tùng",
    "THPT Côn Minh"
  ],
  "Bạc Liêu": [
    "THPT Chuyên Bạc Liêu",
    "THPT Bạc Liêu",
    "THPT Nguyễn Trung Trực",
    "THPT Giá Rai",
    "THPT Võ Văn Kiệt",
    "THPT Ngan Dừa",
    "THPT Hiệp Thành",
    "THPT Ninh Thạnh Lợi",
    "THPT Phước Long",
    "THPT Vĩnh Mỹ",
    "THPT Hồng Dân",
    "THPT Định Thành",
    "THPT Lê Thị Riêng",
    "Phổ thông Dân tộc Nội trú tỉnh Bạc Liêu",
    "THCS&THPT Trần Văn Lắm"
  ],
  "Bắc Ninh": [
    "THPT Chuyên Bắc Ninh",
    "THPT Hàn Thuyên",
    "THPT Gia Bình Số 1",
    "THPT Thuận Thành Số 1",
    "THPT Quế Võ Số 1",
    "THPT Yên Phong Số 1",
    "THPT Lương Tài",
    "THPT Tiên Du Số 1",
    "THPT Lý Thường Kiệt",
    "THPT Nguyễn Đăng Đạo",
    "THPT Thuận Thành Số 2",
    "THPT Quế Võ Số 2",
    "THPT Yên Phong Số 2",
    "THPT Gia Bình Số 2",
    "THPT Từ Sơn"
  ],
  "Bến Tre": [
    "THPT Chuyên Bến Tre",
    "THPT Nguyễn Đình Chiểu",
    "THPT Châu Thành",
    "THPT Ba Tri",
    "THPT Mỏ Cày",
    "THPT Giồng Trôm",
    "THPT Chợ Lách",
    "THPT Thạnh Phú",
    "THPT Lê Quý Đôn",
    "THPT Nguyễn Thị Minh Khai",
    "THPT Lương Thế Vinh",
    "THPT Phan Thanh Giản",
    "THPT Bùi Hữu Nghĩa",
    "THPT Võ Trường Toản",
    "THPT An Phước"
  ],
  "Bình Định": [
    "THPT Chuyên Lê Quý Đôn",
    "THPT Quốc Học Quy Nhơn",
    "THPT Nguyễn Trường Tộ",
    "THPT Trưng Vương",
    "THPT Nguyễn Thái Học",
    "THPT An Nhơn 1",
    "THPT Tây Sơn",
    "THPT Nguyễn Huệ",
    "THPT Quy Nhơn",
    "THPT Hoài Ân",
    "THPT Vĩnh Thạnh",
    "THPT Phù Cát Số 1",
    "THPT Phù Mỹ",
    "THPT Vân Canh",
    "THPT An Lão"
  ],
  "Bình Dương": [
    "THPT Chuyên Hùng Vương",
    "THPT Nguyễn Trãi",
    "THPT Trịnh Hoài Đức",
    "THPT Võ Minh Đức",
    "THPT Dĩ An",
    "THPT Bùi Thị Xuân",
    "THPT Nguyễn An Ninh",
    "THPT Tân Phước Khánh",
    "THPT Nguyễn Đình Chiểu",
    "THPT Bình Phú",
    "THPT An Mỹ",
    "THPT Thuận Giao",
    "THPT Lý Thường Kiệt",
    "THPT Phước Vĩnh",
    "THPT Phú Long"
  ],
  "Bình Phước": [
    "THPT Chuyên Quang Trung",
    "THPT Bình Long",
    "THPT Đồng Xoài",
    "THPT Chơn Thành",
    "THPT Lộc Ninh",
    "THPT Phước Bình",
    "THPT Hớn Quản",
    "THPT Đồng Phú",
    "THPT Bù Đăng",
    "THPT Bù Gia Mập",
    "THPT Nguyễn Du",
    "THPT Thanh Hòa",
    "THPT Đắk Ơ",
    "THPT Thống Nhất",
    "THPT Minh Hóa"
  ],
  "Bình Thuận": [
    "THPT Chuyên Trần Hưng Đạo",
    "THPT Phan Bội Châu",
    "THPT Lý Thường Kiệt",
    "THPT Nguyễn Huệ",
    "THPT Hàm Thuận Bắc",
    "THPT Hàm Thuận Nam",
    "THPT Tánh Linh",
    "THPT Đức Linh",
    "THPT La Gi",
    "THPT Bắc Bình",
    "THPT Tuy Phong",
    "THPT Hàm Tân",
    "THPT Phú Quý",
    "THPT Võ Xu",
    "THPT Nguyễn Văn Trỗi"
  ],
    "Cà Mau": [
      "THPT Hồ Thị Kỷ",
      "THPT Tắc Vân",
      "THPT Cà Mau",
      "THPT Chuyên Phan Ngọc Hiển",
      "Phổ thông Dân tộc nội trú",
      "THPT Nguyễn Việt Khái",
      "Phổ thông Hermann Gmeiner",
      "THPT Thanh Bình Cà Mau",
      "THCS-THPT Lý Văn Lâm",
      "THPT Thới Bình",
      "THPT Lê Công Nhân",
      "THPT Nguyễn Văn Nguyễn",
      "THPT Tân Bằng",
      "THCS-THPT Tân Lộc",
      "THPT U Minh",
      "THPT Khánh Lâm",
      "THPT Khánh An",
      "THCS-THPT Khánh An",
      "THPT Trần Văn Thời",
      "THPT Huỳnh Phi Hùng",
      "THPT Khánh Hưng",
      "THPT Sông Đốc",
      "THPT Võ Thị Hồng",
      "THPT Cái Nước",
      "THPT Nguyễn Mai",
      "THPT Phú Hưng",
      "THPT Đầm Dơi",
      "THPT Thái Thanh Hoà",
      "THPT Tân Đức",
      "THPT Quách Văn Phẩm",
      "THCS-THPT Nguyễn Huân",
      "THPT Viên An",
      "THPT Ngọc Hiển",
      "THPT Phan Ngọc Hiển",
      "THPT Nguyễn Thị Minh Khai",
      "THPT Phú Tân",
      "THCS-THPT Vàm Đình"
    ],
    "Cần Thơ": [
    "THPT Châu Văn Liêm",
    "THPT Bùi Hữu Nghĩa",
    "THPT Nguyễn Việt Hồng",
    "THPT Thốt Nốt",
    "THPT Lý Tự Trọng",
    "THPT Trần Đại Nghĩa",
    "THPT Nguyễn Việt Dũng",
    "THPT Bình Thủy",
    "THPT Thới Lai",
    "THPT Thạnh An",
    "THPT Phan Văn Trị",
    "THPT An Khánh",
    "THPT Phan Ngọc Hiển",
    "THPT Thực Hành Sư Phạm",
    "THPT Lương Định Của"
  ],
  "Cao Bằng": [
    "THPT Chuyên Cao Bằng",
    "THPT Cao Bằng",
    "THPT Trà Lĩnh",
    "THPT Bảo Lạc",
    "THPT Thạch An",
    "THPT Nguyên Bình",
    "THPT Hòa An",
    "THPT Hạ Lang",
    "THPT Thông Nông",
    "THPT Trùng Khánh",
    "THPT Quảng Uyên",
    "THPT Phục Hòa",
    "THPT Đông Khê",
    "THPT Bảo Lâm",
    "THPT Hà Quảng"
  ],
  "Đà Nẵng": [
    "THPT Chuyên Lê Quý Đôn",
    "THPT Phan Châu Trinh",
    "THPT Hoàng Hoa Thám",
    "THPT Thái Phiên",
    "THPT Ngũ Hành Sơn",
    "THPT Nguyễn Trãi",
    "THPT Trần Phú",
    "THPT Tôn Thất Tùng",
    "THPT Hòa Vang",
    "THPT Cẩm Lệ",
    "THPT Ông Ích Khiêm",
    "THPT Nguyễn Hiền",
    "THPT Võ Chí Công",
    "THPT Phạm Phú Thứ",
    "THPT Liên Chiểu"
  ],
  "Đắk Lắk": [
    "THPT Chuyên Nguyễn Huệ",
    "THPT Buôn Ma Thuột",
    "THPT Lê Hữu Trác",
    "THPT Nguyễn Tất Thành",
    "THPT Hồng Đức",
    "THPT Trần Phú",
    "THPT Nguyễn Công Trứ",
    "THPT Ea H’leo",
    "THPT Krông Ana",
    "THPT Cư M’gar",
    "THPT Nguyễn Du",
    "THPT Lắk",
    "THPT Ea Súp",
    "THPT Buôn Đôn",
    "THPT Nguyễn Đình Chiểu"
  ],
    "Đắk Nông": [
      "THPT Chu Văn An",
      "Trung học phổ thông Dân tộc nội trú N Trang Lơng tỉnh Đắk Nông",
      "THPT Gia Nghĩa",
      "THPT Chuyên Nguyễn Chí Thanh",
      "THPT Phạm Văn Đồng",
      "THPT Nguyễn Tất Thành",
      "THPT Trường Chinh",
      "Phổ thông DTNT THCS-THPT huyện Đăk RLấp",
      "THPT Nguyễn Đình Chiểu",
      "THPT Đăk Mil",
      "THPT Trần Hưng Đạo",
      "THPT Quang Trung",
      "THPT Nguyễn Du",
      "Phổ thông DTNT THCS-THPT huyện Đăk Mil",
      "THPT Phan Chu Trinh",
      "THPT Phan Bội Châu",
      "THPT Nguyễn Bỉnh Khiêm",
      "THPT Đào Duy Từ",
      "Phổ thông DTNT THCS-THPT huyện Cư Jút",
      "THPT Đăk Song",
      "THPT Phan Đình Phùng",
      "Phổ thông DTNT THCS-THPT huyện Đăk Song",
      "THPT Lương Thế Vinh",
      "THPT Krông Nô",
      "THPT Hùng Vương",
      "THPT Trần Phú",
      "Phổ thông DTNT THCS-THPT huyện Krông Nô",
      "THPT Đăk Glong",
      "Phổ thông DTNT THCS-THPT huyện Đăk Glong",
      "THPT Lê Duẩn",
      "THPT Lê Quý Đôn",
      "Phổ thông DTNT THCS-THPT huyện Tuy Đức"
    ],
    "Điện Biên": [
      "THPT thành phố Điện Biên Phủ",
      "THPT Chuyên Lê Quý Đôn",
      "THPT Phan Đình Giót",
      "Phổ thông Dân tộc Nội Trú Tỉnh",
      "THPT Lương Thế Vinh",
      "THPT thị xã Mường Lay",
      "THPT huyện Điện Biên",
      "THPT Thanh Chăn",
      "THPT Mường Nhà",
      "THPT Nà Tấu",
      "THPT Thanh Nưa",
      "THPT Tuần Giáo",
      "THPT Mùn Chung",
      "THPT Quài Tở",
      "THPT Mường Chà",
      "THPT Tủa Chùa",
      "THCS và THPT Tả Sìn Thàng",
      "THCS và THPT Quyết Tiến",
      "THPT Trần Can",
      "THPT Mường Luân",
      "THPT Mường Nhé",
      "THPT Mường Ảng",
      "THPT Búng Lao",
      "THPT Chà Cang",
      "THPT Nậm Pồ"
    ],
    "Đồng Nai": [
    "THPT Chuyên Lương Thế Vinh",
    "THPT Ngô Quyền",
    "THPT Trịnh Hoài Đức",
    "THPT Thống Nhất",
    "THPT Long Khánh",
    "THPT Xuân Lộc",
    "THPT Long Thành",
    "THPT Tân Phú",
    "THPT Nguyễn Hữu Cảnh",
    "THPT Tam Phước",
    "THPT Định Quán",
    "THPT Lê Hồng Phong",
    "THPT Nguyễn Văn Trỗi",
    "THPT Cẩm Mỹ",
    "THPT Bình Sơn"
  ],
  "Đồng Tháp": [
    "THPT Chuyên Nguyễn Quang Diêu",
    "THPT Thiên Hộ Dương",
    "THPT Hồng Ngự",
    "THPT Lai Vung 1",
    "THPT Cao Lãnh 1",
    "THPT Cao Lãnh 2",
    "THPT Tháp Mười",
    "THPT Sa Đéc",
    "THPT Tam Nông",
    "THPT Thanh Bình 1",
    "THPT Tân Hồng",
    "THPT Lấp Vò 1",
    "THPT Châu Thành 1",
    "THPT Mỹ Quý",
    "THPT Trường Xuân"
  ],
  "Gia Lai": [
    "THPT Chuyên Hùng Vương",
    "THPT Pleiku",
    "THPT Lê Lợi",
    "THPT Nguyễn Chí Thanh",
    "THPT Trần Phú",
    "THPT An Khê",
    "THPT Ayun Pa",
    "THPT Ia Grai",
    "THPT Kbang",
    "THPT Mang Yang",
    "THPT Chư Sê",
    "THPT Đăk Pơ",
    "THPT Phú Thiện",
    "THPT Nguyễn Huệ",
    "THPT Chư Prông"
  ],
  "Hà Giang": [
    "THPT Chuyên Hà Giang",
    "THPT Hà Giang",
    "THPT Bắc Mê",
    "THPT Đồng Yên",
    "THPT Vị Xuyên",
    "THPT Yên Minh",
    "THPT Quản Bạ",
    "THPT Đồng Văn",
    "THPT Mèo Vạc",
    "THPT Hoàng Su Phì",
    "THPT Xín Mần",
    "THPT Quang Bình",
    "THPT Bắc Quang",
    "THPT Phố Ràng",
    "THPT Tân Trào"
  ],
  "Hà Nam": [
    "THPT Chuyên Biên Hòa",
    "THPT A Duy Tiên",
    "THPT Lý Nhân",
    "THPT Nam Cường",
    "THPT Bắc Lý",
    "THPT C Kim Bảng",
    "THPT Thanh Liêm",
    "THPT Bình Lục",
    "THPT A Phủ Lý",
    "THPT B Phủ Lý",
    "THPT Nguyễn Khuyến",
    "THPT Lê Hoàn",
    "THPT Nam Cao",
    "THPT Tống Văn Trân",
    "THPT Kiện Khê"
  ],
    "Hà Nội": [
      "THPT Nguyễn Trãi-Ba Đình",
      "THPT Phan Đình Phùng",
      "THPT Phạm Hồng Thái",
      "TH,THCS&THPT Thực nghiệm Khoa học Giáo dục",
      "THPT Hoàng Long",
      "THPT Trần Phú-Hoàn Kiếm",
      "THPT Việt Đức",
      "THPT Đinh Tiên Hoàng-Ba Đình",
      "THPT Đoàn Kết-Hai Bà Trưng",
      "THPT Thăng Long",
      "THPT Trần Nhân Tông",
      "THPT Đông Kinh",
      "THPT Hoàng Diệu",
      "THPT Hồng Hà",
      "THPT Mai Hắc Đế",
      "THCS và THPT Tạ Quang Bửu",
      "THPT Văn Hiến",
      "TH,THCS&THPT Vinschool",
      "THPT Hòa Bình-La Trobe-Hà Nội",
      "THPT Đống Đa",
      "THPT Hoàng Cầu",
      "THPT Kim Liên",
      "THPT Lê Quý Đôn-Đống Đa",
      "THPT Phan Huy Chú-Đống Đa",
      "THPT Quang Trung-Đống Đa",
      "THCS&THPT Alfred Nobel",
      "THPT Bắc Hà-Đống Đa",
      "THPT Hà Nội",
      "THPT Nguyễn Du-Mê Linh",
      "THPT Nguyễn Văn Huyên",
      "THPT Phùng Khắc Khoan",
      "THPT Văn Lang",
      "THCS&THPT TH School",
      "THPT Chu Văn An",
      "THPT Tây Hồ",
      "THPT Đông Đô",
      "THPT Hà Nội Academy",
      "THPT Phan Chu Trinh",
      "TH,THCS,THPT Song ngữ QT Horizon",
      "THPT Cầu Giấy",
      "THPT chuyên Đại học Sư phạm",
      "THPT chuyên Hà Nội-Amsterdam",
      "THPT chuyên Ngoại ngữ",
      "THCS và THPT Nguyễn Tất Thành",
      "THPT Yên Hòa",
      "THPT Einstein",
      "PTDL Hermann Gmeiner",
      "THPT Hồng Bàng",
      "THCS&THPT Lương Thế Vinh",
      "THPT Lương Văn Can",
      "THPT Lý Thái Tổ",
      "THCS&THPT Nguyễn Bỉnh Khiêm-Cầu Giấy",
      "THCS và THPT Nguyễn Siêu",
      "THPT Global",
      "TH,THCS&THPT Đa Trí Tuệ",
      "THPT chuyên Khoa học tự nhiên",
      "THPT Nhân Chính",
      "THPT Trần Hưng Đạo-Thanh Xuân",
      "THPT Khương Đình",
      "THPT chuyên Khoa học Xã hội và Nhân văn",
      "TH,THCS và THPT Khương Hạ",
      "THPT Đào Duy Từ",
      "THPT Đại Việt",
      "THPT Hồ Tùng Mậu",
      "THPT Huỳnh Thúc Kháng",
      "THPT Nguyễn Tất Thành",
      "THPT Hoàng Mai",
      "THPT Lương Thế Vinh (Trước 9/2015)",
      "THPT Nguyễn Trường Tộ",
      "THPT Đông Nam Á (Trước 12/2017)",
      "THPT Hồ Xuân Hương",
      "THPT Nguyễn Tất Thành-Sơn Tây (Từ 3/2019 đến 11/2020)",
      "THPT Hoàng Văn Thụ",
      "THPT Trương Định",
      "THPT Việt Nam-Ba Lan",
      "THPT Nguyễn Đình Chiểu",
      "THPT May",
      "THPT Trần Quang Khải",
      "THCS&THPT Quốc tế Thăng Long",
      "THPT Phương Nam",
      "THPT Lý Thường Kiệt",
      "THPT Nguyễn Gia Thiều",
      "THPT Thạch Bàn",
      "THPT Phúc Lợi",
      "THPT Lê Văn Thiêm",
      "THPT Tây Sơn",
      "THPT Vạn Xuân-Long Biên",
      "THPT Wellspring-Mùa Xuân",
      "TH,THCS&THPT Vinschool The Harmony",
      "THPT Nguyễn Thị Minh Khai",
      "THPT Thượng Cát",
      "THPT Xuân Đỉnh",
      "THPT Khoa học Giáo dục",
      "THPT Đoàn Thị Điểm",
      "THCS&THPT Hà Thành",
      "THCS&THPT Newton",
      "THPT Tây Đô",
      "THPT Nguyễn Huệ",
      "THCS và THPT Dewey",
      "THPT Tây Hà Nội",
      "TH,THCS và THPT Everest",
      "THPT Lê Thánh Tông (Từ 12/2013 đến 9/2015)",
      "THPT Việt Hoàng (trước 29/12/2023)",
      "THPT Ngọc Hồi",
      "THPT Ngô Thì Nhậm",
      "THPT Đông Mỹ",
      "THPT Nguyễn Quốc Trinh",
      "THPT Lê Thánh Tông",
      "THPT Lương Thế Vinh (Từ 9/2015 đến 4/2017)",
      "THPT Cao Bá Quát-Gia Lâm",
      "THPT Dương Xá",
      "THPT Nguyễn Văn Cừ",
      "THPT Yên Viên",
      "THPT Bắc Đuống",
      "THPT Lê Ngọc Hân",
      "THPT Lý Thánh Tông",
      "THPT Tô Hiệu-Gia Lâm",
      "TH,THCS&THPT Vinschool Ocean Park",
      "THPT Bắc Thăng Long",
      "THPT Cổ Loa",
      "THPT Đông Anh",
      "THPT Liên Hà",
      "THPT Vân Nội",
      "THPT An Dương Vương",
      "THPT Ngô Quyền-Đông Anh",
      "TH,THCS&THPT Chu Văn An",
      "THPT Phạm Ngũ Lão",
      "THPT Lê Hồng Phong",
      "THPT Kinh Đô",
      "TH,THCS&THPT Archimedes Đông Anh",
      "THPT Hoàng Long (Trước 7/2016)",
      "THPT Ngô Tất Tố",
      "THPT Đa Phúc",
      "THPT Kim Anh",
      "THPT Minh Phú",
      "THPT Sóc Sơn",
      "THPT Trung Giã",
      "THPT Xuân Giang",
      "THPT Đặng Thai Mai",
      "THPT Lam Hồng",
      "THPT Lạc Long Quân",
      "THPT Mạc Đĩnh Chi",
      "THPT Minh Trí",
      "THPT DL Nguyễn Thượng Hiền (Trước 10/2017)",
      "THPT DL Phùng Khắc Khoan (Trước 7/2017)",
      "THPT chuyên Nguyễn Huệ",
      "THPT Lê Lợi",
      "THPT Lê Quý Đôn-Hà Đông",
      "THPT Quang Trung-Hà Đông",
      "THPT Trần Hưng Đạo-Hà Đông",
      "THPT Hà Đông",
      "THPT H.A.S",
      "THPT Phan Bội Châu",
      "PT Quốc Tế Việt Nam",
      "THPT Tô Hiến Thành",
      "THPT Xa La",
      "THPT Ban Mai",
      "THPT Ngô Gia Tự",
      "THCS&THPT Marie Curie -Hà Đông",
      "TH,THCS và THPT Quốc tế Nhật Bản",
      "PT Phùng Hưng (Trước 9/2016)",
      "Hữu Nghị 80",
      "THPT Sơn Tây",
      "THPT Tùng Thiện",
      "THPT Xuân Khanh",
      "PT Võ Thuật Bảo Long",
      "THPT Nguyễn Tất Thành-Sơn Tây (Trước 3/2019)",
      "THPT Ba Vì",
      "THPT Bất Bạt",
      "PT Dân tộc nội trú",
      "THPT Ngô Quyền-Ba Vì",
      "THPT Quảng Oai",
      "THPT Minh Quang",
      "THPT Ba Vì (Trước 4/2017)",
      "PT Dân tộc nội trú (Trước 4/2017)",
      "THPT Minh Quang (Trước 4/2017)",
      "THPT Lương Thế Vinh-Ba Vì",
      "THPT Trần Phú-Ba Vì",
      "Hữu Nghị T78",
      "THPT Ngọc Tảo",
      "THPT Phúc Thọ",
      "THPT Vân Cốc",
      "PT Hồng Đức"
    ],
    "Hà Tĩnh": [
    "THPT Chuyên Hà Tĩnh",
    "THPT Nguyễn Đình Liễn",
    "THPT Nguyễn Thị Minh Khai",
    "THPT Hương Sơn",
    "THPT Can Lộc",
    "THPT Đức Thọ",
    "THPT Hồng Lĩnh",
    "THPT Thạch Hà",
    "THPT Kỳ Anh",
    "THPT Vũ Quang",
    "THPT Hương Khê",
    "THPT Cẩm Xuyên",
    "THPT Nguyễn Huệ",
    "THPT Mai Thúc Loan",
    "THPT Nghi Xuân"
  ],
  "Hải Dương": [
    "THPT Chuyên Nguyễn Trãi",
    "THPT Hồng Quang",
    "THPT Hải Dương",
    "THPT Kinh Môn",
    "THPT Nam Sách",
    "THPT Thanh Hà",
    "THPT Chí Linh",
    "THPT Gia Lộc",
    "THPT Tứ Kỳ",
    "THPT Cẩm Giàng",
    "THPT Bình Giang",
    "THPT Kim Thành",
    "THPT Nguyễn Bỉnh Khiêm",
    "THPT Thanh Miện",
    "THPT Ninh Giang"
  ],
  "Hải Phòng": [
    "THPT Chuyên Trần Phú",
    "THPT Thái Phiên",
    "THPT Ngô Quyền",
    "THPT Lê Chân",
    "THPT Nguyễn Trãi",
    "THPT Trần Nguyên Hãn",
    "THPT Kiến An",
    "THPT Hồng Bàng",
    "THPT Thủy Sơn",
    "THPT An Dương",
    "THPT Đồ Sơn",
    "THPT Bạch Đằng",
    "THPT Tiên Lãng",
    "THPT Vĩnh Bảo",
    "THPT An Lão"
  ],
  "Hậu Giang": [
    "THPT Vị Thanh",
    "THPT Chiêm Thành Tấn",
    "THPT Chuyên Vị Thanh",
    "THPT Vị Thủy",
    "THPT Lê Hồng Phong",
    "THPT Vĩnh Tường",
    "THPT Long Mỹ (huyện LM)",
    "THPT Tây Đô",
    "Phổ thông Dân tộc nội trú (huyện LM)",
    "THPT Tân Phú (huyện LM)",
    "THPT Lương Tâm",
    "THPT Lương Thế Vinh",
    "THPT Cây Dương",
    "THPT Tân Long",
    "THPT Hòa An"
  ],
  "Hòa Bình": [
    "THPT Chuyên Hoàng Văn Thụ",
    "THPT Hòa Bình",
    "THPT Lương Sơn",
    "THPT Đà Bắc",
    "THPT Mai Châu",
    "THPT Kỳ Sơn",
    "THPT Kim Bôi",
    "THPT Tân Lạc",
    "THPT Lạc Long Quân",
    "THPT Yên Thủy",
    "THPT Cao Phong",
    "THPT Bắc Phong",
    "THPT Lạc Thủy",
    "THPT Nánh Nghẹ",
    "THPT Mường Khến"
  ],
  "Hưng Yên": [
    "THPT Chuyên Hưng Yên",
    "THPT Hưng Yên",
    "THPT Văn Giang",
    "THPT Phố Hiến",
    "THPT Mỹ Hào",
    "THPT Tiên Lữ",
    "THPT Ân Thi",
    "THPT Khoái Châu",
    "THPT Kim Động",
    "THPT Yên Mỹ",
    "THPT Nguyễn Siêu",
    "THPT Đức Hợp",
    "THPT Minh Châu",
    "THPT Bảo Khê",
    "THPT Hùng Vương"
  ],
  "Khánh Hòa": [
    "THPT Chuyên Lê Quý Đôn",
    "THPT Nguyễn Văn Trỗi",
    "THPT Lý Tự Trọng",
    "THPT Hà Huy Tập",
    "THPT Nguyễn Huệ",
    "THPT Hoàng Văn Thụ",
    "THPT Phạm Văn Đồng",
    "THPT Tô Văn Ơn",
    "THPT Cam Ranh",
    "THPT Trần Quý Cáp",
    "THPT Ninh Hòa 1",
    "THPT Vĩnh Xuân",
    "THPT Cam Lâm",
    "THPT Khánh Vĩnh",
    "THPT Trường Sa"
  ],
  "Kiên Giang": [
    "THPT Chuyên Huỳnh Mẫn Đạt",
    "THPT Rạch Giá",
    "THPT Long Thạnh",
    "THPT An Biên",
    "THPT Hòn Đất",
    "THPT Tân Hiệp",
    "THPT Gò Quao",
    "THPT An Minh",
    "THPT Kiên Lương",
    "THPT Giang Thành",
    "THPT Vĩnh Thuận",
    "THPT U Minh Thượng",
    "THPT Hà Tiên",
    "THPT Phú Quốc",
    "THPT Giục Tượng"
  ],
  "Kon Tum": [
    "THPT Chuyên Nguyễn Tất Thành",
    "THPT Kon Tum",
    "THPT Đắk Hà",
    "THPT Ngọc Hồi",
    "THPT Kon Rẫy",
    "THPT Đắk Tô",
    "THPT Sa Thầy",
    "THPT Đắk Glei",
    "THPT Tu Mơ Rông",
    "THPT Ia H’Drai",
    "THPT Nguyễn Huệ",
    "THPT Trường Chinh",
    "THPT Lý Tự Trọng",
    "THPT Trần Hưng Đạo",
    "THPT Nguyễn Văn Cừ"
  ],
  "Lai Châu": [
    "THPT Chuyên Lê Quý Đôn",
    "THPT Lai Châu",
    "THPT Mường Than",
    "THPT Phong Thổ",
    "THPT Tam Đường",
    "THPT Tân Uyên",
    "THPT Sìn Hồ",
    "THPT Nậm Nhùn",
    "THPT Mường Tè",
    "THPT Nậm Păm",
    "THPT Than Uyên",
    "THPT Mường So",
    "THPT Bình Lư",
    "THPT Phì Nhừ",
    "THPT Tủa Sín Chải"
  ],
  "Lâm Đồng": [
    "THPT Chuyên Thăng Long",
    "THPT Bảo Lộc",
    "THPT Nguyễn Du",
    "THPT Đơn Dương",
    "THPT Đức Trọng",
    "THPT Lâm Hà",
    "THPT Di Linh",
    "THPT Đạ Huoai",
    "THPT Đạ Tẻh",
    "THPT Đam Rông",
    "THPT Lạc Dương",
    "THPT Langbiang",
    "THPT B’Lao",
    "THPT Đồi Ngô",
    "THPT Cát Tiên"
  ],
  "Lạng Sơn": [
    "THPT Chuyên Chu Văn An",
    "THPT Lạng Sơn",
    "THPT Hoàng Văn Thụ",
    "THPT Bắc Sơn",
    "THPT Tràng Định",
    "THPT Văn Lãng",
    "THPT Hữu Lũng",
    "THPT Đình Lập",
    "THPT Lộc Bình",
    "THPT Chi Lăng",
    "THPT Bình Gia",
    "THPT Cao Lộc",
    "THPT Văn Quan",
    "THPT Đồng Đăng",
    "THPT Na Dương"
  ],
  "Lào Cai": [
    "THPT Chuyên Lào Cai",
    "THPT Số 1 Lào Cai",
    "THPT Số 2 Lào Cai",
    "THPT Bát Xát",
    "THPT Bảo Thắng",
    "THPT Sa Pa",
    "THPT Văn Bàn",
    "THPT Bắc Hà",
    "THPT Si Ma Cai",
    "THPT Mường Khương",
    "THPT Bảo Yên",
    "THPT Nguyễn Du",
    "THPT Cam Đường",
    "THPT Tân An",
    "THPT Nậm Chảy"
  ],
  "Long An": [
    "THPT Chuyên Long An",
    "THPT Hùng Vương",
    "THPT Tân An",
    "THPT Đức Huệ",
    "THPT Cần Giuộc",
    "THPT Cần Đước",
    "THPT Thạnh Hóa",
    "THPT Tân Trụ",
    "THPT Bến Lức",
    "THPT Đông Thạnh",
    "THPT Thủ Thừa",
    "THPT Vĩnh Hưng",
    "THPT Tân Thạnh",
    "THPT Mộc Hóa",
    "THPT Kiến Tường"
  ],
  "Nam Định": [
    "THPT Chuyên Lê Hồng Phong",
    "THPT Nguyễn Khuyến",
    "THPT Trần Hưng Đạo",
    "THPT Lý Tự Trọng",
    "THPT Nam Định",
    "THPT Giao Thủy",
    "THPT Xuân Trường",
    "THPT Nghĩa Hưng",
    "THPT Hải Hậu A",
    "THPT Mỹ Lộc",
    "THPT Trực Ninh",
    "THPT Ý Yên",
    "THPT Vụ Bản",
    "THPT Nam Trực",
    "THPT Nguyễn Trường Tộ"
  ],
  "Nghệ An": [
    "THPT Chuyên Phan Bội Châu",
    "THPT Huỳnh Thúc Kháng",
    "THPT Đô Lương 1",
    "THPT Thanh Chương 1",
    "THPT Diễn Châu 1",
    "THPT Quỳnh Lưu 1",
    "THPT Nam Đàn 1",
    "THPT Yên Thành 2",
    "THPT Anh Sơn 1",
    "THPT Tân Kỳ",
    "THPT Nghi Lộc 1",
    "THPT Cửa Lò",
    "THPT Thái Hòa",
    "THPT Vinh",
    "THPT Hoàng Mai"
  ],
  "Ninh Bình": [
    "THPT Chuyên Lương Văn Tụy",
    "THPT Hoa Lư A",
    "THPT Ninh Bình",
    "THPT Yên Khánh A",
    "THPT Kim Sơn A",
    "THPT Gia Viễn A",
    "THPT Nho Quan A",
    "THPT Yên Mô A",
    "THPT Bình Minh",
    "THPT Tam Điệp",
    "THPT Đinh Tiên Hoàng",
    "THPT Nguyễn Huệ",
    "THPT Trần Hưng Đạo",
    "THPT Tống Văn Trân",
    "THPT Phát Diệm"
  ],
  "Ninh Thuận": [
    "THPT Chuyên Lê Quý Đôn",
    "THPT Nguyễn Trãi",
    "THPT Phan Chu Trinh",
    "THPT Ninh Hải",
    "THPT Thuận Bắc",
    "THPT Ninh Sơn",
    "THPT Bác Ái",
    "THPT An Phước",
    "THPT Tháp Chàm",
    "THPT Võ Thị Sáu",
    "THPT Nguyễn Văn Cừ",
    "THPT Trần Phú",
    "THPT Quảng Thắng",
    "THPT Mỹ Hiệp",
    "THPT Đông Hải"
  ],
  "Phú Thọ": [
    "THPT Chuyên Hùng Vương",
    "THPT Phong Châu",
    "THPT Thanh Sơn",
    "THPT Lâm Thao",
    "THPT Cẩm Khê",
    "THPT Hạ Hòa",
    "THPT Đoan Hùng",
    "THPT Tam Nông",
    "THPT Phù Ninh",
    "THPT Việt Trì",
    "THPT Yên Lập",
    "THPT Thanh Thủy",
    "THPT Tân Sơn",
    "THPT Song Lâu",
    "THPT Vĩnh Chân"
  ],
  "Phú Yên": [
    "THPT Chuyên Lương Văn Chánh",
    "THPT Nguyễn Huệ",
    "THPT Trần Phú",
    "THPT Ngô Gia Tự",
    "THPT Lê Thành Phương",
    "THPT Đồng Xuân",
    "THPT Tuy Hòa 1",
    "THPT Sông Cầu",
    "THPT Tây Hòa",
    "THPT Sơn Hòa",
    "THPT Đông Hòa",
    "THPT Tuy An 1",
    "THPT Phú Hòa",
    "THPT Xuân Đám",
    "THPT Lê Hồng Phong"
  ],
  "Quảng Bình": [
    "THPT Chuyên Võ Nguyên Giáp",
    "THPT Đống Đa",
    "THPT Lê Quý Đôn",
    "THPT Nguyễn Trãi",
    "THPT Lệ Thủy",
    "THPT Quảng Ninh",
    "THPT Bố Trạch",
    "THPT Tuyên Hóa",
    "THPT Minh Hóa",
    "THPT Quảng Trạch",
    "THPT Bắc Trạch",
    "THPT Nguyễn Bỉnh Khiêm",
    "THPT Phan Đình Phùng",
    "THPT Hàm Nghi",
    "THPT Nguyễn Hữu Cảnh"
  ],
  "Quảng Nam": [
    "THPT Chuyên Nguyễn Bỉnh Khiêm",
    "THPT Lê Thánh Tông",
    "THPT Trần Phú",
    "THPT Nguyễn Duy Hiệu",
    "THPT Nguyễn Huệ",
    "THPT Sào Nam",
    "THPT Núi Thành",
    "THPT Tam Kỳ",
    "THPT Điện Bàn",
    "THPT Quế Sơn",
    "THPT Duy Xuyên",
    "THPT Bắc Trà My",
    "THPT Nam Trà My",
    "THPT Hiệp Đức",
    "THPT Phước Sơn"
  ],
  "Quảng Ngãi": [
    "THPT Chuyên Lê Khiết",
    "THPT Trần Quốc Tuấn",
    "THPT Võ Nguyên Giáp",
    "THPT Ba Tơ",
    "THPT Sơn Tịnh 1",
    "THPT Tư Nghĩa 1",
    "THPT Đức Phổ 1",
    "THPT Bình Sơn",
    "THPT Trà Bồng",
    "THPT Minh Long",
    "THPT Nghĩa Hành",
    "THPT Mộ Đức 1",
    "THPT Lý Sơn",
    "THPT Sơn Hà",
    "THPT Tây Trà"
  ],
  "Quảng Ninh": [
    "THPT Chuyên Hạ Long",
    "THPT Hòn Gai",
    "THPT Bãi Cháy",
    "THPT Cẩm Phả",
    "THPT Uông Bí",
    "THPT Đông Triều",
    "THPT Quảng Hà",
    "THPT Tiên Yên",
    "THPT Ba Chẽ",
    "THPT Bình Liêu",
    "THPT Đầm Hà",
    "THPT Vân Đồn",
    "THPT Cô Tô",
    "THPT Nguyễn Bình",
    "THPT Trần Nhân Tông"
  ],
  "Quảng Trị": [
    "THPT Chuyên Lê Quý Đôn",
    "THPT Đông Hà",
    "THPT Hải Lăng",
    "THPT Triệu Phong",
    "THPT Gio Linh",
    "THPT Vĩnh Linh",
    "THPT Cam Lộ",
    "THPT Đakrông",
    "THPT Hướng Hóa",
    "THPT Lao Bảo",
    "THPT Cửa Tùng",
    "THPT Nguyễn Huệ",
    "THPT Bến Quan",
    "THPT Hồ Xá",
    "THPT Tây Hiếu"
  ],
  "Sóc Trăng": [
    "THPT Chuyên Nguyễn Thị Minh Khai",
    "THPT Hoàng Diệu",
    "THPT Sóc Trăng",
    "THPT Đại Ngãi",
    "THPT Kế Sách",
    "THPT Mỹ Xuyên",
    "THPT Thạnh Trị",
    "THPT Long Phú",
    "THPT Cù Lao Dung",
    "THPT Vĩnh Châu",
    "THPT Trần Đề",
    "THPT Mỹ Thuận",
    "THPT An Lạc Thôn",
    "THPT Thuận Hòa",
    "THPT Phú Tâm"
  ],
  "Sơn La": [
    "THPT Chuyên Sơn La",
    "THPT Sơn La",
    "THPT Mường La",
    "THPT Thuận Châu",
    "THPT Mai Sơn",
    "THPT Quỳnh Nhai",
    "THPT Yên Châu",
    "THPT Mộc Châu",
    "THPT Bắc Yên",
    "THPT Phù Yên",
    "THPT Sông Mã",
    "THPT Sốp Cộp",
    "THPT Mường Chanh",
    "THPT Vân Hồ",
    "THPT Tạ Bú"
  ],
  "Tây Ninh": [
    "THPT Chuyên Hoàng Lê Kha",
    "THPT Tây Ninh",
    "THPT Trần Đại Nghĩa",
    "THPT Nguyễn Chí Thanh",
    "THPT Hòa Thành",
    "THPT Tân Châu",
    "THPT Gò Dầu",
    "THPT Trảng Bàng",
    "THPT Dương Minh Châu",
    "THPT Bến Cầu",
    "THPT Tân Biên",
    "THPT Châu Thành",
    "THPT Nguyễn Trung Trực",
    "THPT Phước Thạnh",
    "THPT Long Hoa"
  ],
  "Thái Bình": [
    "THPT Chuyên Thái Bình",
    "THPT Nguyễn Đức Cảnh",
    "THPT Bắc Duyên Hà",
    "THPT Tây Tiền Hải",
    "THPT Đông Hưng Hà",
    "THPT Quỳnh Côi",
    "THPT Thái Thụy",
    "THPT Hưng Hà",
    "THPT Vũ Tiên",
    "THPT Kiến Xương",
    "THPT Lê Quý Đôn",
    "THPT Nguyễn Trãi",
    "THPT Phạm Quang Thẩm",
    "THPT Trần Hưng Đạo",
    "THPT Hồng Đức"
  ],
  "Thái Nguyên": [
    "THPT Chuyên Thái Nguyên",
    "THPT Lương Ngọc Quyến",
    "THPT Gang Thép",
    "THPT Đại Từ",
    "THPT Đồng Hỷ",
    "THPT Phú Bình",
    "THPT Võ Nhai",
    "THPT Định Hóa",
    "THPT Phú Lương",
    "THPT Sông Công",
    "THPT Nguyễn Huệ",
    "THPT Thái Nguyên",
    "THPT Yên Lãng",
    "THPT Tân Long",
    "THPT La Hiên"
  ],
  "Thanh Hóa": [
    "THPT Chuyên Lam Sơn",
    "THPT Hàm Rồng",
    "THPT Tĩnh Gia 1",
    "THPT Ngọc Lặc",
    "THPT Quảng Xương 1",
    "THPT Đông Sơn 1",
    "THPT Thọ Xuân 1",
    "THPT Triệu Sơn 1",
    "THPT Hoằng Hóa 1",
    "THPT Hậu Lộc 1",
    "THPT Nga Sơn",
    "THPT Nông Cống 1",
    "THPT Sầm Sơn",
    "THPT Bá Thước",
    "THPT Cẩm Thủy 1"
  ],
  "Thừa Thiên Huế": [
    "THPT Chuyên Quốc Học",
    "THPT Hai Bà Trưng",
    "THPT Nguyễn Huệ",
    "THPT Gia Hội",
    "THPT Hương Thủy",
    "THPT Phú Bài",
    "THPT Thuận An",
    "THPT Phong Điền",
    "THPT Nam Đông",
    "THPT A Lưới",
    "THPT Phú Lộc",
    "THPT Hương Trà",
    "THPT Vinh Lộc",
    "THPT Đặng Huy Trứ",
    "THPT Bình Điền"
  ],
  "Tiền Giang": [
    "THPT Chuyên Tiền Giang",
    "THPT Nguyễn Đình Chiểu",
    "THPT Đốc Binh Kiều",
    "THPT Cai Lậy",
    "THPT Chợ Gạo",
    "THPT Gò Công Đông",
    "THPT Gò Công Tây",
    "THPT Cái Bè",
    "THPT Mỹ Tho",
    "THPT Tân Phước",
    "THPT Vĩnh Bình",
    "THPT Bình Đông",
    "THPT Thủ Khoa Huân",
    "THPT Nguyễn Thị Thập",
    "THPT Tân Phú Đông"
  ],
  "TP. Hồ Chí Minh": [
    "THPT Chuyên Lê Hồng Phong",
    "THPT Nguyễn Thị Minh Khai",
    "THPT Gia Định",
    "THPT Nguyễn Thượng Hiền",
    "THPT Lê Quý Đôn",
    "THPT Trần Đại Nghĩa",
    "THPT Nguyễn Hữu Huân",
    "THPT Marie Curie",
    "THPT Nguyễn Trãi",
    "THPT Hùng Vương",
    "THPT Bùi Thị Xuân",
    "THPT Nguyễn Công Trứ",
    "THPT Mạc Đĩnh Chi",
    "THPT Trưng Vương",
    "THPT Lương Thế Vinh"
  ],
  "Trà Vinh": [
    "THPT Chuyên Nguyễn Thị Minh Khai",
    "THPT Trà Vinh",
    "THPT Nguyễn Văn Thắng",
    "THPT Tiểu Cần",
    "THPT Cầu Kè",
    "THPT Trà Cú",
    "THPT Duyên Hải",
    "THPT Cầu Ngang",
    "THPT Châu Thành",
    "THPT Long Hữu",
    "THPT Ngô Văn Thì",
    "THPT Hòa Ân",
    "THPT Tân An",
    "THPT Đại An",
    "THPT Trường Thọ"
  ],
  "Tuyên Quang": [
    "THPT Chuyên Tuyên Quang",
    "THPT Tuyên Quang",
    "THPT Xuân Vân",
    "THPT Tân Trào",
    "THPT Chiêm Hóa",
    "THPT Na Hang",
    "THPT Lâm Bình",
    "THPT Hàm Yên",
    "THPT Yên Hoa",
    "THPT Sơn Dương",
    "THPT Trung Sơn",
    "THPT Ỷ La",
    "THPT Kim Phú",
    "THPT Thượng Lâm",
    "THPT Phù Lưu"
  ],
  "Vĩnh Long": [
    "THPT Chuyên Nguyễn Bỉnh Khiêm",
    "THPT Lưu Văn Liệt",
    "THPT Vĩnh Long",
    "THPT Mang Thít",
    "THPT Vũng Liêm",
    "THPT Trà Ôn",
    "THPT Tam Bình",
    "THPT Bình Minh",
    "THPT Tân Quới",
    "THPT Nguyễn Thông",
    "THPT Long Hồ",
    "THPT Lê Lợi",
    "THPT Phạm Hùng",
    "THPT Hòa Phú",
    "THPT Hiếu Phước"
  ],
  "Vĩnh Phúc": [
    "THPT Chuyên Vĩnh Phúc",
    "THPT Yên Lạc",
    "THPT Vĩnh Yên",
    "THPT Nguyễn Viết Xuân",
    "THPT Bình Xuyên",
    "THPT Liễn Sơn",
    "THPT Tam Dương",
    "THPT Nguyễn Thái Học",
    "THPT Vĩnh Tường",
    "THPT Sông Lô",
    "THPT Phúc Yên",
    "THPT Hai Bà Trưng",
    "THPT Đội Cấn",
    "THPT Trần Phú",
    "THPT Xuân Hòa"
  ],
  "Yên Bái": [
    "THPT Chuyên Nguyễn Tất Thành",
    "THPT Yên Bái",
    "THPT Thác Bà",
    "THPT Trần Nhật Duật",
    "THPT Nghĩa Lộ",
    "THPT Văn Chấn",
    "THPT Trấn Yên",
    "THPT Lục Yên",
    "THPT Văn Yên",
    "THPT Mù Cang Chải",
    "THPT Yên Bình",
    "THPT Minh Xuân",
    "THPT Hồng Quang",
    "THPT Đông Yên",
    "THPT Cảm Ân"
  ]
  };

  const [profileData, setProfileData] = useState({
      cccd: user.cccd || "",
      fullName: user.ho_ten || "",
      gender: user.gioi_tinh || "",
      dob: user.ngay_sinh ? user.ngay_sinh.split("-").reverse().join("/") : "", 
      ethnicity: user.dan_toc || "",
      permanentAddress: user.dia_chi_thuong_tru || "",
      contactAddress: user.dia_chi_lien_lac || "",
      province: "", 
      school: "",   
      email: user.email || "",
      phone: user.so_dien_thoai || "",
      priorityArea: user.khu_vuc_uu_tien || "",
      priorityObject: user.doi_tuong_uu_tien || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);

  const [images, setImages] = useState({
    cccdFront: null,
    cccdBack: null,
    priorityProof: null,
  });

  const [approved, setApproved] = useState({
    cccdFront: true,
    cccdBack: true,
    priorityProof: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "province") {
      setTempData((prev) => ({
        ...prev,
        province: value,
        school: schoolByProvince[value][0] || "", // Chọn trường đầu tiên trong danh sách
      }));
    } else {
      setTempData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [type]: imageUrl }));
      setApproved((prev) => ({ ...prev, [type]: true }));
    }
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    console.log("Thông tin đã lưu:", tempData);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log("Đăng xuất");
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-start">
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

        <div className="mt-10 grid grid-cols-2 gap-8">
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
                  <option value="An Giang">An Giang</option>
                  <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                  <option value="Bắc Giang">Bắc Giang</option>
                  <option value="Bắc Kạn">Bắc Kạn</option>
                  <option value="Bạc Liêu">Bạc Liêu</option>
                  <option value="Bắc Ninh">Bắc Ninh</option>
                  <option value="Bến Tre">Bến Tre</option>
                  <option value="Bình Định">Bình Định</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Bình Phước">Bình Phước</option>
                  <option value="Bình Thuận">Bình Thuận</option>
                  <option value="Cà Mau">Cà Mau</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Cao Bằng">Cao Bằng</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Đắk Lắk">Đắk Lắk</option>
                  <option value="Đắk Nông">Đắk Nông</option>
                  <option value="Điện Biên">Điện Biên</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Đồng Tháp">Đồng Tháp</option>
                  <option value="Gia Lai">Gia Lai</option>
                  <option value="Hà Giang">Hà Giang</option>
                  <option value="Hà Nam">Hà Nam</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hà Tĩnh">Hà Tĩnh</option>
                  <option value="Hải Dương">Hải Dương</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Hậu Giang">Hậu Giang</option>
                  <option value="Hòa Bình">Hòa Bình</option>
                  <option value="Hưng Yên">Hưng Yên</option>
                  <option value="Khánh Hòa">Khánh Hòa</option>
                  <option value="Kiên Giang">Kiên Giang</option>
                  <option value="Kon Tum">Kon Tum</option>
                  <option value="Lai Châu">Lai Châu</option>
                  <option value="Lâm Đồng">Lâm Đồng</option>
                  <option value="Lạng Sơn">Lạng Sơn</option>
                  <option value="Lào Cai">Lào Cai</option>
                  <option value="Long An">Long An</option>
                  <option value="Nam Định">Nam Định</option>
                  <option value="Nghệ An">Nghệ An</option>
                  <option value="Ninh Bình">Ninh Bình</option>
                  <option value="Ninh Thuận">Ninh Thuận</option>
                  <option value="Phú Thọ">Phú Thọ</option>
                  <option value="Phú Yên">Phú Yên</option>
                  <option value="Quảng Bình">Quảng Bình</option>
                  <option value="Quảng Nam">Quảng Nam</option>
                  <option value="Quảng Ngãi">Quảng Ngãi</option>
                  <option value="Quảng Ninh">Quảng Ninh</option>
                  <option value="Quảng Trị">Quảng Trị</option>
                  <option value="Sóc Trăng">Sóc Trăng</option>
                  <option value="Sơn La">Sơn La</option>
                  <option value="Tây Ninh">Tây Ninh</option>
                  <option value="Thái Bình">Thái Bình</option>
                  <option value="Thái Nguyên">Thái Nguyên</option>
                  <option value="Thanh Hóa">Thanh Hóa</option>
                  <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                  <option value="Tiền Giang">Tiền Giang</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Trà Vinh">Trà Vinh</option>
                  <option value="Tuyên Quang">Tuyên Quang</option>
                  <option value="Vĩnh Long">Vĩnh Long</option>
                  <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                  <option value="Yên Bái">Yên Bái</option>
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
                  {schoolByProvince[tempData.province]?.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
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
                {profileData.priorityArea && <span className="text-gray-700 font-roboto">{profileData.priorityArea}</span>}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold font-roboto mb-2">
                Đối tượng ưu tiên
              </label>
              <div className="w-[544px] h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4">
                {profileData.priorityObject && <span className="text-gray-700 font-roboto">{profileData.priorityObject}</span>}
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