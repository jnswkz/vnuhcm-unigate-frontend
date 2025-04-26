import React, { useState, useEffect } from 'react';
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
  const resultAnnouncementDate = new Date('2025-08-01T00:00:00'); // Ngày công bố kết quả: 01/08/2025
  const currentDate = new Date(); // Thời gian hiện tại
  const hasResults = currentDate >= resultAnnouncementDate; // Có kết quả nếu thời gian hiện tại >= ngày công bố

  // Tính toán thời gian còn lại ngay từ đầu
  const calculateTimeLeft = (targetDate, now) => {
    const difference = targetDate - now;
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  // Khởi tạo timeLeft ngay từ đầu
  const initialTimeLeft = calculateTimeLeft(resultAnnouncementDate, currentDate);

  // States cho hiệu ứng
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [animatedNumber, setAnimatedNumber] = useState(initialTimeLeft.days); // Khởi tạo bằng số ngày
  const [loadingProgress, setLoadingProgress] = useState(50); // Khởi tạo giá trị ban đầu là 50
  const [showTips, setShowTips] = useState(0);

  // Mảng các tips
  const admissionTips = [
    "Chuẩn bị đầy đủ các loại giấy tờ cần thiết cho việc nhập học",
    "Theo dõi thường xuyên trang web và email để không bỏ lỡ thông báo quan trọng",
    "Tìm hiểu trước về quy trình nhập học trực tuyến để tiết kiệm thời gian",
    "Chuẩn bị sẵn bản scan các giấy tờ cần thiết với độ phân giải tốt",
    "Kiểm tra kỹ thông tin cá nhân trước khi gửi hồ sơ nhập học"
  ];

  // Định dạng ngày công bố kết quả thành DD/MM/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11, cần +1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedAnnouncementDate = formatDate(resultAnnouncementDate);

  // Đếm ngược thời gian
  useEffect(() => {
    if (!hasResults) {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = resultAnnouncementDate - now;

        if (difference <= 0) {
          clearInterval(interval);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setAnimatedNumber(0);
          return;
        }

        // Tính toán thời gian còn lại
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });

        // Cập nhật animatedNumber để hiển thị số ngày còn lại
        setAnimatedNumber(days);
      }, 100);

      // Hiệu ứng loading
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          const newValue = prev + 1;
          return newValue >= 100 ? 50 : newValue;
        });
      }, 50);

      // Đổi tips
      const tipsInterval = setInterval(() => {
        setShowTips(prev => (prev + 1) % admissionTips.length);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
        clearInterval(tipsInterval);
      };
    }
  }, [hasResults, resultAnnouncementDate]);

  // Nếu chưa có kết quả, hiển thị giao diện mới, động và lung linh
  if (!hasResults) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg pt-4 px-8 pb-8 flex flex-col items-center justify-center min-h-[572px]">
        {/* Hiệu ứng đếm ngược */}
        <div className="w-full mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-5 mb-4 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-bold text-center text-blue-700 mb-3">
              Thời gian công bố kết quả
            </h2>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold shadow-md">
                  {String(timeLeft.days || 0).padStart(2, '0')}
                </div>
                <span className="text-blue-600 font-medium mt-1">Ngày</span>
              </div>
              <div className="text-blue-600 text-2xl font-bold">:</div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold shadow-md">
                  {String(timeLeft.hours || 0).padStart(2, '0')}
                </div>
                <span className="text-blue-600 font-medium mt-1">Giờ</span>
              </div>
              <div className="text-blue-600 text-2xl font-bold">:</div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold shadow-md">
                  {String(timeLeft.minutes || 0).padStart(2, '0')}
                </div>
                <span className="text-blue-600 font-medium mt-1">Phút</span>
              </div>
              <div className="text-blue-600 text-2xl font-bold">:</div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold shadow-md animate-pulse">
                  {String(timeLeft.seconds || 0).padStart(2, '0')}
                </div>
                <span className="text-blue-600 font-medium mt-1">Giây</span>
              </div>
            </div>
            <p className="text-center mt-4 text-blue-700 font-medium">
              Kết quả sẽ được công bố vào ngày {formattedAnnouncementDate}
            </p>
          </div>
        </div>

        {/* Section chính */}
        <div className="flex flex-col md:flex-row w-full gap-6 mb-6">
          {/* Cột trái - Hình ảnh và thông tin */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full transform hover:translate-y-1 transition-transform duration-300">
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-80 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="font-bold text-4xl mb-2">{animatedNumber}</div>
                    <div className="text-xl">Ngày còn lại</div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                Hệ thống đang xử lý kết quả xét tuyển
              </h3>
              
              {/* Loading bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              
              <p className="text-gray-600">
                Kết quả đang được xử lý và sẽ được công bố theo thời gian quy định. Vui lòng kiểm tra lại sau.
              </p>
            </div>
          </div>
          
          {/* Cột phải - Tips và thông báo */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center">
                <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Lưu ý quan trọng
              </h3>
              
              {/* Tips với hiệu ứng chuyển đổi */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 min-h-32 flex items-center">
                <div className="relative h-16 w-full overflow-hidden">
                  {admissionTips.map((tip, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center ${
                        showTips === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <p className="text-blue-700">
                        <span className="font-bold">Tip #{index + 1}:</span> {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* FAQ Accordion */}
              <div className="mb-4">
                <details className="group border-b border-gray-200 py-2">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-blue-600 hover:text-blue-800">
                    <span>Tôi cần chuẩn bị gì khi có kết quả?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" width="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-600 mt-2 pl-4">
                    Bạn nên chuẩn bị sẵn giấy CMND/CCCD, giấy khai sinh, học bạ, bằng tốt nghiệp THPT (hoặc giấy chứng nhận tốt nghiệp tạm thời) và các giấy tờ ưu tiên (nếu có).
                  </p>
                </details>
                
                <details className="group border-b border-gray-200 py-2">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-blue-600 hover:text-blue-800">
                    <span>Làm sao để xác nhận nhập học?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" width="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-600 mt-2 pl-4">
                    Sau khi có kết quả trúng tuyển, bạn cần xác nhận nhập học trên Cổng thông tin xét tuyển của Bộ GD&ĐT và làm theo hướng dẫn nhập học của trường.
                  </p>
                </details>
              </div>
              
              {/* Thông báo liên hệ với animation */}
              <div className="mt-4 flex items-center justify-start bg-gradient-to-r from-blue-50 to-white p-3 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <svg className="h-6 w-6 text-blue-600 animate-ping absolute opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <svg className="h-6 w-6 text-blue-600 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-blue-700 font-semibold">
                    Hỗ trợ 24/7
                  </p>
                  <p className="text-blue-600">
                    Mọi thắc mắc vui lòng liên hệ hotline: <span className="font-bold">1900 1508</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification */}
        <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-md flex items-start mb-6 transform transition-transform duration-300 hover:scale-105">
          <svg className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="font-semibold text-yellow-800">Lưu ý về thời hạn xác nhận nhập học!</h3>
            <p className="text-yellow-700">
              Sau khi có kết quả trúng tuyển, bạn cần xác nhận nhập học trong vòng 5 ngày qua Cổng thông tin tuyển sinh của Bộ GD&ĐT. Quá thời hạn này sẽ được xem như từ chối nhập học.
            </p>
          </div>
        </div>
        
        {/* Social Media Sharing */}
        <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <p className="text-gray-700 mb-3">Chia sẻ thông tin tuyển sinh</p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300 transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.097 10.097 0 01-3.127 1.184A4.92 4.92 0 0012.64 9.293a13.98 13.98 0 01-10.15-5.147 4.92 4.92 0 001.522 6.574 4.923 4.923 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.59z" />
              </svg>
            </button>
            <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-300 transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Nếu đã có kết quả, hiển thị giao diện cũ (không thay đổi)
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
