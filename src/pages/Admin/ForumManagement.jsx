import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForumManagement = () => {
  const navigate = useNavigate();

  // Giả lập dữ liệu bài viết diễn đàn
  const [posts, setPosts] = useState([
    { id: 1, title: 'Hướng dẫn giải bài tập Toán', author: 'Nguyen Van A', category: 'Toán học', status: 'Approved', comments: 15, date: '2023-12-01', flagged: false, content: 'Đây là bài viết hướng dẫn giải bài tập Toán, bao gồm các phương pháp giải chi tiết.' },
    { id: 2, title: 'Thảo luận về Văn học hiện đại', author: 'Tran Thi B', category: 'Ngữ văn', status: 'Pending', comments: 8, date: '2023-12-02', flagged: true, content: 'Để học tốt môn Văn, việc đầu tiên là phải xây dựng được tư duy phân tích và cảm thụ văn học. Bài viết này sẽ chia sẻ những phương pháp học Văn hiệu quả mà mình đã áp dụng…' },
    { id: 3, title: 'Tips học ngoại ngữ', author: 'John Smith', category: 'Tiếng Anh', status: 'Approved', comments: 22, date: '2023-12-02', flagged: false, content: 'Học ngoại ngữ cần kiên trì, đây là một số mẹo giúp bạn cải thiện kỹ năng nghe, nói, đọc, viết.' },
    { id: 4, title: 'Bài tập Vật lý khó', author: 'Le Van C', category: 'Vật lý', status: 'Rejected', comments: 5, date: '2023-12-03', flagged: true, content: 'Bài tập Vật lý này yêu cầu kiến thức nâng cao về chuyển động, lực và năng lượng.' },
    { id: 5, title: 'Chia sẻ kinh nghiệm học Hóa', author: 'Pham Thi D', category: 'Hóa học', status: 'Approved', comments: 12, date: '2023-12-03', flagged: false, content: 'Kinh nghiệm học Hóa hiệu quả: ghi nhớ phương trình phản ứng và thực hành nhiều bài tập.' },
  ]);

  // State cho bộ lọc trạng thái
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  // State cho modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  // State để quản lý tab active trong modal
  const [activeTab, setActiveTab] = useState('Nội dung');

  // Giả lập dữ liệu bình luận cho từng bài viết
  const commentsData = {
    1: [
      { id: 1, user: 'Le Van D', content: 'Bài viết rất hữu ích, cảm ơn bạn đã chia sẻ!', date: '2023-12-01 10:30' },
      { id: 2, user: 'Nguyen Thi E', content: 'Mình đã áp dụng phương pháp này và thấy hiệu quả lắm!', date: '2023-12-01 11:15' },
    ],
    2: [
      { id: 1, user: 'Pham Van F', content: 'Phân tích rất sâu sắc, mình học được nhiều từ bài viết này.', date: '2023-12-02 09:45' },
      { id: 2, user: 'Hoang Thi G', content: 'Cảm ơn bạn, mình sẽ thử áp dụng cách học này!', date: '2023-12-02 14:20' },
    ],
    3: [
      { id: 1, user: 'Tran Van H', content: 'Những mẹo này thực sự giúp mình cải thiện kỹ năng nghe rất nhiều!', date: '2023-12-02 08:10' },
      { id: 2, user: 'Nguyen Van I', content: 'Bài viết hay, nhưng mình mong có thêm ví dụ cụ thể.', date: '2023-12-02 16:30' },
    ],
    4: [
      { id: 1, user: 'Le Thi K', content: 'Bài tập này khó thật, cảm ơn bạn đã chia sẻ cách giải.', date: '2023-12-03 13:00' },
    ],
    5: [
      { id: 1, user: 'Pham Thi L', content: 'Mình thấy cách học này rất hiệu quả, cảm ơn bạn nhé!', date: '2023-12-03 09:20' },
      { id: 2, user: 'Hoang Van M', content: 'Có thêm tài liệu tham khảo thì tốt hơn nữa!', date: '2023-12-03 15:40' },
    ],
  };

  // Lọc danh sách bài viết dựa trên trạng thái
  const filteredPosts = posts.filter((post) => {
    if (filterStatus === 'Tất cả') return true;
    if (filterStatus === 'Flagged') return post.flagged === true;
    if (filterStatus === 'Pending') return post.status === 'Pending';
    if (filterStatus === 'Approved') return post.status === 'Approved';
    if (filterStatus === 'Rejected') return post.status === 'Rejected';
    return false;
  });

  // Hàm mở modal khi nhấn vào tiêu đề bài đăng
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    setActiveTab('Nội dung'); // Mặc định mở tab "Nội dung" khi mở modal
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Hàm xử lý duyệt bài viết
  const handleApprove = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: 'Approved' } : post));
    console.log('Duyệt bài viết:', id);
    closeModal();
  };

  // Hàm xử lý từ chối bài viết
  const handleReject = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: 'Rejected' } : post));
    console.log('Từ chối bài viết:', id);
    closeModal();
  };

  // Hàm xử lý xóa bài viết
  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    console.log('Xóa bài viết:', id);
  };

  return (
    <div className="p-6">
      {/* Tiêu đề */}
      <h1 className="text-[24px] font-bold text-[#0056B3] mb-6">Quản lý diễn đàn</h1>

      {/* Bộ lọc trạng thái */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterStatus('Tất cả')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Tất cả'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Tất cả ({posts.length})
          </button>
          <button
            onClick={() => setFilterStatus('Pending')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Pending'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Chờ duyệt ({posts.filter(post => post.status === 'Pending').length})
          </button>
          <button
            onClick={() => setFilterStatus('Approved')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Approved'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Đã duyệt ({posts.filter(post => post.status === 'Approved').length})
          </button>
          <button
            onClick={() => setFilterStatus('Rejected')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Rejected'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Đã từ chối ({posts.filter(post => post.status === 'Rejected').length})
          </button>
          <button
            onClick={() => setFilterStatus('Flagged')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Flagged'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Bị báo cáo ({posts.filter(post => post.flagged === true).length})
          </button>
        </div>
      </div>

      {/* Bảng danh sách bài viết */}
      <div className="bg-white rounded-lg shadow-md overflow-auto h-[400px] flex flex-col h-fit">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-[14px] text-gray-700 border-b border-gray-300">
              <th className="px-6 py-4 text-left font-medium">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-4 text-left font-medium">Tiêu đề</th>
              <th className="px-6 py-4 text-left font-medium">Tác giả</th>
              <th className="px-6 py-4 text-left font-medium">Chuyên mục</th>
              <th className="px-6 py-4 text-left font-medium">Trạng thái</th>
              <th className="px-6 py-4 text-center font-medium">Bình luận</th>
              <th className="px-6 py-4 text-left font-medium">Ngày đăng</th>
              <th className="px-6 py-4 text-center font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  Không có bài viết nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="border-t border-gray-200 text-[14px] text-gray-900">
                  <td className="px-6 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.flagged && (
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <button
                        onClick={() => openModal(post)}
                        className="text-[#0056B3] hover:underline"
                      >
                        {post.title}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">{post.author}</td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] ${
                        post.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : post.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{post.comments}</td>
                  <td className="px-6 py-4">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      {post.status !== 'Approved' && (
                        <button
                          onClick={() => handleApprove(post.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                      )}
                      {post.status !== 'Rejected' && (
                        <button
                          onClick={() => handleReject(post.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M9 7v12m6-12v12M3 7h18"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-bold text-[#0056B3]">{selectedPost.title}</h2>
              <span
                className={`px-3 py-1 rounded-full text-[12px] ${
                  selectedPost.status === 'Approved'
                    ? 'bg-green-100 text-green-700'
                    : selectedPost.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedPost.status}
              </span>
            </div>
            <div className="mb-4 border-b border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('Nội dung')}
                  className={`pb-2 ${
                    activeTab === 'Nội dung'
                      ? 'text-[#0056B3] border-b-2 border-[#0056B3]'
                      : 'text-gray-500'
                  }`}
                >
                  Nội dung
                </button>
                <button
                  onClick={() => setActiveTab('Bình luận')}
                  className={`pb-2 ${
                    activeTab === 'Bình luận'
                      ? 'text-[#0056B3] border-b-2 border-[#0056B3]'
                      : 'text-gray-500'
                  }`}
                >
                  Bình luận
                </button>
              </div>
            </div>

            {/* Nội dung hiển thị dựa trên tab active */}
            {activeTab === 'Nội dung' ? (
              <>
                <p className="text-gray-700 mb-2"><strong>Tác giả:</strong> {selectedPost.author}</p>
                <p className="text-gray-700 mb-4"><strong>Ngày đăng:</strong> {selectedPost.date}</p>
                <p className="text-gray-700 mb-6">{selectedPost.content}</p>
              </>
            ) : (
              <div className="space-y-4">
                {commentsData[selectedPost.id]?.length > 0 ? (
                  commentsData[selectedPost.id].map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-2">
                      <p className="text-gray-700 font-semibold">{comment.user}</p>
                      <p className="text-gray-600 text-[14px]">{comment.content}</p>
                      <p className="text-gray-500 text-[12px]">{comment.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Chưa có bình luận nào.</p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              {selectedPost.status !== 'Rejected' && (
                <button
                  onClick={() => handleReject(selectedPost.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Từ chối
                </button>
              )}
              {selectedPost.status !== 'Approved' && (
                <button
                  onClick={() => handleApprove(selectedPost.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Phê duyệt
                </button>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumManagement;
