import React from 'react';
import Tabs from '../../components/Tabs';
import { motion } from 'framer-motion';
import { FaFileDownload, FaCheckCircle } from 'react-icons/fa';

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
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
};

export default function QuyCheThi() {
  const listItems = [
    "Điều kiện đăng ký dự thi.",
    "Quy định về nộp lệ phí thi.",
    "Quy trình tổ chức thi tại các địa điểm.",
    "Các hành vi bị cấm trong phòng thi.",
    "Xử lý vi phạm và khiếu nại.",
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <Tabs />

      {/* Nội dung chính */}
      <motion.div
        className="max-w-[1224px] mx-auto mt-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 font-roboto leading-tight text-center mb-8 drop-shadow-sm">
          Quy chế thi ĐGNL
        </h1>

        {/* Khối nội dung */}
        <motion.div
          className="mt-12 bg-gray-50 bg-opacity-90 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200"
          variants={itemVariants}
        >
          <motion.div
            className="text-base text-gray-800 font-roboto leading-7"
            variants={itemVariants}
          >
            <p>
              Quy chế thi Đánh giá Năng lực (ĐGNL) được ban hành nhằm đảm bảo tính công bằng, minh bạch và nghiêm túc trong quá trình tổ chức kỳ thi. Quy chế bao gồm các quy định về:
            </p>
            <ul className="mt-4 space-y-3 list-none pl-0">
              {listItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-800"
                  variants={itemVariants}
                >
                  <FaCheckCircle className="text-blue-600 mr-3" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.p className="mt-4" variants={itemVariants}>
              Thí sinh cần đọc kỹ quy chế trước khi tham gia kỳ thi để đảm bảo tuân thủ đầy đủ các quy định. Chi tiết quy chế có thể được tải xuống từ cổng thông tin của ĐHQG-HCM.
            </motion.p>
          </motion.div>

          {/* Nút tải quy chế */}
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <motion.a
              href="#"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium font-roboto rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-center">
                <FaFileDownload className="mr-2" />
                Tải quy chế thi
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}