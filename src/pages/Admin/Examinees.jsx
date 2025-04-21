import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Examinees() {
  const navigate = useNavigate(); // Thêm useNavigate để điều hướng

  // Giả lập dữ liệu thí sinh
  const [examinees, setExaminees] = useState([
    { id: 1, cccd: '079200009012', name: 'Le Van C', dob: '2000-03-03', status: 'Có cập nhật mới' },
    { id: 2, cccd: '079200001234', name: 'Nguyen Van A', dob: '2000-01-01', status: 'Đã duyệt' },
    { id: 3, cccd: '079200005678', name: 'Tran Thi B', dob: '2000-02-02', status: 'Chưa duyệt' },
  ]);

  // State cho ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // State cho bộ lọc trạng thái
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // Lọc danh sách thí sinh dựa trên ô tìm kiếm và trạng thái
  const filteredExaminees = examinees.filter((examinee) => {
    const matchesSearch =
      examinee.cccd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examinee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'Tất cả' || examinee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Hàm xử lý Thêm mới (giả lập)
  const handleAddNew = () => {
    console.log('Thêm mới thí sinh');
  };

  // Hàm xử lý chỉnh sửa (chuyển hướng đến trang chi tiết)
  const handleEdit = (examinee) => {
    navigate(`/admin/examinees/${examinee.id}`, { state: { examinee } });
  };

  // Hàm xử lý xóa (giả lập)
  const handleDelete = (id) => {
    setExaminees(examinees.filter((examinee) => examinee.id !== id));
    console.log('Xóa thí sinh:', id);
  };

  return (
    <div className="p-6">
      {/* Tiêu đề và điều khiển */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] font-bold text-[#0056B3]">Quản lý Thí sinh</h1>
        <button
          onClick={handleAddNew}
          className="bg-[#0056B3] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#004494]"
        >
          Thêm Thí sinh
        </button>
      </div>

      {/* Ô tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc CCCD..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-3/3 text-[14px] focus:outline-none focus:border-[#0056B3]"
        />
      </div>

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
            Tất cả ({examinees.length})
          </button>
          <button
            onClick={() => setFilterStatus('Đã duyệt')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Đã duyệt'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Đã duyệt ({
              examinees.filter((examinee) => examinee.status === 'Đã duyệt').length
            })
          </button>
          <button
            onClick={() => setFilterStatus('Có cập nhật mới')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Có cập nhật mới'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Có cập nhật mới ({
              examinees.filter((examinee) => examinee.status === 'Có cập nhật mới').length
            })
          </button>
          <button
            onClick={() => setFilterStatus('Chưa duyệt')}
            className={`px-4 py-2 rounded-md text-[14px] ${
              filterStatus === 'Chưa duyệt'
                ? 'bg-[#0056B3] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Chưa duyệt ({
              examinees.filter((examinee) => examinee.status === 'Chưa duyệt').length
            })
          </button>
        </div>
      </div>

      {/* Bảng danh sách thí sinh */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-white text-[14px] text-gray-700 border-b border-gray-300">
              <th className="px-6 py-4 text-left font-medium">CCCD</th>
              <th className="px-6 py-4 text-left font-medium">Họ và tên</th>
              <th className="px-6 py-4 text-left font-medium">Ngày sinh</th>
              <th className="px-6 py-4 text-left font-medium">Trạng thái</th>
              <th className="px-6 py-4 text-left font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredExaminees.map((examinee) => (
              <tr key={examinee.id} className="border-t border-gray-200 text-[14px] text-gray-900">
                <td className="px-6 py-4">{examinee.cccd}</td>
                <td className="px-6 py-4">{examinee.name}</td>
                <td className="px-6 py-4">{examinee.dob}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] ${
                      examinee.status === 'Đã duyệt'
                        ? 'bg-green-100 text-green-700'
                        : examinee.status === 'Có cập nhật mới'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {examinee.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(examinee)} // Truyền toàn bộ object examinee
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(examinee.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
