import { useState } from "react";

export default function ReplyBox({ onSubmit, onCancel }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent(""); // Clear after submit
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 mb-4 bg-white max-w-3xl mx-auto">
      {/* Avatar / placeholder */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 font-medium">
        32×32
      </div>

      {/* Form nhập và nút */}
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập câu trả lời..."
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        {/* Nút hành động */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded text-gray-700 bg-white hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded text-white !bg-blue-700 hover:bg-blue-800 font-medium"
          >
            Gửi trả lời
          </button>
        </div>
      </div>
    </div>
  );
}
