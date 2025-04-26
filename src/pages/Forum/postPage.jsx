import React from "react";
import { useParams } from "react-router-dom";
import { PostCard, LatestPostPanel } from './Card'; // 
import { useState, useEffect } from "react";

export default function PostPage() {

  const { title } = useParams();

  const [postsData, setPosts] = useState({ posts: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastestPosts, setLastestPost] = useState();


  const fetchTitle = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-topic-posts?topic=" + encodeURIComponent(title));
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchLatestPost = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/latest-posts");
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
      }
      const data = await response.json();
      setLastestPost(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTitle();
    fetchLatestPost();
    }, []);
  return (

     <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8 px-6 py-8">
      {/* Cột bên trái */}
      <div className="w-full md:w-3/4 bg-white-100 rounded-lg">
      <h1 className="!text-3xl font-bold text-blue-700 !flex justify-left" >Thông báo</h1>
      <p className= "text-sm text-gray-500 mb-6 !flex justify-left">
        Các thông báo chính thức từ VNUHCM
      </p>
      {postsData.posts.map((post, index) => (
              <PostCard
              key={post.id || index}

              title={post.question}
              content={" "}
              description="Chủ đề thảo luận"
              id ={post.id}
              postCount={1}
            />
      ))}
      </div>

      {/* Cột bên phải */}
      <div className="mt-15 flex-1 bg-white rounded-lg shadow">
        <LatestPostPanel posts= {lastestPosts}/>
      </div>
    </div>
  );
}
