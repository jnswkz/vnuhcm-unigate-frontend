import { Link } from 'react-router-dom';

const ActionCard = ({
  icon,
  title,
  description,
  status,
  statusColor,
  buttonText,
  buttonColor,
  buttonTextColor = "#FFFFFF",
  borderColor,
  disabled = false,
  link,
  onClick,
}) => {
  // Hàm kiểm tra xem thời gian còn lại có dưới 24 giờ không
  const isTimeCritical = (statusText) => {
    if (!statusText || statusText === "Đã kết thúc") return false;
    const timeParts = statusText.match(/(\d+) ngày (\d+) giờ (\d+) phút (\d+) giây/);
    if (!timeParts) return false;
    const days = parseInt(timeParts[1], 10);
    const hours = parseInt(timeParts[2], 10);
    return days === 0 && hours < 24; // Trả về true nếu dưới 24 giờ
  };

  return (
    <div
      className={`border rounded-lg p-4 sm:p-6 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg w-full max-w-[400px] mx-auto sm:max-w-none`}
      style={{ borderColor }}
    >
      <div className="flex items-center space-x-3 animate-fade-in">
        {icon}
        <h3 className="text-lg font-bold text-[#0056B3] font-roboto">{title}</h3>
      </div>
      <p
        className="mt-2 text-sm text-[#6B7280] font-roboto animate-fade-in"
        style={{ animationDelay: '100ms' }}
      >
        {description}
      </p>
      {/* Hiển thị đồng hồ đếm ngược (status) nếu có */}
      {status && (
        <div
          className={`mt-2 text-sm font-medium rounded-md px-3 py-1 inline-block animate-slide-right ${
            isTimeCritical(status) ? 'animate-pulse text-red-600' : ''
          }`}
          style={{ backgroundColor: statusColor, animationDelay: '200ms' }}
        >
          {status}
        </div>
      )}
      <div className="mt-4 flex justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
        {link ? (
          <Link
            to={link}
            className={`w-[160px] h-[40px] text-sm font-bold font-roboto rounded-md flex items-center justify-center transform transition-all duration-200 hover:scale-110 hover:opacity-90 active:scale-95 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          >
            {buttonText}
          </Link>
        ) : onClick ? (
          <button
            onClick={onClick}
            className={`w-[160px] h-[40px] text-sm font-bold font-roboto rounded-md transform transition-all duration-200 hover:scale-110 hover:opacity-90 active:scale-95 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          >
            {buttonText}
          </button>
        ) : (
          <button
            disabled={disabled}
            className={`w-[160px] h-[40px] text-sm font-bold font-roboto rounded-md transform transition-all duration-200 hover:scale-110 hover:opacity-90 active:scale-95 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionCard;