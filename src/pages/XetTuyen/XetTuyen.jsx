import React, { useState } from 'react';
import ThongTinXetTuyen from './ThongTinXetTuyen';
import NguyenVongXT from './NguyenVongXT';
import KetQuaXT from './KetQuaXT';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';

export default function Admission() {
    const [activeTab, setActiveTab] = useState('info'); // Tab mặc định là "Thông tin xét tuyển"
  
    return (
      <div className="max-w-4xl mx-auto my-6 p-8 bg-white rounded shadow-md min-w-[984px] min-h-[572px]">
        {/* Tab Navigation */}
        <div className="flex space-x-10 mb-6 border-b border-blue-200">
          <h1
            className={`text-lg font-semibold pb-2 cursor-pointer ${
              activeTab === 'info'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Thông tin xét tuyển
          </h1>
          <h1
            className={`text-lg font-semibold pb-2 cursor-pointer ${
              activeTab === 'wishes'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('wishes')}
          >
            Nguyện vọng xét tuyển
          </h1>
          <h1
            className={`text-lg font-semibold pb-2 cursor-pointer ${
              activeTab === 'results'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('results')}
          >
            Kết quả xét tuyển
          </h1>
        </div>
      {/* Nội dung của tab */}
      {activeTab === 'info' && <ThongTinXetTuyen />}
      {activeTab === 'wishes' && <NguyenVongXT />}
      {activeTab === 'results' && <KetQuaXT />}
    </div>
  );
}