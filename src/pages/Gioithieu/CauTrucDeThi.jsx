import { NavLink } from 'react-router-dom';
import Tabs from '../../components/Tabs';
export default function CauTrucDeThi() {
  return (
    <div className="w-full min-h-screen bg-white">
     <Tabs />

      {/* Nội dung chính */}
      <div className="max-w-[1224px] mx-auto mt-8">
        <h1 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px]">
          Cấu trúc bài thi ĐGNL
        </h1>

        {/* Khối nội dung */}
        <div className="mt-12 grid grid-cols-2 gap-8">
          {/* Phần 1: Ngôn ngữ */}
          <div className="bg-[#F8FAFC] p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
                  Phần 1: Ngôn ngữ
                </div>
                <ul className="mt-4 space-y-2 text-base text-[#333333] font-roboto leading-6">
                  <li>Đọc hiểu</li>
                  <li>Từ vựng - Ngữ pháp</li>
                  <li>Giải nghĩa - Đồng nghĩa</li>
                  <li>Tìm lỗi sai</li>
                </ul>
              </div>
              <div className="text-right">
                <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">30</div>
                <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                  Câu hỏi trắc nghiệm
                </div>
              </div>
            </div>
          </div>

          {/* Phần 2: Toán học, tư duy logic */}
          <div className="bg-[#F8FAFC] p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
                  Phần 2: Toán học, tư duy logic
                </div>
                <ul className="mt-4 space-y-2 text-base text-[#333333] font-roboto leading-6">
                  <li>Số học</li>
                  <li>Đại số</li>
                  <li>Hình học</li>
                  <li>Xác suất thống kê</li>
                </ul>
              </div>
              <div className="text-right">
                <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">30</div>
                <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                  Câu hỏi trắc nghiệm
                </div>
              </div>
            </div>
          </div>

          {/* Phần 3: Giải quyết vấn đề */}
          <div className="bg-[#F8FAFC] p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
                  Phần 3: Giải quyết vấn đề
                </div>
                <ul className="mt-4 space-y-2 text-base text-[#333333] font-roboto leading-6">
                  <li>Suy luận logic</li>
                  <li>Phân tích dữ liệu</li>
                  <li>Giải quyết tình huống</li>
                  <li>Kỹ năng phán đoán</li>
                </ul>
              </div>
              <div className="text-right">
                <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">30</div>
                <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                  Câu hỏi trắc nghiệm
                </div>
              </div>
            </div>
          </div>

          {/* Phần 4: Kiến thức xã hội */}
          <div className="bg-[#F8FAFC] p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
                  Phần 4: Kiến thức xã hội
                </div>
                <ul className="mt-4 space-y-2 text-base text-[#333333] font-roboto leading-6">
                  <li>Lịch sử, địa lý</li>
                  <li>Kinh tế, văn hóa</li>
                  <li>Thời sự, chính trị</li>
                  <li>Khoa học, công nghệ</li>
                </ul>
              </div>
              <div className="text-right">
                <div className="text-[24px] font-bold text-[#0056B3] font-roboto leading-9">30</div>
                <div className="mt-2 text-sm text-[#666666] font-roboto leading-[21px]">
                  Câu hỏi trắc nghiệm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}