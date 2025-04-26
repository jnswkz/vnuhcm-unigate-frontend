import { NavLink } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import { FaCheckSquare, FaClock, FaTrophy, FaUniversity, FaMapMarkerAlt } from 'react-icons/fa';
import CountUp from 'react-countup';

export default function GioiThieuKyThi() {
  const stats = [
    {
      number: 120,
      label: "Câu hỏi trắc nghiệm",
      icon: <FaCheckSquare className="w-6 h-6 text-[#0056B3]" />,
    },
    {
      number: 150,
      label: "Phút làm bài",
      icon: <FaClock className="w-6 h-6 text-[#0056B3]" />,
    },
    {
      number: 1200,
      label: "Điểm tối đa",
      icon: <FaTrophy className="w-6 h-6 text-[#0056B3]" />,
    },
    {
      number: 103,
      label: "Trường đại học, cao đẳng sử dụng kết quả để xét tuyển",
      icon: <FaUniversity className="w-6 h-6 text-[#0056B3]" />,
    },
    {
      number: 25,
      label: "Tỉnh/Thành phố có tổ chức thi đợt 1",
      icon: <FaMapMarkerAlt className="w-6 h-6 text-[#0056B3]" />,
    },
    {
      number: 11,
      label: "Tỉnh/Thành phố có tổ chức thi đợt 2",
      icon: <FaMapMarkerAlt className="w-6 h-6 text-[#004494]" />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <Tabs />

      {/* Nội dung chính */}
      <div className="max-w-[1224px] mx-auto mt-12 px-4">
        <h1 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px] animate-fade-in">
          Kỳ thi Đánh giá Năng lực (ĐGNL)
        </h1>
        <div className="flex mt-8">
          {/* Cột trái: Tiêu đề, mô tả, số liệu */}
          <div className="w-[824px] animate-slide-up">
            <p className="text-base text-[#333333] font-roboto leading-6">
              Kỳ thi Đánh giá Năng lực là một trong những phương thức xét tuyển của ĐHQG-HCM. Kỳ thi này đánh giá toàn
              diện các năng lực của thí sinh thông qua các câu hỏi trắc nghiệm đa dạng, giúp các trường thành viên có thêm
              cơ sở tuyển chọn được những thí sinh phù hợp.
            </p>

            {/* Khối số liệu */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#EBF5FF] p-6 rounded-xl shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-[28px] font-bold text-[#0056B3] font-roboto leading-9">
                        <CountUp
                          start={0}
                          end={item.number}
                          duration={2}
                          delay={index * 0.1}
                          useEasing={true}
                          separator=","
                        />
                      </div>
                      <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">{item.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải: Hình ảnh minh họa */}
          <div className="w-[400px] ml-6 animate-slide-right">
            <img
              src="https://cly.1cdn.vn/2023/03/22/danh-gia-nang-luc-dhqg-hcm.jpg"
              alt="Minh họa kỳ thi ĐGNL"
              className="w-full h-[300px] rounded-xl object-cover border-2 border-[#EBF5FF] shadow-sm transform transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}