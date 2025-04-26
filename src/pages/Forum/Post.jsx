export default function PostDetailPage() {
    return (
      <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
        {/* Top Tag + Time */}
        <div className="text-sm text-gray-500 mb-2">Thảo luận chung • 2 giờ trước</div>
  
        {/* Author + Avatar */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-10 h-10 rounded-full bg-gray-300" /> {/* Placeholder avatar */}
          <div>
            <p className="font-semibold">Lê Văn C</p>
            <p className="text-sm text-gray-500">Thành viên</p>
          </div>
        </div>
  
        {/* Title */}
        <h2 className="text-2xl font-bold mt-2 mb-2">Hướng dẫn đăng ký xét tuyển năm 2024</h2>
  
        {/* Content */}
        <p className="text-gray-700 mb-4">
          Xin chào mọi người, <br />
          Tôi muốn chia sẻ một số thông tin quan trọng về quy trình đăng ký xét tuyển năm 2024.
          Hy vọng những thông tin này sẽ giúp ích cho các bạn trong quá trình chuẩn bị hồ sơ. <br />
          Các bạn có thắc mắc gì có thể để lại bình luận phía dưới.
        </p>
  
        {/* Actions */}
        <div className="flex gap-4 text-sm text-gray-600 border-t pt-3">
          <span>❤️ 25</span>
          <span>💬 Trả lời</span>
          <span>📤 Chia sẻ</span>
        </div>
  
        {/* Replies */}
        <div className="mt-6 space-y-4">
          {/* Comment 1 */}
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div>
                <p className="font-medium">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </div>
            </div>
            <p className="text-gray-700 mt-2">
              Cảm ơn bạn đã chia sẻ thông tin hữu ích. Tôi có một số câu hỏi liên quan đến vấn đề này.
            </p>
            <div className="text-sm text-gray-500 mt-2">❤️ 5 • Trả lời</div>
          </div>
  
          {/* Comment 2 */}
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div>
                <p className="font-medium">Trần Thị B</p>
                <p className="text-xs text-gray-500">1 giờ trước</p>
              </div>
            </div>
            <p className="text-gray-700 mt-2">
              Theo kinh nghiệm của tôi thì chúng ta nên xem xét thêm các yếu tố khác nữa.
            </p>
            <div className="text-sm text-gray-500 mt-2">❤️ 3 • Trả lời</div>
          </div>
        </div>
      </div>
    );
  }
  