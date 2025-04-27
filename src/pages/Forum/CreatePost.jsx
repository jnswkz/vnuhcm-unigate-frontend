import { Bold, Italic, Link } from "lucide-react";
import { useState, useEffect } from "react";


export default function CreatePostForm() {
  const [topicChoice, setTopicChoice] = useState("");
  const [postTitle, setTitle] = useState("");
  const [postContent, setContent] = useState("");


  const handleSubmit = async () => {
    if (postTitle === "") {
      alert("Vui lòng nhập tiêu đề!");
      return
    }

    if (postContent === "") {
      alert("Bạn không thể đăng một bài trống");
      return
    }
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: 1,
          question: postTitle, 
          topic: topicChoice,
          content: postContent, 
          username:"",  
          answer: [],
          date: ""
         }),
      });
  
      if (!response.ok) {
        throw new Error("Lỗi từ server");
      }
  
      const data = await response.json();
      alert("Đăng bài thành công!");
      console.log("Server trả về:", data);
    } catch (error) {
      console.error(error);
      alert(error)
    }
  };

  return (
    <div className="w-[70%] p-6 bg-white !justify-center mx-auto mt-24">

      <h1 className="!text-3xl font-bold mb-6 text-left">Tạo bài viết mới</h1>

      {/* Chuyên mục */}
      <label className="!text-lg block font-medium text-sm mb-1 text-left">Chuyên mục</label>
      <select className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100 py-5 "

        value={topicChoice}
        onChange={(e) => setTopicChoice(e.target.value)} // 👈 inline arrow function
        >
        <option value = "Thảo luận chung">Thảo luận chung</option>
        <option value = "Đánh giá năng lực">Đánh giá năng lực</option>
        <option value = "Chia sẻ kinh nghiệm">Chia sẻ kinh nghiệm</option>
      </select>

      {/* Tiêu đề */}
      <label className="!text-lg block font-medium text-sm mb-1 text-left">Tiêu đề</label>
      <input
        type="text"
        placeholder="Nhập tiêu đề bài viết"
        className="w-full p-2 border border-gray-300 rounded mb-4 py-5"
        value = {postTitle}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Nội dung */}
      <label className="!text-lg block font-medium text-sm mb-1 text-left">Nội dung</label>
      <div className="border border-gray-300 rounded mb-4">
        {/* Thanh công cụ */}
        <div className="bg-gray-50 px-3 py-2 flex gap-2">
          <Bold className="w-4 h-4 cursor-pointer" />
          <Italic className="w-4 h-4 cursor-pointer" />
          <Link className="w-4 h-4 cursor-pointer" />
        </div>

        {/* Ô soạn nội dung */}
        <textarea
          rows={10}
          className="w-full p-3 outline-none resize-none"
          placeholder="Nhập nội dung bài viết..."

          value = {postContent}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* Nút */}
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded border !text-gray-700 !bg-white hover:!bg-gray-100">
          Hủy
        </button>
        <button className="px-4 py-2 rounded !bg-blue-700 hover:!bg-blue-800 !text-white font-medium" onClick={handleSubmit}>
          Đăng bài
        </button>
      </div>
    </div>


    
  );
}
