import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const [filter, setFilter] = useState('Tất cả'); // Trạng thái bộ lọc

  const newsItems = [
    {
      id: '1',
      category: 'Tuyển sinh',
      image: "https://placehold.co/388x200",
      date: "15/03/2024",
      title: "Thông báo tuyển sinh năm học 2024-2025",
      description: "Đại học Quốc gia TP.HCM thông báo kế hoạch tuyển sinh đại học chính quy năm 2024 với nhiều phương thức xét tuyển mới.",
    },
    {
      id: '2',
      category: 'Kỳ thi',
      image: "https://placehold.co/388x200",
      date: "10/03/2024",
      title: "Hướng dẫn đăng ký dự thi ĐGNL",
      description: "Chi tiết các bước đăng ký dự thi đánh giá năng lực, những lưu ý quan trọng và thời gian biểu cụ thể.",
    },
    {
      id: '3',
      category: 'Học thuật',
      image: "https://placehold.co/388x200",
      date: "05/03/2024",
      title: "Thông tin ngành đào tạo mới",
      description: "Giới thiệu các ngành đào tạo mới được mở trong năm học 2024-2025 cùng cơ hội việc làm sau khi tốt nghiệp.",
    },
    {
      id: '4',
      category: 'Sự kiện',
      image: "https://placehold.co/388x200",
      date: "01/03/2024",
      title: "Ngày hội tư vấn tuyển sinh 2024",
      description: "Sự kiện tư vấn tuyển sinh lớn nhất trong năm với sự tham gia của các chuyên gia hàng đầu.",
    },
  ];

  // Lọc bài viết theo danh mục
  const filteredNews = filter === 'Tất cả' ? newsItems : newsItems.filter(news => news.category === filter);

  return (
    <div className="w-full min-h-screen bg-white font-roboto">
      {/* Main Content */}
      <div className="pt-10 px-5">
        <div className="w-full h-52 bg-[#EBF5FF] rounded-t-lg">
          <h1 className="text-[#0056B3] text-3xl font-bold pt-8 pl-5">Tin tức</h1>
          <div className="mt-5 pl-5">
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              className="w-full max-w-[1217px] h-12 border border-gray-200 rounded-md px-5 text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-5 mt-5">
          {['Tất cả', 'Tuyển sinh', 'Kỳ thi', 'Học thuật', 'Sự kiện'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)} // Cập nhật bộ lọc
              className={`px-6 py-3 rounded-md font-bold ${
                filter === category
                  ? 'bg-[#0056B3] text-white'
                  : 'bg-[#EBF5FF] text-[#0056B3]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {filteredNews.map((news) => (
            <div key={news.id} className="border border-gray-200 rounded-lg">
              <img src={news.image} alt={news.title} className="w-full h-52 rounded-t-lg" />
              <div className="p-5">
                <p className="text-gray-500 text-sm">{news.date}</p>
                <h2 className="text-[#0056B3] text-xl font-bold mt-2">{news.title}</h2>
                <p className="text-gray-700 mt-2">{news.description}</p>
                <Link
                  to={`/news/${news.id}`} 
                  className="mt-5 bg-[#EBF5FF] text-[#0056B3] px-6 py-3 rounded-md font-bold inline-block"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;