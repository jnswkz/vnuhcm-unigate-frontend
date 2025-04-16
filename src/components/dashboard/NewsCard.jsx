export default function NewsCard({ image, date, title, description }) {
    return (
      <div className="w-full h-[482px] bg-white rounded-lg border border-[#E5E7EB]">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] rounded-t-lg object-cover"
        />
        <div className="p-6 space-y-4">
          <p className="text-[14px] text-[#6B7280] font-roboto leading-[21px]">
            {date}
          </p>
          <h3 className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
            {title}
          </h3>
          <p className="text-[16px] text-[#374151] font-roboto leading-[24px]">
            {description}
          </p>
          <button className="w-[132px] h-[48px] bg-[#EBF5FF] text-[#0056B3] text-[16px] font-roboto font-bold rounded-md hover:bg-[#d1e4ff]">
            Xem chi tiết
          </button>
        </div>
      </div>
    );
  }