export default function ActionCard({
    icon,
    title,
    description,
    status,
    statusColor,
    buttonText,
    buttonColor,
    buttonTextColor,
    borderColor,
    disabled,
  }) {
    return (
      <div
        className="w-full h-[252px] bg-white rounded-lg border"
        style={{ borderColor }}
      >
        <div className="p-8 space-y-4">
          <div className="flex items-center space-x-3">
            {icon}
            <h3
              className="text-[20px] font-bold font-roboto leading-[30px]"
              style={{ color: borderColor }}
            >
              {title}
            </h3>
          </div>
          <p className="text-[14px] text-[#6B7280] font-roboto leading-[21px]">
            {description}
          </p>
          {status && (
            <div
              className="w-full h-[40px] rounded-md flex items-center px-2"
              style={{ backgroundColor: statusColor }}
            >
              <span
                className="text-[14px] font-bold font-roboto leading-[21px]"
                style={{ color: borderColor === "#E5E7EB" ? "#6B7280" : "#0056B3" }}
              >
                {status}
              </span>
            </div>
          )}
          <button
            className="w-full h-[47px] text-white text-[16px] font-roboto font-bold rounded-md"
            style={{
              backgroundColor: buttonColor,
              color: buttonTextColor || "white",
            }}
            disabled={disabled}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }