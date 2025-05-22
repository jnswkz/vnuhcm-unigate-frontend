import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const ForumManagement = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState('Nội dung');

  
  const fetchPosts = async () => {
    try {
      const res = await api.get("/api/get-posts"); 
      const fetchedPosts = res.data.map(post => ({
        id: post.id,
        title: post.question || 'Không có tiêu đề',
        author: post.username || 'Ẩn danh',
        category: post.topic || 'Chưa phân loại',
        status: post.status || 'Chờ duyệt',
        comments: post.answer ? post.answer.length : 0,
        date: post.date || '',
        flagged: false, 
        content: post.content || '',
        answers: post.answer || [], 
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Lỗi khi fetch bài viết:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filterStatus === 'Tất cả') return true;
    if (filterStatus === 'Flagged') return post.flagged === true;
    if (filterStatus === 'Pending') return post.status === 'Chờ duyệt';
    if (filterStatus === 'Approved') return post.status === 'Đã duyệt';
    if (filterStatus === 'Rejected') return post.status === 'Đã từ chối';
    return false;
  });

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    setActiveTab('Nội dung');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleApprove = async (id) => {
    try {
      await api.post('/api/update-post', {
        post_id: id,
        updated_post: { status: "Đã duyệt" }
      });
      await fetchPosts();
      closeModal();
    } catch (error) {
      console.error('Lỗi phê duyệt bài viết:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await api.post('/api/update-post', {
        post_id: id,
        updated_post: { status: "Đã từ chối" }
      });
      await fetchPosts();
      closeModal();
    } catch (error) {
      console.error('Lỗi từ chối bài viết:', error);
    }
  };
  
  const handleDelete = async (id) => {
    // alert("bee");
    try {
      await api.post('/api/delete-post', { post_id: id });
      await fetchPosts();
    } catch (error) {
      console.error('Lỗi xóa bài viết:', error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-[24px] font-bold text-[#0056B3] mb-6">Quản lý diễn đàn</h1>

      {/* Bộ lọc */}
      <div className="flex space-x-2 mb-6">
        {['Tất cả', 'Pending', 'Approved', 'Rejected', 'Flagged'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === status ? 'bg-[#0056B3] text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {status} ({status === 'Flagged' ? posts.filter(p => p.flagged).length : posts.filter(p => p.status === status || (status === 'Pending' && p.status === 'Chờ duyệt') || (status === 'Approved' && p.status === 'Đã duyệt') || (status === 'Rejected' && p.status === 'Đã từ chối')).length})
          </button>
        ))}
      </div>

      {/* Bảng danh sách bài viết */}
      <div className="bg-white rounded-lg shadow-md overflow-auto max-h-[400px]">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-[14px] text-gray-700 border-b border-gray-300">
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
                <td colSpan="7" className="text-center text-gray-500 py-4">Không có bài viết nào.</td>
              </tr>
            ) : (
              filteredPosts.map(post => (
                <tr key={post.id} className="border-t text-gray-900">
                  <td className="px-6 py-4">
                    <button onClick={() => openModal(post)} className="text-[#0056B3] hover:underline">
                      {post.title}
                    </button>
                  </td>
                  <td className="px-6 py-4">{post.author}</td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] ${
                      post.status === 'Đã duyệt' ? 'bg-green-100 text-green-700' :
                      post.status === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{post.comments}</td>
                  <td className="px-6 py-4">{post.date}</td>
                  <td className="px-6 py-4 flex justify-center space-x-2">
                    <button onClick={() => handleApprove(post.id)} className="text-green-500 hover:text-green-700">✔️</button>
                    <button onClick={() => handleReject(post.id)} className="text-red-500 hover:text-red-700">❌</button>
                    <button onClick={() => handleDelete(post.id)} className="text-gray-500 hover:text-gray-700">🗑️</button>
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
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>

          <div className="bg-white rounded-lg p-6 w-full max-w-2xl z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-bold text-[#0056B3]">{selectedPost.title}</h2>
              <span className="text-sm">{selectedPost.status}</span>
            </div>

            <div className="flex space-x-4 border-b pb-2 mb-4">
              <button
                onClick={() => setActiveTab('Nội dung')}
                className={`pb-1 ${activeTab === 'Nội dung' ? 'text-[#0056B3] border-b-2 border-[#0056B3]' : 'text-gray-500'}`}
              >
                Nội dung
              </button>
              <button
                onClick={() => setActiveTab('Bình luận')}
                className={`pb-1 ${activeTab === 'Bình luận' ? 'text-[#0056B3] border-b-2 border-[#0056B3]' : 'text-gray-500'}`}
              >
                Bình luận
              </button>
            </div>

            {activeTab === 'Nội dung' ? (
              <>
                <p><strong>Tác giả:</strong> {selectedPost.author}</p>
                <p><strong>Ngày đăng:</strong> {selectedPost.date}</p>
                <p className="mt-4">{selectedPost.content}</p>
              </>
            ) : (
              <div className="space-y-3">
                {selectedPost.answers.length > 0 ? selectedPost.answers.map((ans, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="font-semibold">{ans.username}</p>
                    <p>{ans.answer}</p>
                    <p className="text-gray-500 text-[12px]">{ans.date}</p>
                  </div>
                )) : (
                  <p>Chưa có bình luận.</p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumManagement;