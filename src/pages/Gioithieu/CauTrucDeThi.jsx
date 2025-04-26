import React from 'react';
import { NavLink } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import { motion, AnimatePresence } from 'framer-motion';

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const imageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CauTrucDeThi() {
  // Data for each section, including image URLs for hover
  const sections = [
    {
      title: 'Phần 1: Ngôn ngữ',
      items: ['Đọc hiểu', 'Từ vựng - Ngữ pháp', 'Giải nghĩa - Đồng nghĩa', 'Tìm lỗi sai'],
      questions: 30,
      image: 'https://via.placeholder.com/300x150?text=Ngôn+ngữ',
    },
    {
      title: 'Phần 2: Toán học, tư duy logic',
      items: ['Số học', 'Đại số', 'Hình học', 'Xác suất thống kê'],
      questions: 30,
      image: 'https://via.placeholder.com/300x150?text=Toán+học',
    },
    {
      title: 'Phần 3: Logic và Phân tích số liệu',
      items: ['Suy luận logic', 'Phân tích dữ liệu', 'Xử lý số liệu', 'Đọc biểu đồ, bảng số liệu'],
      questions: 30,
      image: 'https://via.placeholder.com/300x150?text=Logic+và+Phân+tích',
    },
    {
      title: 'Phần 4: Suy luận Khoa học',
      items: ['Khoa học tự nhiên', 'Khoa học xã hội', 'Tư duy phản biện', 'Phân tích vấn đề khoa học'],
      questions: 30,
      image: 'https://via.placeholder.com/300x150?text=Suy+luận+Khoa+học',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-[1224px] mx-auto px-4 py-4">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm font-roboto text-gray-600">
          
          </ol>
        </nav>
      </div>

      <Tabs />

      {/* Nội dung chính */}
      <motion.div
        className="max-w-[1224px] mx-auto mt-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#0056B3] font-roboto leading-tight">
          Cấu trúc bài thi ĐGNL
        </h1>

        {/* Khối nội dung */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              role="region"
              aria-label={section.title}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-bold text-[#0056B3] font-roboto leading-7">
                    {section.title}
                  </div>
                  <ul className="mt-4 space-y-2 text-base text-gray-700 font-roboto leading-6">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#0056B3] font-roboto leading-9">
                    {section.questions}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 font-roboto leading-[21px]">
                    Câu hỏi trắc nghiệm
                  </div>
                </div>
              </div>

              {/* Hover Image */}
              <AnimatePresence>
                <motion.div
                  className="absolute left-0 right-0 mt-4 hidden group-hover:block"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <img
                    src={section.image}
                    alt={`Minh họa ${section.title}`}
                    className="w-full h-[150px] rounded-md object-cover border border-gray-200"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}