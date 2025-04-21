import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recruitment = () => {
  const [activeTab, setActiveTab] = useState('wishes'); // Tab: 'wishes' hoặc 'results'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all'); // Lọc theo trường
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWish, setSelectedWish] = useState(null);
  const [newWish, setNewWish] = useState({
    cccd: '',
    fullName: '',
    major: '',
    majorCode: '',
    school: '',
    status: 'Chưa thanh toán',
  });
  const [wishes, setWishes] = useState([
    {
      id: 1,
      cccd: '00121023842',
      fullName: 'Nguyễn Văn A',
      major: 'Công nghệ thông tin',
      majorCode: '7480201',
      school: 'Đại học Khoa học Tự nhiên',
      status: 'Đã thanh toán',
    },
    {
      id: 2,
      cccd: '00121023843',
      fullName: 'Trần Thị B',
      major: 'Kinh tế',
      majorCode: '7340101',
      school: 'Đại học Kinh tế',
      status: 'Chưa thanh toán',
    },
    {
      id: 3,
      cccd: '00121023844',
      fullName: 'Phạm Văn C',
      major: 'Kỹ thuật phần mềm',
      majorCode: '7480103',
      school: 'Đại học Công nghệ Thông tin',
      status: 'Đã thanh toán',
    },
  ]);
  const [results, setResults] = useState([
    {
      id: 1,
      school: 'Đại học Khoa học Tự nhiên',
      majorCode: '7480201',
      major: 'Công nghệ Thông tin',
      cccd: '079201012345',
      score: 1000,
    },
    {
      id: 2,
      school: 'Đại học Bách Khoa',
      majorCode: '7480101',
      major: 'Kỹ thuật Máy tính',
      cccd: '079201012346',
      score: 900,
    },
    {
      id: 3,
      school: 'Đại học Kinh Tế',
      majorCode: '7340101',
      major: 'Quản trị Kinh doanh',
      cccd: '079201012347',
      score: 890,
    },
  ]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const schools = [
    { value: 'all', label: 'Tất cả trường' },
    { value: 'Đại học Khoa học Tự nhiên', label: 'Đại học Khoa học Tự nhiên' },
    { value: 'Đại học Bách Khoa', label: 'Đại học Bách Khoa' },
    { value: 'Đại học Kinh Tế', label: 'Đại học Kinh Tế' },
  ];

  
  const filteredWishes = wishes.filter(
    (wish) =>
      wish.cccd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.majorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const filteredResults = results
    .filter(
      (result) =>
        (selectedSchool === 'all' || result.school === selectedSchool) &&
        (result.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.majorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.cccd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.score.toString().includes(searchTerm.toLowerCase()))
    );


  const sortedResults = [...filteredResults].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    if (sortConfig.direction === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(sortedResults.length / resultsPerPage);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm(''); 
    setSelectedSchool('all'); 
    setCurrentPage(1); 
    setSortConfig({ key: null, direction: 'asc' });}

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
    setCurrentPage(1); 
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
    setNewWish({
      cccd: '',
      fullName: '',
      major: '',
      majorCode: '',
      school: '',
      status: 'Chưa thanh toán',
    });
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalOpen = (wish) => {
    setSelectedWish(wish);
    setNewWish({ ...wish });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedWish(null);
  };

  const handleDeleteModalOpen = (wish) => {
    setSelectedWish(wish);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedWish(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWish((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWish = () => {
    const newId = wishes.length + 1;
    setWishes([...wishes, { id: newId, ...newWish }]);
    handleAddModalClose();
    toast.success('Thêm nguyện vọng thành công!');
  };

  const handleEditWish = () => {
    setWishes(
      wishes.map((wish) =>
        wish.id === selectedWish.id ? { ...wish, ...newWish } : wish
      )
    );
    handleEditModalClose();
    toast.success('Sửa nguyện vọng thành công!');
  };

  const handleDeleteWish = () => {
    setWishes(wishes.filter((wish) => wish.id !== selectedWish.id));
    handleDeleteModalClose();
    toast.success('Xóa nguyện vọng thành công!');
  };

  const handleImportFile = () => {
    console.log('Nhập file nguyện vọng xét tuyển');
    toast.success('Đã nhập file thành công!');
    // TODO: Thêm logic nhập file
  };

  const handleExportFile = () => {
    console.log('Xuất file');
    toast.success('Đã xuất file thành công!');
    // TODO: Thêm logic xuất file
  };

  const handleRunAdmission = () => {
    console.log('Thực hiện xét tuyển');
    toast.success('Đã thực hiện xét tuyển thành công!');
    // TODO: Thêm logic thực hiện xét tuyển
  };

  return (
    <div className="p-6">
      {/* ToastContainer để hiển thị thông báo */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-sky-700 mb-6">Quản lý xét tuyển</h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-zinc-200">
        <h2
          onClick={() => handleTabChange('wishes')}
          className={`text-base font-medium cursor-pointer px-6 py-2 ${
            activeTab === 'wishes' ? 'text-sky-700 border-b-2 border-sky-700' : 'text-gray-800'
          }`}
        >
          Quản lý nguyện vọng xét tuyển
        </h2>
        <h2
          onClick={() => handleTabChange('results')}
          className={`text-base font-medium cursor-pointer px-6 py-2 ${
            activeTab === 'results' ? 'text-sky-700 border-b-2 border-sky-700' : 'text-gray-800'
          }`}
        >
          Quản lý kết quả xét tuyển
        </h2>
      </div>

      {/* Nội dung tab */}
      {activeTab === 'wishes' ? (
        <>
          {/* Tìm kiếm và nút chức năng */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-6">
              <h3 className="text-lg font-medium text-black">Danh sách nguyện vọng</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-60 h-9 pl-10 pr-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                />
                <svg
                  className="w-4 h-4 absolute left-4 top-2.5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleImportFile}
                className="w-32 h-10 bg-green-600 text-white rounded flex items-center justify-center space-x-2"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <span>Nhập file</span>
              </button>
              <button
                onClick={handleExportFile}
                className="w-28 h-10 bg-cyan-600 text-white rounded flex items-center justify-center space-x-2"
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
                <span>Xuất file</span>
              </button>
              <button
                onClick={handleAddModalOpen}
                className="w-48 h-10 bg-sky-700 text-white rounded flex items-center justify-center space-x-2"
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
                <span>Thêm nguyện vọng</span>
              </button>
            </div>
          </div>

          {/* Bảng danh sách nguyện vọng xét tuyển */}
          <div className="bg-white rounded border border-gray-200">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 h-12">
                  <th className="w-[150px] p-4 text-left text-zinc-600 font-medium">CCCD</th>
                  <th className="w-[150px] p-4 text-left text-zinc-600 font-medium">Họ tên</th>
                  <th className="w-[200px] p-4 text-left text-zinc-600 font-medium">Tên ngành</th>
                  <th className="w-[100px] p-4 text-left text-zinc-600 font-medium">Mã ngành</th>
                  <th className="w-[250px] p-4 text-left text-zinc-600 font-medium">Tên trường</th>
                  <th className="w-[150px] p-4 text-left text-zinc-600 font-medium">Trạng thái</th>
                  <th className="w-[150px] p-4 text-left text-zinc-600 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredWishes.map((wish) => (
                  <tr key={wish.id} className="border-b border-gray-200 h-12">
                    <td className="p-4">{wish.cccd}</td>
                    <td className="p-4">{wish.fullName}</td>
                    <td className="p-4">{wish.major}</td>
                    <td className="p-4">{wish.majorCode}</td>
                    <td className="p-4">{wish.school}</td>
                    <td className="p-4">
                      <span
                        className={`${
                          wish.status === 'Đã thanh toán' ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        {wish.status}
                      </span>
                    </td>
                    <td className="p-4 flex space-x-4">
                      <button
                        onClick={() => handleEditModalOpen(wish)}
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
                      <button
                        onClick={() => handleDeleteModalOpen(wish)}
                        className="text-red-500 flex items-center space-x-1"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
                          />
                        </svg>
                        <span>Xóa</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>
          {/* Tiêu đề Kết quả xét tuyển */}
          <h3 className="text-lg font-medium text-black mb-6">Kết quả xét tuyển</h3>

          {/* Tìm kiếm, Dropdown và Nút chức năng */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-60 h-9 pl-10 pr-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                />
                <svg
                  className="w-4 h-4 absolute left-4 top-2.5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="relative">
                <select
                  value={selectedSchool}
                  onChange={handleSchoolChange}
                  className="w-60 h-9 px-4 py-2 bg-zinc-300 rounded focus:outline-none"
                  style={{ appearance: 'none' }} 
                >
                  {schools.map((school) => (
                    <option key={school.value} value={school.value}>
                      {school.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="w-4 h-4 absolute right-4 top-2.5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleExportFile}
                className="w-28 h-10 bg-cyan-600 text-white rounded flex items-center justify-center space-x-2"
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
                <span>Xuất file</span>
              </button>
              <button
                onClick={handleRunAdmission}
                className="w-44 h-10 bg-sky-700 text-white rounded flex items-center justify-center"
              >
                <span>Thực hiện xét tuyển</span>
              </button>
            </div>
          </div>

          {/* Hiển thị bảng kết quả xét tuyển nếu có dữ liệu, ngược lại hiển thị "Chưa có kết quả xét tuyển" */}
          {filteredResults.length > 0 ? (
            <>
              <div className="bg-white rounded border border-gray-200">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 h-12">
                      <th
                        className="w-[250px] p-4 text-left text-zinc-600 font-medium cursor-pointer"
                        onClick={() => handleSort('school')}
                      >
                        Tên trường
                        {sortConfig.key === 'school' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </th>
                      <th
                        className="w-[100px] p-4 text-left text-zinc-600 font-medium cursor-pointer"
                        onClick={() => handleSort('majorCode')}
                      >
                        Mã ngành
                        {sortConfig.key === 'majorCode' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </th>
                      <th
                        className="w-[200px] p-4 text-left text-zinc-600 font-medium cursor-pointer"
                        onClick={() => handleSort('major')}
                      >
                        Tên ngành
                        {sortConfig.key === 'major' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </th>
                      <th
                        className="w-[150px] p-4 text-left text-zinc-600 font-medium cursor-pointer"
                        onClick={() => handleSort('cccd')}
                      >
                        CCCD
                        {sortConfig.key === 'cccd' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </th>
                      <th
                        className="w-[150px] p-4 text-left text-zinc-600 font-medium cursor-pointer"
                        onClick={() => handleSort('score')}
                      >
                        Điểm xét tuyển
                        {sortConfig.key === 'score' && (
                          <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResults.map((result) => (
                      <tr key={result.id} className="border-b border-gray-200 h-12">
                        <td className="p-4">{result.school}</td>
                        <td className="p-4">{result.majorCode}</td>
                        <td className="p-4">{result.major}</td>
                        <td className="p-4">{result.cccd}</td>
                        <td className="p-4">{result.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded ${
                          currentPage === page
                            ? 'bg-sky-700 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center mt-20">
              <img
                className="w-60 h-60 mb-6"
                src="https://placehold.co/240x240"
                alt="No results placeholder"
              />
              <h4 className="text-xl font-bold text-slate-700 mb-4">
                Chưa có kết quả xét tuyển
              </h4>
              <p className="text-base text-slate-500 text-center max-w-md">
                Hệ thống đang trong quá trình xử lý kết quả xét tuyển. Kết quả sẽ được công bố theo thời gian quy định.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal Thêm nguyện vọng */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Thêm nguyện vọng xét tuyển</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">CCCD:</label>
              <input
                type="text"
                name="cccd"
                value={newWish.cccd}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Họ tên:</label>
              <input
                type="text"
                name="fullName"
                value={newWish.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên ngành:</label>
              <input
                type="text"
                name="major"
                value={newWish.major}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mã ngành:</label>
              <input
                type="text"
                name="majorCode"
                value={newWish.majorCode}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên trường:</label>
              <input
                type="text"
                name="school"
                value={newWish.school}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Trạng thái:</label>
              <select
                name="status"
                value={newWish.status}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              >
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddWish}
                className="px-4 py-2 bg-sky-700 text-white rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sửa nguyện vọng */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Sửa nguyện vọng xét tuyển</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">CCCD:</label>
              <input
                type="text"
                name="cccd"
                value={newWish.cccd}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Họ tên:</label>
              <input
                type="text"
                name="fullName"
                value={newWish.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên ngành:</label>
              <input
                type="text"
                name="major"
                value={newWish.major}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mã ngành:</label>
              <input
                type="text"
                name="majorCode"
                value={newWish.majorCode}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên trường:</label>
              <input
                type="text"
                name="school"
                value={newWish.school}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Trạng thái:</label>
              <select
                name="status"
                value={newWish.status}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded p-2"
              >
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleEditModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleEditWish}
                className="px-4 py-2 bg-sky-700 text-white rounded"
              >
                Lưu
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
            <p className="mb-4">Bạn có chắc chắn muốn xóa nguyện vọng xét tuyển này?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDeleteModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteWish}
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

export default Recruitment;
