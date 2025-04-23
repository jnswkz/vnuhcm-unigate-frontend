import { NavLink } from 'react-router-dom';
import Tabs from '../../components/Tabs';

export default function QuyCheThi() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Tabs />

      {/* Nội dung chính */}
      <div className="max-w-[1224px] mx-auto mt-8">
        <h1 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px]">
          Quy chế thi ĐGNL
        </h1>

        {/* Khối nội dung */}
        <div className="mt-12 bg-[#F8FAFC] rounded-lg p-8">
          <div className="text-base text-[#333333] font-roboto leading-6">
            <p>
              Quy chế thi Đánh giá Năng lực (ĐGNL) được ban hành nhằm đảm bảo tính công bằng, minh bạch và nghiêm túc trong quá trình tổ chức kỳ thi. Quy chế bao gồm các quy định về:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Điều kiện đăng ký dự thi.</li>
              <li>Quy định về nộp lệ phí thi.</li>
              <li>Quy trình tổ chức thi tại các địa điểm.</li>
              <li>Các hành vi bị cấm trong phòng thi.</li>
              <li>Xử lý vi phạm và khiếu nại.</li>
            </ul>
            <p className="mt-4">
              Thí sinh cần đọc kỹ quy chế trước khi tham gia kỳ thi để đảm bảo tuân thủ đầy đủ các quy định. Chi tiết quy chế có thể được tải xuống từ cổng thông tin của ĐHQG-HCM.
            </p>
          </div>

          {/* Nút tải quy chế */}
          <div className="mt-6">
            <a
              href="#"
              className="inline-block px-6 py-3 bg-[#0056B3] text-white font-medium font-roboto rounded-md hover:bg-[#004494] transition-colors"
            >
              Tải quy chế thi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}