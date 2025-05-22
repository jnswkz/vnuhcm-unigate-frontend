import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axios';

const Documents = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Upload modal state
  const [uploadName, setUploadName] = useState('');
  const [uploadCategories, setUploadCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Delete modal state
  const [documentToDelete, setDocumentToDelete] = useState(null);

  // Main state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);

  // Fetch documents on mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/api/get-documents-list');
        const formatted = response.data.map(doc => ({
          id: doc.id,
          name: doc.title,
          filename: doc.filename,
          date: doc.date,
          downloads: doc.downloads,
          size: doc.size,
          tags: doc.tags || [],
          category: doc.tags && doc.tags.length > 0 ? doc.tags[0] : 'Khác',
        }));
        setDocuments(formatted);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };
    fetchDocuments();
  }, []);

  // Build categories list
  const categories = [
    'Tất cả',
    ...Array.from(new Set(documents.flatMap(d => d.tags || []))),
  ];

  // Pagination
  const itemsPerPage = 5;
  const filtered = documents
    .filter(d => selectedCategory === 'Tất cả' || d.tags.includes(selectedCategory))
    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers: filter, search, pagination
  const handleCategoryChange = cat => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handlePageChange = p => setCurrentPage(p);

  // Open/close modals
  const handleUploadModalOpen = () => {
    setUploadName('');
    setUploadCategories([]);
    setSelectedFile(null);
    setIsUploadModalOpen(true);
  };
  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
    setUploadName('');
    setUploadCategories([]);
    setSelectedFile(null);
  };
  const handleDeleteModalOpen = id => {
    setDocumentToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDocumentToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // File & form field changes
  const handleFileChange = e => setSelectedFile(e.target.files[0]);
  const handleUploadNameChange = e => setUploadName(e.target.value);
  const handleUploadCategoryChange = e => {
    const vals = Array.from(e.target.selectedOptions, o => o.value);
    setUploadCategories(vals);
  };

  // Upload action
  const handleUpload = async () => {
    if (!selectedFile) return toast.error('Vui lòng chọn file');
    if (!uploadName.trim()) return toast.error('Vui lòng nhập tiêu đề tài liệu');
    if (documents.some(d => d.filename === selectedFile.name)) {
      return toast.error('Tài liệu với tên này đã tồn tại');
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', uploadName.trim());
    const cats = uploadCategories.length ? uploadCategories : ['Khác'];
    cats.forEach(cat => formData.append('category', cat));
  
    try {
      const res = await api.post('/api/upload-document', formData);
      const d = res.data;
      setDocuments(prev => [
        ...prev,
        {
          id: d.id,
          name: d.title,
          filename: d.filename,
          date: d.date,
          downloads: d.downloads,
          size: d.size,
          tags: d.tags,
          category: d.tags?.[0] || 'Khác',
        }
      ]);
      toast.success('Tải lên tài liệu thành công');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || 'Có lỗi khi tải lên');
    }
  
    handleUploadModalClose();
  };
  // Download action
  const handleDownload = async id => {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    try {
      const res = await api.post('/api/get-document', { id }, { responseType: 'blob' });
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.filename || doc.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Tải file thất bại:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.post("/api/delete-document", { id: documentToDelete });
      setDocuments(docs => docs.filter(d => d.id !== documentToDelete));
      toast.success('Xóa tài liệu thành công');
    } catch (err) {
      console.error('Error deleting document:', err);
      toast.error(err.response?.data?.detail || 'Có lỗi khi xóa tài liệu');
    }
    
    handleDeleteModalClose();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý tài liệu</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded focus:ring-2 focus:ring-sky-700"
          />
          <button
            onClick={handleUploadModalOpen}
            className="bg-sky-700 text-white px-4 py-2 rounded"
          >
            Đăng tải tài liệu
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded border ${
              selectedCategory === cat
                ? 'bg-sky-700 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-left">Tên tài liệu</th>
              <th className="p-4 text-left">Ngày đăng</th>
              <th className="p-4 text-left">Lượt tải</th>
              <th className="p-4 text-left">Kích thước</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(doc => (
              <tr key={doc.id} className="border-b">
                <td className="p-4">{doc.name}</td>
                <td className="p-4">{doc.date}</td>
                <td className="p-4">{doc.downloads}</td>
                <td className="p-4">{doc.size}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleDownload(doc.id)} className="hover:text-sky-700">
                    📥
                  </button>
                  <button onClick={() => handleDeleteModalOpen(doc.id)} className="hover:text-red-600">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 rounded ${
                currentPage === p ? 'bg-sky-700 text-white' : 'border'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Đăng tải tài liệu</h2>

            <div className="mb-4">
              <label className="block mb-2">Tiêu đề tài liệu:</label>
              <input
                type="text"
                value={uploadName}
                onChange={handleUploadNameChange}
                placeholder="Nhập tiêu đề..."
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Chọn file:</label>
              <input type="file" onChange={handleFileChange} className="w-full" />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Danh mục (Ctrl+click để chọn nhiều):</label>
              <select
                multiple
                value={uploadCategories}
                onChange={handleUploadCategoryChange}
                className="w-full h-32 border rounded p-2"
              >
                {categories.filter(c => c !== 'Tất cả').map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUploadModalClose}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !uploadName.trim()}
                className={`px-4 py-2 rounded ${
                  selectedFile && uploadName.trim()
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

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
            <p className="mb-4">Bạn có chắc chắn muốn xóa tài liệu này?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDeleteModalClose}
                className="px-4 py-2 border rounded"
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
