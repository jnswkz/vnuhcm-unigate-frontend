// src/pages/XetTuyen/AdmissionResults.jsx

import React from 'react';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';

export default function AdmissionResults() {
  // Dữ liệu giả lập cho kết quả xét tuyển
  const results = [
    {
      priority: 1,
      applicationCode: 'XT2024-1234',
      school: 'Đại học Công nghệ Thông tin',
      major: 'Kỹ thuật phần mềm',
      majorCode: '7480103',
      benchmarkScore: 1001,
      result: 'Không trúng tuyển',
      note: 'Điểm xét tuyển thấp hơn điểm chuẩn',
    },
    {
      priority: 2,
      applicationCode: 'XT2024-1234',
      school: 'Đại học Khoa học Tự nhiên',
      major: 'Công nghệ thông tin',
      majorCode: '7480201',
      benchmarkScore: 900,
      result: 'Trúng tuyển',
      note: 'Đủ điều kiện trúng tuyển',
    },
    {
      priority: 3,
      applicationCode: 'XT2024-1234',
      school: 'Đại học Công nghệ Thông tin',
      major: 'Khoa học máy tính',
      majorCode: '7480101',
      benchmarkScore: 960,
      result: 'Không xét tuyển',
      note: 'Đã trúng tuyển nguyện vọng 2',
    },
  ];

  // Kiểm tra thời gian công bố kết quả
  const resultAnnouncementDate = new Date('2024-08-01T00:00:00'); // Ngày công bố kết quả: 01/08/2025
  const currentDate = new Date(); // Thời gian hiện tại
  const hasResults = currentDate >= resultAnnouncementDate; // Có kết quả nếu thời gian hiện tại >= ngày công bố

  // Định dạng ngày công bố kết quả thành DD/MM/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11, cần +1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedAnnouncementDate = formatDate(resultAnnouncementDate);

  // Nếu chưa có kết quả, hiển thị giao diện cũ
  if (!hasResults) {
    return (
      <div className="bg-white rounded shadow-md pt-4 px-8 pb-8 flex flex-col items-center justify-center min-h-[572px]">
        {/* Thông báo chính - Cập nhật ngày từ resultAnnouncementDate */}
        <div className="bg-blue-50 border border-[#DCE6F1] rounded-lg shadow-md p-5 mb-4 w-full flex items-center justify-start">
          <svg
            className="h-6 w-6 text-[#0056B3] mr-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-[#0056B3] font-semibold">
              Kết quả xét tuyển sẽ được công bố vào ngày {formattedAnnouncementDate}.
            </p>
            <p className="text-[#666666]">
              Vui lòng quay lại sau để xem kết quả.
            </p>
          </div>
        </div>

        {/* Placeholder hình ảnh */}
        <div className="w-[240px] h-[240px] bg-gray-200 flex items-center justify-center text-gray-500 mb-6">
          240 x 240
        </div>

        {/* Thông báo phụ */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-[#0056B3] mb-2">
            Chưa có kết quả xét tuyển
          </h3>
          <p className="text-[#64748B] max-w-md mx-auto">
            Hệ thống đang trong quá trình xử lý kết quả xét tuyển. Kết quả sẽ được công bố theo thời gian quy định.
          </p>
        </div>

        {/* Thông báo liên hệ */}
        <div className="flex items-center justify-center">
          <svg
            className="h-5 w-5 text-[#0056B3] mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-[#0056B3]">
            Mọi thắc mắc về kết quả xét tuyển vui lòng liên hệ hotline: 1900 1508
          </p>
        </div>
      </div>
    );
  }

  // Nếu đã có kết quả, hiển thị giao diện mới
  return (
    <div className="bg-white rounded shadow-md pt-4 px-8 pb-8">
      {/* Thông báo chúc mừng */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-start">
        <svg
          className="h-6 w-6 text-green-600 mr-2.5"
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
        <div>
          <p className="text-green-600 font-semibold">
            Chúc mừng! Bạn đã trúng tuyển nguyện vọng 2.
          </p>
          <p className="text-green-600">
            Vui lòng hoàn thiện thủ tục xác nhận nhập học trực tuyến công xét tuyển của Bộ GD&ĐT trước 17:00 ngày 15/08/2024
          </p>
        </div>
      </div>

      {/* Bảng kết quả xét tuyển */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-4 px-4 text-left font-medium">Thứ tự ưu tiên</th>
              <th className="py-4 px-4 text-left font-medium">Mã hồ sơ xét tuyển</th>
              <th className="py-4 px-4 text-left font-medium">Trường</th>
              <th className="py-4 px-4 text-left font-medium">Ngành</th>
              <th className="py-4 px-4 text-left font-medium">Mã ngành</th>
              <th className="py-4 px-4 text-left font-medium">Điểm chuẩn</th>
              <th className="py-4 px-4 text-left font-medium">Kết quả</th>
              <th className="py-4 px-4 text-left font-medium">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-5 px-4 font-semibold">{result.priority}</td>
                <td className="py-5 px-4 font-semibold">{result.applicationCode}</td>
                <td className="py-5 px-4">{result.school}</td>
                <td className="py-5 px-4">{result.major}</td>
                <td className="py-5 px-4">{result.majorCode}</td>
                <td className="py-5 px-4">{result.benchmarkScore}</td>
                <td
                  className={`py-5 px-4 ${
                    result.result === 'Trúng tuyển'
                      ? 'text-green-600 font-semibold'
                      : result.result === 'Không trúng tuyển'
                      ? 'text-red-600 font-semibold'
                      : 'text-gray-600 font-semibold'
                  }`}
                >
                  {result.result}
                </td>
                <td className="py-5 px-4 text-gray-500">{result.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Thông báo liên hệ */}
      <div className="mt-6 flex items-center justify-start">
        <svg
          className="h-5 w-5 text-[#0056B3] mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-[#0056B3]">
          Mọi thắc mắc về kết quả xét tuyển vui lòng liên hệ hotline: 1900 1508
        </p>
      </div>
    </div>
  );
}