import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AdmissionQuota = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal chỉnh sửa
  const [selectedQuota, setSelectedQuota] = useState(null); // Chỉ tiêu được chọn để chỉnh sửa
  const [quotas, setQuotas] = useState([
    {
      id: 1,
      majorCode: 'IT001',
      major: 'Công nghệ thông tin',
      schoolCode: 'QSC',
      school: 'Trường Đại học Công nghệ Thông tin, ĐHQG TP.HCM',
      quota: 90,
    },
    {
      id: 2,
      majorCode: 'BA002',
      major: 'Quản trị kinh doanh',
      schoolCode: 'QSE',
      school: 'Trường Đại học Kinh tế - Luật, ĐHQG TP.HCM',
      quota: 150,
    },
    {
      id: 3,
      majorCode: 'BIO003',
      major: 'Sinh học',
      schoolCode: 'QSN',
      school: 'Trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM',
      quota: 90,
    },
  ]);
  const [editQuota, setEditQuota] = useState({
    majorCode: '',
    major: '',
    schoolCode: '',
    school: '',
    quota: 0,
  });

  const schools = [
    { schoolCode: '', school: 'Tất cả trường' },
    ...quotas.map((quota) => ({
      schoolCode: quota.schoolCode,
      school: quota.school,
    })),
  ];

  const [selectedSchool, setSelectedSchool] = useState(''); // Mặc định "Tất cả trường"

  const filteredQuotas = selectedSchool
    ? quotas.filter((quota) => quota.schoolCode === selectedSchool)
    : quotas;

  const handleEditModalOpen = (quota) => {
    setSelectedQuota(quota);
    setEditQuota({ ...quota });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedQuota(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditQuota((prev) => ({ ...prev, [name]: name === 'quota' ? parseInt(value) : value }));
  };

  const handleEditQuota = () => {
    setQuotas(
      quotas.map((quota) =>
        quota.id === selectedQuota.id ? { ...quota, ...editQuota } : quota
      )
    );
    handleEditModalClose();
    toast.success('Chỉnh sửa chỉ tiêu thành công!');
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-sky-700 mb-6">Quản lý Chỉ tiêu tuyển sinh</h1>

      {/* Dropdown lọc trường */}
      <div className="mb-6">
        <select
          value={selectedSchool}
          onChange={handleSchoolChange}
          className="w-96 h-11 bg-white border border-gray-300 rounded px-4 text-sm text-gray-700"
        >
          {schools.map((school, index) => (
            <option key={index} value={school.schoolCode}>
              {school.school}
            </option>
          ))}
        </select>
      </div>

      {/* Bảng danh sách chỉ tiêu */}
      <div className="bg-white rounded border border-gray-200">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 h-12">
              <th className="w-[150px] p-4 text-left text-zinc-600 font-medium">Mã ngành</th>
              <th className="w-[200px] p-4 text-left text-zinc-600 font-medium">Tên ngành</th>
              <th className="w-[150px] p-4 text-left text-zinc-600 font-medium">Mã trường</th>
              <th className="w-[250px] p-4 text-left text-zinc-600 font-medium">Tên trường</th>
              <th className="w-[150px] p-4 text-left text-zinc-600 font-medium">Chỉ tiêu</th>
              <th className="w-[150px] p-4 text-center text-zinc-600 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotas.map((quota) => (
              <tr key={quota.id} className="border-b border-gray-200 h-12 hover:bg-gray-100">
                <td className="p-4">{quota.majorCode}</td>
                <td className="p-4">{quota.major}</td>
                <td className="p-4">{quota.schoolCode}</td>
                <td className="p-4">{quota.school}</td>
                <td className="p-4">{quota.quota}</td>
                <td className="p-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditModalOpen(quota)}
                    className="text-sky-700 flex items-center space-x-1"
                  >
                    <svg
                      className="w-4 h-4"
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
                    <span>Sửa</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Chỉnh sửa chỉ tiêu */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa chỉ tiêu tuyển sinh</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mã ngành:</label>
              <input
                type="text"
                name="majorCode"
                value={editQuota.majorCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên ngành:</label>
              <input
                type="text"
                name="major"
                value={editQuota.major}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mã trường:</label>
              <input
                type="text"
                name="schoolCode"
                value={editQuota.schoolCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên trường:</label>
              <input
                type="text"
                name="school"
                value={editQuota.school}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Chỉ tiêu:</label>
              <input
                type="number"
                name="quota"
                value={editQuota.quota}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleEditModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleEditQuota}
                className="px-4 py-2 bg-sky-700 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionQuota;