import { useState } from "react";
import { PostContentCard, CommentCard} from "./Card";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LetterText } from "lucide-react";
import ReplyBox from "./Reply";
import { useAuth } from "../../components/AuthContext.jsx";

export default function PostDetail() {
    const { user } = useAuth();

    const { id } = useParams();

    const[data, setData] = useState()
    const [isAnswering, setIsAnswering] = useState(false);

    const onAnswerButtonClick = () => {
      setIsAnswering(true)
    }

    
    const fetchPostData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/get-post/${id}`);
          if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
          }
          const data = await response.json();
          setData(data);
        } catch (err) {
          console.error(err);
         
        } finally {
          
        }
      };
    
      useEffect(() => {
        fetchPostData();
      }, []);
      const onCommentSummit = async(content) => {
        try {
          const response = await fetch(`http://localhost:8000/api/submit-answer/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              answer: content,       // nội dung trả lời
              username: user.cccd,   // tên người dùng (nếu có)
            })
          });
      
          if (!response.ok) {
            throw new Error("Không thể gửi trả lời");
          }
      
          const result = await response.json();
          console.log("Trả lời đã gửi thành công:", result);
          fetchPostData();

        } catch (error) {
          console.error("Lỗi khi gửi trả lời:", error.message);
        }
      }
    return(
        <div>
         

        {data ? (
            <PostContentCard
            title={data.question || data.title}
            content={data.content}
            topic={data.topic}
            date={data.date || data.created_at}
            onClickFunc={onAnswerButtonClick}
         />
         ) : (
      <p>Đang tải dữ liệu...</p>
        )}
         
         
        
        {data ? data.answer.map((item, index) => (
              <CommentCard key = {index} content={item.answer}/>
        )):<p>Loading data</p>}

       
        {isAnswering && <ReplyBox onSubmit={onCommentSummit}/>}
        
        </div>

        
    );
}