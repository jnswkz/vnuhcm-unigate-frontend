import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';

// Component con để xử lý từng hàng trong bảng
const SortableRow = ({ wish, handleEdit, handleDelete, isExpired }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: wish.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-b border-gray-200 hover:bg-gray-50"
    >
      <td className="py-5 px-4">{wish.priority}</td>
      <td className="py-5 px-4">{wish.applicationCode}</td>
      <td className="py-5 px-4">{wish.school}</td>
      <td className="py-5 px-4">{wish.major}</td>
      <td className="py-5 px-4">{wish.majorCode}</td>
      <td className="py-5 px-4 flex space-x-2">
        <button
          onClick={() => handleEdit(wish)}
          className="text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          title="Sửa"
          disabled={isExpired}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(wish.id)}
          className="text-red-600 hover:text-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          title="Xóa"
          disabled={isExpired}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default function AdmissionWishes() {
  const [wishList, setWishList] = useState([
    {
      id: '1',
      priority: 1,
      applicationCode: 'XT2024-1234',
      school: 'Đại học Công nghệ Thông tin',
      major: 'Kỹ thuật phần mềm',
      majorCode: '7480103',
    },
    {
      id: '2',
      priority: 2,
      applicationCode: 'XT2024-1234',
      school: 'Đại học Khoa học Tự nhiên',
      major: 'Công nghệ thông tin',
      majorCode: '7480201',
    },
    {
      id: '3',
      priority: 3,
      applicationCode: 'XT2024-1234',
      school: 'Đại học Công nghệ Thông tin',
      major: 'Khoa học máy tính',
      majorCode: '7480101',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newWish, setNewWish] = useState({
    school: '',
    major: '',
    majorCode: '',
  });
  const [editingWish, setEditingWish] = useState(null);
  const [deleteWishId, setDeleteWishId] = useState(null);

  // Danh sách tùy chọn cho dropdown "Trường" và "Ngành"
  const schools = [
    { value: '', label: 'Chọn trường' },
    { value: 'Đại học Công nghệ Thông tin', label: 'Đại học Công nghệ Thông tin' },
    { value: 'Đại học Khoa học Tự nhiên', label: 'Đại học Khoa học Tự nhiên' },
    { value: 'Đại học Bách Khoa', label: 'Đại học Bách Khoa' },
    { value: 'Đại học Sư phạm', label: 'Đại học Sư phạm' },
  ];

  const majors = [
    { value: '', label: 'Chọn ngành' },
    { value: 'Kỹ thuật phần mềm', label: 'Kỹ thuật phần mềm' },
    { value: 'Công nghệ thông tin', label: 'Công nghệ thông tin' },
    { value: 'Khoa học máy tính', label: 'Khoa học máy tính' },
    { value: 'Toán ứng dụng', label: 'Toán ứng dụng' },
  ];

  const deadline = new Date('2025-07-15T17:00:00');
  const currentDate = new Date();
  const isExpired = currentDate > deadline;

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWishList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        return newItems.map((item, index) => ({
          ...item,
          priority: index + 1,
        }));
      });
    }
  };

  const handleAddWish = () => {
    setEditingWish(null);
    setNewWish({ school: '', major: '', majorCode: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (wish) => {
    setEditingWish(wish);
    setNewWish({
      school: wish.school,
      major: wish.major,
      majorCode: wish.majorCode,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteWishId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWish(null);
    setNewWish({ school: '', major: '', majorCode: '' });
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteWishId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWish((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveWish = () => {
    if (!newWish.school || !newWish.major || !newWish.majorCode) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (editingWish) {
      setWishList((prev) =>
        prev.map((wish) =>
          wish.id === editingWish.id
            ? { ...wish, school: newWish.school, major: newWish.major, majorCode: newWish.majorCode }
            : wish
        )
      );
    } else {
      const newId = (wishList.length + 1).toString();
      const newPriority = wishList.length + 1;
      const newWishData = {
        id: newId,
        priority: newPriority,
        applicationCode: 'XT2024-1234',
        school: newWish.school,
        major: newWish.major,
        majorCode: newWish.majorCode,
      };
      setWishList((prev) => [...prev, newWishData]);
    }

    handleCloseModal();
  };

  const handleConfirmDelete = () => {
    setWishList((prev) => {
      const updatedList = prev.filter((wish) => wish.id !== deleteWishId);
      return updatedList.map((wish, index) => ({
        ...wish,
        priority: index + 1,
      }));
    });
    handleCloseDeleteModal();
  };

  return (
    <div className="bg-white rounded shadow-md">
      {isExpired && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-start">
          <svg
            className="h-6 w-6 text-red-600 mr-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-red-600 font-semibold">
              Đã hết thời gian điều chỉnh nguyện vọng.
            </p>
            <p className="text-red-600">
              thời gian điều chỉnh nguyện vọng đã kết thúc vào 17:00 ngày 15/07/2024
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Danh sách nguyện vọng
        </h2>
        {!isExpired && (
          <button
            onClick={handleAddWish}
            className="bg-[#0056B3] text-white py-2 px-4 rounded font-medium hover:bg-[#004494] transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center"
          >
            <span className="mr-2">+</span> Thêm nguyện vọng
          </button>
        )}
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={isExpired ? () => {} : handleDragEnd}>
        <SortableContext
          items={wishList.map((wish) => wish.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-4 text-left font-medium">Thứ tự ưu tiên</th>
                  <th className="py-4 px-4 text-left font-medium">Mã hồ sơ xét tuyển</th>
                  <th className="py-4 px-4 text-left font-medium">Trường</th>
                  <th className="py-4 px-4 text-left font-medium">Ngành</th>
                  <th className="py-4 px-4 text-left font-medium">Mã ngành</th>
                  <th className="py-4 px-4 text-left font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {wishList.map((wish) => (
                  <SortableRow
                    key={wish.id}
                    wish={wish}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    isExpired={isExpired}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </SortableContext>
      </DndContext>

      {!isExpired && (
        <div className="my-4 flex items-center">
          <span className="w-12 text-center font-bold text-[#0056B3]">+</span>
          <p className="text-[#64748B]">Kéo và thả để sắp xếp thứ tự ưu tiên</p>
        </div>
      )}

      {isExpired && (
        <div className="mt-6 flex items-center justify-start">
          <svg
            className="h-5 w-5 text-[#0056B3] mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-[#0056B3]">
            Mọi thắc mắc về nguyện vọng xét tuyển vui lòng liên hệ hotline: 1900 1508
          </p>
        </div>
      )}

      {/* Modal thêm/chỉnh sửa nguyện vọng */}
      {isModalOpen && !isExpired && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div
            className="bg-white rounded-lg shadow-md p-6 z-50 flex flex-col justify-between"
            style={{ width: '640px', height: '331px' }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingWish ? 'Chỉnh sửa nguyện vọng' : 'Thêm nguyện vọng mới'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Thứ tự ưu tiên
                    </label>
                    <input
                      type="number"
                      value={editingWish ? editingWish.priority : wishList.length + 1}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Ngành
                    </label>
                    <div className="relative">
                      <select
                        name="major"
                        value={newWish.major}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {majors.map((major) => (
                          <option key={major.value} value={major.value}>
                            {major.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
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
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Trường
                    </label>
                    <div className="relative">
                      <select
                        name="school"
                        value={newWish.school}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {schools.map((school) => (
                          <option key={school.value} value={school.value}>
                            {school.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
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
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Mã ngành
                    </label>
                    <input
                      type="text"
                      name="majorCode"
                      value={newWish.majorCode}
                      onChange={handleInputChange}
                      placeholder="Nhập mã ngành"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveWish}
                className="py-2 px-4 bg-[#0056B3] text-white rounded font-medium hover:bg-[#004494] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && !isExpired && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDeleteModal}
          ></div>
          <div
            className="bg-white rounded-lg shadow-md p-6 z-50 flex flex-col justify-between"
            style={{ width: '400px', height: '200px' }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Bạn có chắc muốn xóa nguyện vọng?
              </h3>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseDeleteModal}
                className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-2 px-4 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
