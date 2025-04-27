import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/api/get-documents-list');
        const formattedDocs = response.data.map((doc) => ({
          id: doc.id,
          name: doc.title,            // lấy title làm name
          filename: doc.filename,     // giữ filename nếu cần download
          date: doc.date,
          downloads: doc.downloads,
          size: doc.size,
          tags: doc.tags || [],        // đảm bảo tags tồn tại
          category: doc.tags && doc.tags.length > 0 ? doc.tags[0] : 'Khác', // chọn tag đầu tiên làm category
        }));
        setDocuments(formattedDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const categories = [
    'Tất cả',
    ...Array.from(new Set(documents.flatMap(doc => doc.tags || [])))
  ];

  const itemsPerPage = 5;

  const filteredDocuments = documents
    .filter((doc) => selectedCategory === 'Tất cả' || (doc.tags && doc.tags.includes(selectedCategory)))
    .filter((doc) => doc.name && doc.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUploadModalOpen = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newDoc = {
        id: documents.length + 1,
        name: selectedFile.name,
        date: new Date().toISOString().split('T')[0],
        downloads: 0,
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB`,
        tags: ['Khác'],
        category: 'Khác',
      };
      setDocuments([...documents, newDoc]);
      handleUploadModalClose();
    }
  };

  const handleDownload = (docId) => {
    console.log(`Tải xuống tài liệu ID: ${docId}`);
    // TODO: Viết hàm download theo doc.filename
  };

  const handleDeleteModalOpen = (docId) => {
    setDocumentToDelete(docId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDocumentToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setDocuments(documents.filter((doc) => doc.id !== documentToDelete));
    handleDeleteModalClose();
  };

  return (
    <div className="p-6">
      {/* Tiêu đề, tìm kiếm và nút Đăng tải tài liệu */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý tài liệu</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
          />
          <button
            onClick={handleUploadModalOpen}
            className="bg-sky-700 text-white px-4 py-2 rounded flex items-center space-x-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Đăng tải tài liệu</span>
          </button>
        </div>
      </div>

      {/* Bộ lọc danh mục */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded border border-gray-200 ${
              selectedCategory === category
                ? 'bg-sky-700 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Bảng danh sách tài liệu */}
      <div className="bg-white rounded border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-left text-gray-600 font-medium">Tên tài liệu</th>
              <th className="p-4 text-left text-gray-600 font-medium">Ngày đăng</th>
              <th className="p-4 text-left text-gray-600 font-medium">Lượt tải</th>
              <th className="p-4 text-left text-gray-600 font-medium">Kích thước</th>
              <th className="p-4 text-left text-gray-600 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-200">
                <td className="p-4 flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>{doc.name}</span>
                </td>
                <td className="p-4">{doc.date}</td>
                <td className="p-4">{doc.downloads}</td>
                <td className="p-4">{doc.size}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="text-gray-600 hover:text-sky-700"
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteModalOpen(doc.id)}
                    className="text-gray-600 hover:text-red-600"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Modal Đăng tải tài liệu */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Đăng tải tài liệu</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Chọn file:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Danh mục:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-200 rounded p-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUploadModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 rounded ${
                  selectedFile
                    ? 'bg-sky-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Đăng tải
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xác nhận xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
            <p className="mb-4">Bạn có chắc chắn muốn xóa tài liệu này?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDeleteModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
