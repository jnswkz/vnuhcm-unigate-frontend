import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // import axios instance của bạn

export default function Examinees() {
  const navigate = useNavigate();

  const [examinees, setExaminees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // Fetch thí sinh từ API khi mount component
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/api/get-all-students');
        const students = res.data.map((student, index) => ({
          id: index + 1, // Bạn có thể bỏ nếu muốn
          cccd: student.cccd,
          name: student.ho_ten,
          dob: student.ngay_sinh,
          status: 'Chưa duyệt', // Giả định trạng thái nếu backend chưa trả
          fullData: student // giữ bản ghi gốc để sửa sau
        }));
        setExaminees(students);
      } catch (error) {
        console.error('Lỗi khi fetch danh sách thí sinh:', error);
      }
    };

    fetchStudents();
  }, []);

  // Lọc theo tìm kiếm và trạng thái
  const filteredExaminees = examinees.filter((examinee) => {
    const matchesSearch =
      examinee.cccd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examinee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'Tất cả' || examinee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (cccd) => {
    setExaminees(prev =>
      prev.map(examinee =>
        examinee.cccd === cccd ? { ...examinee, status: 'Đã duyệt' } : examinee
      )
    );
  };

  const handleAddNew = () => {
    echo("under maintenance");
  };

  const handleEdit = (examinee) => {
    navigate(`/admin/examinees/${examinee.cccd}`, { state: { examinee } });
  };

  const handleDelete = async (cccd) => {
    try {
      await api.delete(`/api/delete-student/${cccd}`); // cần viết thêm API xóa student nếu muốn
      setExaminees(examinees.filter((examinee) => examinee.cccd !== cccd));
    } catch (error) {
      console.error('Lỗi khi xóa thí sinh:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] font-bold text-[#0056B3]">Quản lý Thí sinh</h1>
        <button
          onClick={handleAddNew}
          className="bg-[#0056B3] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#004494]"
        >
          Thêm Thí sinh
        </button>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc CCCD..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-3/3 text-[14px] focus:outline-none focus:border-[#0056B3]"
        />
      </div>

      {/* Bộ lọc */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['Tất cả', 'Đã duyệt', 'Có cập nhật mới', 'Chưa duyệt'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-md text-[14px] ${
                filterStatus === status
                  ? 'bg-[#0056B3] text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {status} ({examinees.filter((ex) => status === 'Tất cả' || ex.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Bảng */}
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
              <tr key={examinee.cccd} className="border-t border-gray-200 text-[14px] text-gray-900">
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
                    onClick={() => handleEdit(examinee)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(examinee.cccd)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => handleApprove(examinee.cccd)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Duyệt
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