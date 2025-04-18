import { NavLink } from 'react-router-dom';
import Tabs from '../../components/Tabs';
export default function GioiThieuKyThi() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Tabs />
    

      {/* Nội dung chính */}
      <div className="max-w-[1224px] mx-auto mt-8 flex">
        {/* Cột trái: Tiêu đề, mô tả, số liệu */}
        <div className="w-[824px]">
          <h1 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px]">
            Kỳ thi Đánh giá Năng lực (ĐGNL)
          </h1>
          <p className="mt-6 text-base text-[#333333] font-roboto leading-6">
            Kỳ thi Đánh giá Năng lực là một trong những phương thức xét tuyển của ĐHQG-HCM. Kỳ thi này đánh giá toàn
            diện các năng lực của thí sinh thông qua các câu hỏi trắc nghiệm đa dạng, giúp các trường thành viên có thêm
            cơ sở tuyển chọn được những thí sinh phù hợp.
          </p>

          {/* Khối số liệu */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {/* Khối 1: Câu hỏi trắc nghiệm */}
            <div className="bg-[#F8FAFC] p-6 rounded-lg">
              <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">120</div>
              <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                Câu hỏi trắc nghiệm
              </div>
            </div>
            {/* Khối 2: Phút làm bài */}
            <div className="bg-[#F8FAFC] p-6 rounded-lg">
              <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">150</div>
              <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                Phút làm bài
              </div>
            </div>
            {/* Khối 3: Điểm tối đa */}
            <div className="bg-[#F8FAFC] p-6 rounded-lg">
              <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">1200</div>
              <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                Điểm tối đa
              </div>
            </div>
            {/* Khối 4: Trường sử dụng kết quả */}
            <div className="bg-[#F8FAFC] p-6 rounded-lg">
              <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">103</div>
              <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                Trường đại học, cao đẳng <br /> sử dụng kết quả để xét tuyển
              </div>
            </div>
            {/* Khối 5: Tỉnh/Thành phố đợt 1 */}
            <div className="bg-[#F8FAFC] p-6 rounded-lg">
              <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">25</div>
              <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                Tỉnh/Thành phố <br /> có tổ chức thi đợt 1
              </div>
            </div>
            {/* Khối 6: Tỉnh/Thành phố đợt 2 */}
            <div className="bg-[#F8FAFC] p-6 rounded-lg">
              <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">11</div>
              <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                Tỉnh/Thành phố <br /> có tổ chức thi đợt 2
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Hình ảnh minh họa */}
        <div className="w-[400px] ml-6">
          <img
            src="https://placehold.co/400x300"
            alt="Minh họa kỳ thi ĐGNL"
            className="w-full h-[300px] rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}