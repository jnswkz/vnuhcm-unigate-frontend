import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="w-full bg-[#0056B3] mx-auto max-w-0x1 px-4 py-16">
      <div 
        className="mx-auto rounded-lg overflow-hidden"
        style={{ maxWidth: '1200px' }}
      >
        <div
          className="relative w-full py-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('src/assets/dhqg.webp')",
          }}
        >
          {/* Overlay màu xanh nhạt */}
          <div className="absolute inset-0 bg-blue-500/35"></div>
          
          <div className="relative z-10 text-center text-white px-4">
            {/* Tiêu đề */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Cổng thông tin tuyển sinh thông minh ĐHQG TP.HCM
            </h1>
            
            {/* Mô tả */}
            <p className="text-base md:text-lg max-w-4xl mx-auto">
              Nền tảng toàn diện cho thí sinh tham gia kỳ thi Đánh giá năng lực. Đăng ký dự thi, xét tuyển, tra cứu 
              kết quả và nhận tư vấn ngành học phù hợp với năng lực của bạn.
            </p>
            
            {/* Nút CTA */}
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link
                to="/dang-ky-du-thi"
                className="px-6 py-3 bg-white text-[#0056B3] font-medium rounded-md hover:bg-gray-100 transition-colors w-full md:w-auto"
              >
                Đăng ký dự thi
              </Link>
              <Link
                to="/tim-hieu-them"
                className="px-6 py-3 bg-[#3182CE] text-white font-medium rounded-md hover:bg-blue-600 transition-colors w-full md:w-auto"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}