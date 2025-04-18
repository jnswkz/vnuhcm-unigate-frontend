import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ image, date, title, description, id }) => {
  return (
    <div className="border border-gray-200 rounded-lg">
      <img src={image} alt={title} className="w-full h-52 rounded-t-lg" />
      <div className="p-5">
        <p className="text-gray-500 text-sm">{date}</p>
        <h2 className="text-[#0056B3] text-xl font-bold mt-2">{title}</h2>
        <p className="text-gray-700 mt-2">{description}</p>
        <Link
          to={`/news/${id}`} // Điều hướng đến trang chi tiết bài viết
          className="mt-5 bg-[#EBF5FF] text-[#0056B3] px-6 py-3 rounded-md font-bold inline-block"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;