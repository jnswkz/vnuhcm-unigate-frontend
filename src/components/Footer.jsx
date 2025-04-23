import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0056B3] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Cột 1: Về chúng tôi */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-400">Về ĐHQG-TPHCM</h3>
            <ul className="space-y-3">
              <li><Link to="/gioi-thieu" className="hover:text-gray-200">Giới thiệu</Link></li>
              <li>
                <a
                  href="https://vnuhcm.edu.vn/ve-dhqg-hcm/33393364/313364/373364"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200"
                >
                  Các trường thành viên
                </a>
              </li>
              <li><Link to="/tin-tuc-su-kien" className="hover:text-gray-200">Tin tức & Sự kiện</Link></li>
              <li><Link to="/lien-he" className="hover:text-gray-200">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Cột 2: Kì thi ĐGNL */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-400">Kì thi ĐGNL</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/thong-tin-ky-thi" className="hover:text-gray-200">
                  Thông tin kỳ thi
                </Link>
              </li>
              <li>
                <Link to="/lich-thi" className="hover:text-gray-200">
                  Lịch thi
                </Link>
              </li>
              <li>
                <Link to="/cau-truc-de-thi" className="hover:text-gray-200">
                  Cấu trúc đề thi
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu/quy-che-thi" className="hover:text-gray-200">
                  Quy chế thi
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Xét tuyển */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-400">Xét tuyển</h3>
            <ul className="space-y-3">
              <li><Link to="/dang-ki-thi" className="hover:text-gray-200">Đăng kí thi</Link></li>
              <li><Link to="/dang-ki-xet-tuyen" className="hover:text-gray-200">Đăng kí xét tuyển</Link></li>
            </ul>
          </div>

          {/* Cột 4: Tài nguyên */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-400">Tài nguyên</h3>
            <ul className="space-y-3">
              <li><Link to="/thu-vien-so" className="hover:text-gray-200">Thư viện số</Link></li>
              <li><Link to="/bai-thi-thu" className="hover:text-gray-200">Bài thi thử</Link></li>
              <li><Link to="/dien-dan-hoc-tap" className="hover:text-gray-200">Diễn đàn học tập</Link></li>
              <li><Link to="/hoi-dap-thuong-gap" className="hover:text-gray-200">Hỏi đáp thường gặp</Link></li>
            </ul>
          </div>
          
          {/* Cột 5: Kết nối với chúng tôi */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-400">Kết nối với chúng tôi</h3>
            <div className="flex space-x-3">
              <a href="mailto:contact@vnuhcm-unigate.edu.vn" className="bg-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0056B3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="https://facebook.com/vnuhcmunigate" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0056B3]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Phần copyright */}
        <div className="mt-12 pt-6 border-t border-blue-400 text-center text-sm">
          <p>© 2025 VNUHCM-UNIGATE | Cổng thông tin tuyển sinh thông minh ĐHQG TPHCM | Đăng ký bản quyền.</p>
        </div>
      </div>
    </footer>
  );
}
