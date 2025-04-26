import { Search } from "lucide-react";
import { Navigate } from "react-router-dom";
export default function ForumHeader() {
  return (
    
    <div className="flex items-center justify-between w-full p-4">
      {/* Tiêu đề bên trái */}
      <h2 className="!text-3xl font-bold text-black">Diễn đàn trao đổi</h2>

      {/* Khu vực tìm kiếm + nút */}
      <div className="flex items-center gap-2">
        {/* Ô tìm kiếm */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nút tạo bài viết */}


        <button className="!bg-blue-700 hover:!bg-blue-800 text-white text-sm px-4 py-2 rounded-lg" 
         onClick = {() => window.location.href = '/dien-dan/create_post'}
        >
          Tạo bài viết mới
        </button>
      </div>
    </div>
  );
}
