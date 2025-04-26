import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ForumHeader from "./ForumHeader";
import ForumTopicCard from "./Card";
import { LatestPostPanel } from "./Card";

export default function Forum() {
  const location = useLocation();
  const isBaseForumPage = location.pathname === "/dien-dan";

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      {/* Forum Header */}
      <ForumHeader />

      {/* Phần nội dung */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {isBaseForumPage ? <ForumContent /> : <Outlet />}
      </div>
    </div>
  );
}

function ForumContent() {
  const [topicsData, setTopicsData] = useState({ topics: [] });
  const [topicsLen, setTopicsLen] = useState( {number_of_topics: {}} );
  const [topicLastTitle, setTopicLastTitle] = useState({last_post_title: {}});
  const [topicLastDate, setTopicLastDate] = useState({last_post_time: {}});
  const [lastestPosts, setLastestPost] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-post-topics");
        const data = await response.json();
        setTopicsData(data);
        setTopicsLen(data.number_of_topics);
        setTopicLastTitle(data.last_post_title);
        setTopicLastDate(data.last_post_time);
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
        const data = await response.json();
        setLastestPost(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
    fetchLatestPost();
  }, []);

  return (
    <>
      {/* Cột bên trái */}
      <div className="w-full md:w-3/4">
        {topicsData.topics.map((topicName, index) => (
          <ForumTopicCard
            key={index}
            title={topicName}
            description="Chủ đề thảo luận"
            postCount={topicsLen[topicName] || 0} 
            latestTitle={topicLastTitle[topicName] || "Chưa có bài viết"}
            latestDate={topicLastDate[topicName] || "Chưa có bài viết"}
          />
        ))}
      </div>

      {/* Cột bên phải */}
      <div className="w-full md:w-1/4">
        <LatestPostPanel posts={lastestPosts} />
      </div>
    </>
  );
}
