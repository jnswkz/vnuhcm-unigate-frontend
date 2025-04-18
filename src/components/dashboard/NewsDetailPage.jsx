import React from 'react';
import { useParams, Link } from 'react-router-dom';

const NewsDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL

  // Dữ liệu mẫu (có thể thay bằng API hoặc state từ props)
  const newsData = {
    1: {
      title: 'Thông báo tuyển sinh năm học 2024-2025',
      source: 'Đại học Quốc gia TP.HCM',
      date: '15/03/2024',
      image: 'https://placehold.co/960x480',
      content: 'Nội dung chi tiết bài viết 1...',
    },
    2: {
      title: 'Hướng dẫn đăng ký dự thi ĐGNL',
      source: 'Đại học Quốc gia TP.HCM',
      date: '10/03/2024',
      image: 'https://placehold.co/960x480',
      content: 'Nội dung chi tiết bài viết 2...',
    },
    3: {
      title: 'Thông tin ngành đào tạo mới',
      source: 'Đại học Quốc gia TP.HCM',
      date: '05/03/2024',
      image: 'https://placehold.co/960x480',
      content: 'Nội dung chi tiết bài viết 3...',
    },
    4: {
      title: 'Ngày hội tư vấn tuyển sinh 2024',
      source: 'Đại học Quốc gia TP.HCM',
      date: '01/03/2024',
      image: 'https://placehold.co/960x480',
      content: 'Nội dung chi tiết bài viết 4...',
    },
  };

  const article = newsData[id]; // Lấy bài viết theo ID

  if (!article) {
    return <div>Bài viết không tồn tại.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-[1257px] mx-auto mt-10">
        {/* Breadcrumb */}
        <nav className="text-gray-500 text-sm mb-5">
          <Link to="/" className="hover:underline">Trang chủ</Link> /{' '}
          <Link to="/news" className="hover:underline">Tin tức</Link> /{' '}
          <span className="text-gray-700">Chi tiết</span>
        </nav>

        {/* Nội dung bài báo */}
        <h1 className="text-[#0056B3] text-4xl font-bold">{article.title}</h1>
        <div className="flex items-center mt-8">
          <span className="ml-4 text-[#6B7280]">{article.source}</span>
          <span className="ml-8 text-[#6B7280]">{article.date}</span>
        </div>
        <img src={article.image} alt={article.title} className="w-full h-auto mt-8 rounded-lg" />
        <p className="mt-8 text-lg text-[#374151]">{article.content}</p>
      </div>
    </div>
  );
};

export default NewsDetailPage;