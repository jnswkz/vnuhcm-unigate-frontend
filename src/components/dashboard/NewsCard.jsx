import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ image, date, title, description, id }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-52 rounded-t-lg hover:scale-105 transition-transform duration-500 object-cover" 
        />
      </div>
      <div className="p-5">
        <p className="text-gray-500 text-sm">{date}</p>
        <h2 className="text-blue-600 text-xl font-bold mt-2 hover:text-blue-800 transition-colors duration-300">{title}</h2>
        <p className="text-gray-700 mt-2 line-clamp-3">{description}</p>
        <Link
          to={`/news/${id}`}
          className="mt-5 bg-blue-50 text-blue-600 px-6 py-3 rounded-md font-bold inline-block hover:bg-blue-600 hover:text-white transition-all duration-300 group flex items-center"
        >
          <span>Xem chi tiết</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
