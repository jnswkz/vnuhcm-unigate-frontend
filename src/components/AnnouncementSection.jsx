import React, { useEffect } from 'react';

export default function AnnouncementSection() {
  useEffect(() => {
    // Điều chỉnh tốc độ animation dựa trên chiều rộng
    const adjustAnimationSpeed = () => {
      const cards = document.querySelectorAll('.announcement-card');
      if (cards.length > 0) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem = 32px
        
        // Tạo style mới cho animation
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-${cardWidth + gap}px * 4)); }
          }
        `;
        
        // Xóa style cũ nếu có
        const oldStyle = document.getElementById('announcement-animation-style');
        if (oldStyle) {
          oldStyle.remove();
        }
        
        // Thêm style mới
        styleEl.id = 'announcement-animation-style';
        document.head.appendChild(styleEl);
      }
    };

    // Gọi hàm khi component mount và khi resize
    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);
    
    // Cleanup khi unmount
    return () => {
      window.removeEventListener('resize', adjustAnimationSpeed);
      const oldStyle = document.getElementById('announcement-animation-style');
      if (oldStyle) {
        oldStyle.remove();
      }
    };
  }, []);

  const announcementItems = [
    {
      badge: 'QUAN TRỌNG',
      badgeColor: 'bg-blue-500',
      imageText: 'Thi ĐGNL',
      date: '15/04/2025',
      title: 'Lịch thi ĐGNL đợt 1 năm 2025 chính thức',
      excerpt: 'Thông báo lịch thi chi tiết các ngày thi đợt 1 kỳ thi ĐGNL ĐHQG TP.HCM năm 2025.',
      link: '/lich-thi'
    },
    {
      badge: 'MỚI',
      badgeColor: 'bg-blue-500',
      imageText: 'Hồ sơ',
      date: '10/04/2025',
      title: 'Hướng dẫn đăng ký thi ĐGNL 2025',
      excerpt: 'Hướng dẫn chi tiết quy trình đăng ký dự thi và những giấy tờ cần chuẩn bị.',
      link: '/huong-dan-dang-ky'
    },
    {
      badge: 'QUAN TRỌNG',
      badgeColor: 'bg-blue-500',
      imageText: 'Tài liệu',
      date: '05/04/2025',
      title: 'Tài liệu ôn thi ĐGNL năm 2025',
      excerpt: 'Cập nhật bộ tài liệu ôn tập chính thức từ các trường thành viên ĐHQG TP.HCM.',
      link: '/tai-lieu-on-thi'
    },
    {
      badge: 'MỚI',
      badgeColor: 'bg-blue-500',
      imageText: 'Xét tuyển',
      date: '01/04/2025',
      title: 'Chỉ tiêu xét tuyển các trường 2025',
      excerpt: 'Thông báo chỉ tiêu tuyển sinh bằng kết quả thi ĐGNL của các trường thành viên.',
      link: '/chi-tieu-tuyen-sinh'
    },
  ];

  // Tạo mảng lặp lại để tạo hiệu ứng cuộn vô hạn
  const allAnnouncements = [...announcementItems, ...announcementItems];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#0056B3] text-4xl font-bold mb-4">Tin tức mới nhất</h2>
          <p className="text-lg text-gray-600">Cập nhật những thông tin quan trọng về kỳ thi ĐGNL!</p>
        </div>
        
        <div className="relative mx-auto">
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Cards container with animation */}
          <div 
            className="flex gap-8 py-4 w-max animate-scroll hover:animation-play-state-paused"
            style={{
              animation: 'scroll 30s linear infinite',
              animationPlayState: 'running',
            }}
          >
            {allAnnouncements.map((item, index) => (
              <div 
                key={index}
                className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg flex-shrink-0 announcement-card"
              >
                <div className={`${item.badgeColor} text-white py-2 px-4 inline-block rounded-br-lg text-sm font-semibold`}>
                  {item.badge}
                </div>
                
                <div className="h-40 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">{item.imageText}</span>
                </div>
                
                <div className="p-6">
                  <div className="text-blue-600 text-sm mb-2">{item.date}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">{item.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-4">{item.excerpt}</p>
                  <a href={item.link} className="text-blue-600 font-semibold flex items-center gap-2 text-sm group">
                    Xem chi tiết 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}