import ActionCard from './ActionCard';
import Chatbot from './Chatbot';

export default function DashboardTB() {
  const actionCards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 3H10V21H2V3Z" stroke="#FF9017" strokeWidth="2"/>
          <path d="M12 3H20V21H12V3Z" stroke="#FF9017" strokeWidth="2"/>
        </svg>
      ),
      title: "Bài thi thử ĐGNL",
      description: "Luyện tập và làm quen với format bài thi ĐGNL",
      buttonText: "Làm bài thi thử",
      buttonColor: "#FF9017",
      borderColor: "#FFB459",
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
      status: "Còn lại: 47 ngày 13 giờ",
      statusColor: "#EBF5FF",
      buttonText: "Đăng ký dự thi",
      buttonColor: "#0056B3",
      borderColor: "#0056B3",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3H21V21H3V3Z" stroke="#9333EA" strokeWidth="2"/>
        </svg>
      ),
      title: "Tư vấn tuyển sinh",
      description: "Trò chuyện với Chatbot để nhận tư vấn",
      buttonText: "Bắt đầu trò chuyện",
      buttonColor: "#9333EA",
      borderColor: "#9333EA",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 2H22V22H2V2Z" stroke="#6B7280" strokeWidth="2"/>
          <path d="M9 4H15V14H9V4Z" stroke="#6B7280" strokeWidth="2"/>
        </svg>
      ),
      title: "Đăng ký xét tuyển",
      description: "Thời gian: 15/06 - 30/06/2025",
      status: "Còn lại: 61 ngày 13 giờ",
      statusColor: "#F3F4F6",
      buttonText: "Chưa đến thời gian đăng ký",
      buttonColor: "#E5E7EB",
      buttonTextColor: "#9CA3AF",
      borderColor: "#E5E7EB",
      disabled: true,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Action Cards - Row 1 */}
      <div className="max-w-[1272px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {actionCards.slice(0, 3).map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>

      {/* Action Cards - Row 2 */}
      <div className="max-w-[1272px] mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {actionCards.slice(3, 5).map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}