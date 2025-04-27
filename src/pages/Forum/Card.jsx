import { ChevronRight, FileText, Lock } from "lucide-react";
import { Navigate } from "react-router-dom";
import React from "react";


export default function ForumTopicCard({
  title,
  description,
  postCount,
  latestTitle,
  latestDate,
}) {

  function slugify(text) {
    return text
      .toString()
      .normalize("NFD")                 // tách dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")    // xóa ký tự đặc biệt
      .replace(/\s+/g, "-")            // chuyển khoảng trắng thành -
      .replace(/-+/g, "-");            // bỏ trùng dấu -
  }
  return (
    <button   className="!mb-4 !bg-white text-left !border !border-gray-200 rounded-lg p-4 py-5 flex justify-between items-start hover:shadow-md transition duration-300 w-full max-w-full appearance-none focus:outline-none"

    onClick={() => {
      const slug = slugify(title);
      window.location.href =  `/dien-dan/posts_page/${slug}`
    }}
    >
      <div className="space-y-1">
        <h3 className="text-blue-700 font-semibold text-left text-2xl pb-2">{title}</h3>
        <p className="text-sm text-gray-500 text-left text-2xl pb-2 ">{description}</p>
        <div className="flex items-center text-sm text-gray-600 mt-2 gap-6">
          <span className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            {postCount} bài viết
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-4 h-4" />
            Bài viết mới nhất:{" "}
            <span className="font-medium text-black">
              {latestTitle}
            </span>{" "}
            - {latestDate}
          </span>
        </div>
      </div>
  
    </button>
  );
}

// PostCard.jsx

export function PostCard({ title, content, description, id, postCount }) {

  

  return (
    <button  className="!mb-4 !bg-white text-left !border !border-gray-200 rounded-lg p-4 py-5 flex justify-between items-start hover:shadow-md transition duration-300 w-full max-w-full appearance-none focus:outline-none"
    onClick={() =>  window.location.href =  `/dien-dan/post/${id}`}
    >
      <div className="space-y-1">
        <h3 className="text-blue-700 font-semibold text-left text-2xl pb-2">{title}</h3>
        <p className="text-sm text-gray-500 text-left text-2xl pb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-600 mt-2 gap-6">
          {/* <span className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            {postCount} bài viết
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-4 h-4" />
            Bài viết mới nhất: <span className="font-medium text-black">?</span>
          </span> */}
        </div>
      </div>

    </button>
  );
}


export function PostContentCard({title, content, topic, date, onClickFunc}) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm max-w-3xl mx-auto">
      
      <div className="!flex items-left text-sm text-gray-500 mb-2">
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2 font-medium">{topic}</span>
        <span>{date}</span>
      </div>

      {/* Avatar và tên người đăng */}
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" /> {/* Placeholder Avatar */}
        <div>
          <p className="font-semibold text-black">Lê Văn C</p>
          <p className="text-sm text-gray-500">Thành viên</p>
        </div>
      </div>

      {/* Tiêu đề bài viết */}
      <h2 className="text-xl font-bold text-black mb-3 !flex item-left">
        {title}
      </h2>

      {/* Nội dung */}
      <p className="text-gray-700 leading-relaxed mb-4 !flex item-left !text-left">
       {content}
      </p>

      {/* Các nút hành động */}
      <div className="flex items-center gap-6 text-gray-600 text-sm border-t pt-3">
        <button className="flex items-center gap-1 hover:text-black">
          ❤️ <span>25</span>
        </button>
        <button className="flex items-center gap-1 hover:text-black" onClick={onClickFunc}>
          💬 <span>Trả lời</span>
        </button>
        <button className="flex items-center gap-1 hover:text-black">
          📤 <span>Chia sẻ</span>
        </button>
      </div>
    </div>
  );
}


export function CommentCard({ author, time, content, likes }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 mb-4 bg-white max-w-3xl mx-auto">
      {/* Avatar + Tên + Thời gian */}
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-xs text-gray-600">

        </div>
        <div>
          <p className="font-semibold text-black">{author || "Ẩn danh"}</p>
          <p className="text-xs text-gray-500">{time || " "}</p>
        </div>
      </div>

      {/* Nội dung bình luận */}
      <p className="text-gray-700 mb-3 !text-left">{content}</p>

      {/* Like icon + số lượng */}
      <div className="flex items-center text-sm text-gray-600 gap-1">
        <span className="text-xl">♡</span> {/* Icon trái tim */}
        <span>{likes || 25}</span>
      </div>
    </div>
  );
}


export function LatestPostPanel({ posts }) {
  return (
    <div className="w-full md:w-[300px] bg-white p-4 rounded-lg shadow-sm">
      <h2 className="!text-xl font-semibold mb-4  !text-left">Bài viết mới nhất</h2>
      
      <div className="space-y-4">
        {posts ? posts.map((post, index) => (
          <div key={index} className="border-b pb-2 last:border-none">
           <div className="!text-left">
              <span className="inline-block text-sm bg-gray-200 text-gray-700 px-2 py-1 mb-1">
                {post.topic}
              </span>
            </div>
            <h3 className="!text-lg font-semibold text-black leading-tight !text-left">{post.question}</h3>
            <p className="text-xs text-gray-500  !text-left">
              {post.username || "Ẩn danh"} - {post.date}
            </p>
          </div>
        )): <p>Loading data</p> }
      </div>
    </div>
  );
}
