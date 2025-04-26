import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';

const NewsPage = () => {
  const [filter, setFilter] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const newsItems = [
    {
      id: '1',
      category: 'Tuyển sinh',
      image: "/src/assets/thongbao.png",
      date: "15/03/2024",
      title: "Thông báo tuyển sinh năm học 2024-2025",
      description: "Đại học Quốc gia TP.HCM thông báo kế hoạch tuyển sinh đại học chính quy năm 2024 với nhiều phương thức xét tuyển mới.",
    },
    {
      id: '2',
      category: 'Kỳ thi',
      image: "/src/assets/dgnl2.jpg",
      date: "10/03/2024",
      title: "Hướng dẫn đăng ký dự thi ĐGNL",
      description: "Chi tiết các bước đăng ký dự thi đánh giá năng lực, những lưu ý quan trọng và thời gian biểu cụ thể.",
    },
    {
      id: '3',
      category: 'Học thuật',
      image: "/src/assets/thongtin.jpg",
      date: "05/03/2024",
      title: "Thông tin ngành đào tạo mới",
      description: "Giới thiệu các ngành đào tạo mới được mở trong năm học 2024-2025 cùng cơ hội việc làm sau khi tốt nghiệp.",
    },
    {
      id: '4',
      category: 'Sự kiện',
      image: '/src/assets/tuyensinh.jpg',
      date: "01/03/2024",
      title: "Ngày hội tư vấn tuyển sinh 2024",
      description: "Sự kiện tư vấn tuyển sinh lớn nhất trong năm với sự tham gia của các chuyên gia hàng đầu.",
    },
  ];

  // Simulate page loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  // Filter news items by category and search term
  const filteredNews = newsItems
    .filter(news => filter === 'Tất cả' || news.category === filter)
    .filter(news => 
      searchTerm === '' || 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const categories = ['Tất cả', 'Tuyển sinh', 'Kỳ thi', 'Học thuật', 'Sự kiện'];

  return (
    <div className={`w-full min-h-screen bg-white font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header Banner with Gradient */}
      <div className="pt-10 px-5">
        <div className="w-full h-52 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
          <h1 className="text-blue-700 text-4xl font-bold pt-8 pl-5 transition-transform duration-500 transform translate-y-0">
            Tin tức
            <div className="w-20 h-1 bg-blue-500 mt-2 rounded-full"></div>
          </h1>
          
          {/* Search Bar with Icon */}
          <div className="mt-8 pl-5 pr-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-6xl h-12 border border-gray-200 rounded-md pl-12 pr-5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Filter Buttons with Animation */}
        <div className="flex flex-wrap gap-3 mt-8">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-md font-bold transition-all duration-300 transform hover:scale-105 ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Cards with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 pb-10">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <div 
                key={news.id} 
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-white"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 500ms ease, transform 500ms ease',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110" 
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-sm font-medium px-3 py-1 bg-blue-50 rounded-full">
                      {news.category}
                    </span>
                    <p className="text-gray-500 text-sm">{news.date}</p>
                  </div>
                  
                  <h2 className="text-blue-700 text-xl font-bold mt-3 line-clamp-2 hover:text-blue-800 transition-colors duration-300">
                    {news.title}
                  </h2>
                  
                  <p className="text-gray-600 mt-2 line-clamp-3">{news.description}</p>
                  
                  <Link
                    to={`/news/${news.id}`} 
                    className="mt-5 group flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
                  >
                    Xem chi tiết
                    <ChevronRight size={18} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500 text-lg">Không tìm thấy kết quả phù hợp</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
