// src/pages/ExamResults.jsx

import React, { useState } from 'react';

export default function ExamResults() {
  // Giả lập dữ liệu kết quả thi
  const [results, setResults] = useState([
    { id: 1, cccd: '079201001234', tiengViet: 85, tiengAnh: 90, toanHoc: 88, logic: 92, suyLuan: 87, total: 442 },
    { id: 2, cccd: '079201005678', tiengViet: 78, tiengAnh: 82, toanHoc: 85, logic: 88, suyLuan: 90, total: 423 },
    { id: 3, cccd: '079201009012', tiengViet: 92, tiengAnh: 88, toanHoc: 90, logic: 85, suyLuan: 89, total: 444 },
  ]);

  
  const [selectedWave, setSelectedWave] = useState('Đợt 1');

  // State để quản lý modal chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editResult, setEditResult] = useState(null);

  const handleImport = () => {
    console.log('Import dữ liệu kết quả thi');
  };

  
  const handleExport = () => {
    console.log('Export dữ liệu kết quả thi');
  };


  const handleAddNew = () => {
    console.log('Thêm mới kết quả thi');
  };

  
  const handleEdit = (result) => {
    setEditResult({ ...result }); 
    setIsEditModalOpen(true);
  };


  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditResult(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditResult((prev) => {
      const updatedResult = { ...prev, [name]: value };

      if (['tiengViet', 'tiengAnh', 'toanHoc', 'logic', 'suyLuan'].includes(name)) {
        updatedResult.total =
          parseInt(updatedResult.tiengViet || 0) +
          parseInt(updatedResult.tiengAnh || 0) +
          parseInt(updatedResult.toanHoc || 0) +
          parseInt(updatedResult.logic || 0) +
          parseInt(updatedResult.suyLuan || 0);
      }
      return updatedResult;
    });
  };

  // Hàm lưu thay đổi
  const handleSave = () => {
    setResults((prevResults) =>
      prevResults.map((result) =>
        result.id === editResult.id ? editResult : result
      )
    );
    closeEditModal();
  };

  return (
    <div className="p-6">
      {/* Tiêu đề và điều khiển */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-[24px] font-bold text-[#0056B3]">Quản lý kết quả thi</h1>
          <select
            value={selectedWave}
            onChange={(e) => setSelectedWave(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-[14px]"
          >
            <option value="Đợt 1">Đợt 1</option>
            <option value="Đợt 2">Đợt 2</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleImport}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Import
          </button>
          <button
            onClick={handleExport}
            className="bg-cyan-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-cyan-600"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
            Export
          </button>
          <button
            onClick={handleAddNew}
            className="bg-[#0056B3] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#004494]"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Thêm mới
          </button>
        </div>
      </div>

      {/* Bảng kết quả thi */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-white text-[14px] text-gray-700 border-b border-gray-300">
              <th className="px-6 py-4 text-left font-medium">CCCD</th>
              <th className="px-6 py-4 text-left font-medium">Tiếng Việt</th>
              <th className="px-6 py-4 text-left font-medium">Tiếng Anh</th>
              <th className="px-6 py-4 text-left font-medium">Toán học</th>
              <th className="px-6 py-4 text-left font-medium">Logic và phân tích số liệu</th>
              <th className="px-6 py-4 text-left font-medium">Suy luận khoa học</th>
              <th className="px-6 py-4 text-left font-medium">Tổng điểm</th>
              <th className="px-6 py-4 text-left font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-t border-gray-200 text-[14px] text-gray-900">
                <td className="px-6 py-4">{result.cccd}</td>
                <td className="px-6 py-4">{result.tiengViet}</td>
                <td className="px-6 py-4">{result.tiengAnh}</td>
                <td className="px-6 py-4">{result.toanHoc}</td>
                <td className="px-6 py-4">{result.logic}</td>
                <td className="px-6 py-4">{result.suyLuan}</td>
                <td className="px-6 py-4">{result.total}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(result)}
                    className="text-gray-700 hover:text-[#0056B3]"
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Sửa thông tin */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeEditModal}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] z-50">
            {/* Tiêu đề */}
            <h3 className="text-[18px] font-bold text-black mb-4">
              Sửa thông tin
            </h3>

            {/* Form chỉnh sửa */}
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-1">CCCD</label>
                <input
                  type="text"
                  name="cccd"
                  value={editResult.cccd}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px] focus:outline-none focus:border-[#0056B3]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-1">Tiếng Việt</label>
                <input
                  type="number"
                  name="tiengViet"
                  value={editResult.tiengViet}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px] focus:outline-none focus:border-[#0056B3]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-1">Tiếng Anh</label>
                <input
                  type="number"
                  name="tiengAnh"
                  value={editResult.tiengAnh}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px] focus:outline-none focus:border-[#0056B3]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-1">Toán học</label>
                <input
                  type="number"
                  name="toanHoc"
                  value={editResult.toanHoc}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px] focus:outline-none focus:border-[#0056B3]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-1">Logic và phân tích số liệu</label>
                <input
                  type="number"
                  name="logic"
                  value={editResult.logic}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px] focus:outline-none focus:border-[#0056B3]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-1">Suy luận khoa học</label>
                <input
                  type="number"
                  name="suyLuan"
                  value={editResult.suyLuan}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px] focus:outline-none focus:border-[#0056B3]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-1">Tổng điểm</label>
                <input
                  type="number"
                  name="total"
                  value={editResult.total}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px] focus:outline-none focus:border-[#0056B3]"
                  readOnly // Tổng điểm được tính tự động, không cho chỉnh sửa trực tiếp
                />
              </div>
            </div>

            {/* Nút điều hướng */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeEditModal}
                className="py-2 px-4 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 rounded font-medium bg-[#0056B3] text-white hover:bg-[#004494]"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
