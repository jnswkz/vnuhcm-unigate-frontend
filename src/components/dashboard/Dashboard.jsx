import { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import ActionCard from './ActionCard';
import NewsCard from './NewsCard';
import Chatbot from './Chatbot';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const user = {
    name: "Võ Phương Thanh",
    email: "vophuongthanh604@outlook.com",
    phone: "0885583693",
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showChatbot, setShowChatbot] = useState(false);

  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());nn
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateCountdown = (targetDate) => {
    const now = currentTime; // Sử dụng thời gian thực
    const target = new Date(targetDate);
    const diff = target - now;
    if (diff <= 0) return "Đã kết thúc";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `Còn lại: ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  };

  // Hàm kiểm tra xem thời gian có gần đến ngày đăng ký không (dưới 7 ngày)
  const isRegistrationNear = (targetDate) => {
    const now = currentTime; 
    const target = new Date(targetDate);
    const diff = target - now;
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days < 7; 
  };

  const actionCards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 3H10V21H2V3Z" stroke="#FF9017" strokeWidth="2" />
          <path d="M12 3H20V21H12V3Z" stroke="#FF9017" strokeWidth="2" />
        </svg>
      ),
      title: "Bài thi thử ĐGNL",
      description: "Luyện tập và làm quen với format bài thi ĐGNL",
      buttonText: "Làm bài thi thử",
      buttonColor: "#FF9017",
      borderColor: "#FFB459",
      link: "/thi-thu",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 4H21V20H3V4Z" stroke="#0056B3" strokeWidth="2"/>
          <path d="M3 2H21V10H3V2Z" stroke="#0056B3" strokeWidth="2"/>
        </svg>
      ),
      title: "Kỳ thi ĐGNL đợt 1",
      description: "Ngày thi: 30/03/2025",
      status: "Đã kết thúc",
      statusColor: "#EBF5FF",
      buttonText: "Xem kết quả",
      buttonColor: "#0056B3",
      borderColor: "#0056B3",
      link: "/thi-dgnl", 
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 4H21V20H3V4Z" stroke="#0056B3" strokeWidth="2"/>
          <path d="M3 2H21V10H3V2Z" stroke="#0056B3" strokeWidth="2"/>
        </svg>
      ),
      title: "Kỳ thi ĐGNL đợt 2",
      description: "Ngày thi: 01/06/2025",
      status: calculateCountdown("2025-06-01"),
      statusColor: "#EBF5FF",
      buttonText: "Đăng ký dự thi",
      buttonColor: "#0056B3",
      borderColor: "#0056B3",
      link: "/thi-dgnl", 
    },
    {
      icon: (
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
          <path d="M3 2.875H21V20.125H3V2.875Z" stroke="#9333EA" strokeWidth="2"/>
        </svg>
      ),
      title: "Tư vấn tuyển sinh",
      description: "Trò chuyện với Chatbot để nhận tư vấn",
      buttonText: "Bắt đầu trò chuyện",
      buttonColor: "#9333EA",
      borderColor: "#9333EA",
      onClick: () => setShowChatbot(true),
    },
    {
      icon: (
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
          <path d="M2 1.91667H22V21.0833H2V1.91667Z" stroke="#6B7280" strokeWidth="2"/>
          <path d="M9 3.83333H15V13.4167H9V3.83333Z" stroke="#6B7280" strokeWidth="2"/>
        </svg>
      ),
      title: "Đăng ký xét tuyển",
      description: "Thời gian: 15/06 - 30/06/2025",
      status: calculateCountdown("2025-06-15"),
      statusColor: "#F3F4F6",
      buttonText: isRegistrationNear("2025-06-15") ? "Đăng ký ngay" : "Chưa đến thời gian đăng ký",
      buttonColor: isRegistrationNear("2025-06-15") ? "#0056B3" : "#E5E7EB",
      buttonTextColor: isRegistrationNear("2025-06-15") ? "#FFFFFF" : "#9CA3AF",
      borderColor: isRegistrationNear("2025-06-15") ? "#0056B3" : "#E5E7EB",
      disabled: !isRegistrationNear("2025-06-15"),
      link: isRegistrationNear("2025-06-15") ? "/dang-ky-xet-tuyen" : undefined,
    },
  ];

  const newsItems = [
    {
      id: '1',
      image: "/src/assets/thongbao.png",
      date: "15/03/2024",
      title: "Thông báo tuyển sinh năm học 2024-2025",
      description: "Đại học Quốc gia TP.HCM thông báo kế hoạch tuyển sinh đại học chính quy năm 2024 với nhiều phương thức xét tuyển mới.",
    },
    {
      id: '2',
      image: "/src/assets/dgnl2.jpg",
      date: "10/03/2024",
      title: "Hướng dẫn đăng ký dự thi ĐGNL",
      description: "Chi tiết các bước đăng ký dự thi đánh giá năng lực, những lưu ý quan trọng và thời gian biểu cụ thể.",
    },
    {
      id: '3',
      image: "/src/assets/thongtin.jpg",
      date: "05/03/2024",
      title: "Thông tin ngành đào tạo mới",
      description: "Giới thiệu các ngành đào tạo mới được mở trong năm học 2024-2025 cùng cơ hội việc làm sau khi tốt nghiệp.",
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Welcome Section */}
      <div className="w-full h-[198px] bg-[#EBF5FF] relative">
        <div className="max-w-[1272px] mx-auto pt-10 animate-slide-right">
          <h1 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px]">
            Xin chào, {user.name}!
          </h1>
          <p className="mt-4 text-[18px] text-[#0056B3] font-roboto leading-[27px] max-w-[1161px]">
            Chào mừng bạn đến với hệ thống tuyển sinh trực tuyến của Đại học Quốc gia TP. Hồ Chí Minh.
          </p>
        </div>
      </div>

      {/* Action Cards - Row 1 */}
      <div className="max-w-[1272px] mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {actionCards.slice(0, 3).map((card, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ActionCard {...card} />
          </div>
        ))}
      </div>

      {/* Action Cards - Row 2 */}
      <div className="max-w-[1272px] mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {actionCards.slice(3, 5).map((card, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ActionCard {...card} />
          </div>
        ))}
      </div>

      {/* News Section */}
      <div className="max-w-[1272px] mx-auto mt-12">
        <h2 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px] animate-fade-in">
          Tin tức mới nhất
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <div
              key={news.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <NewsCard {...news} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/news"
            className="w-[190px] h-[52px] bg-[#0056B3] text-white text-[16px] font-roboto font-bold rounded-md hover:bg-[#004a99] flex items-center justify-center mx-4 transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
}