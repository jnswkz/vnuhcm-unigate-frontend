import { useState } from 'react';
import api from '../../api/axios';
import ReactMarkdown from 'react-markdown'; 

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào! Tôi là Chatbot tư vấn tuyển sinh. Bạn cần tôi giúp gì?", isBot: true },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return; // Không gửi nếu input rỗng
  
    // Thêm tin nhắn của người dùng trước
    setMessages(prev => [...prev, { id: prev.length + 1, text: input, isBot: false }]);
  
    const currentInput = input; // Lưu input hiện tại
    setInput(''); // Clear input field
  
    try {
      const response = await api.post("/api/get-bot-answer", {
        question: currentInput,
      });
  
      const botReply = response.data.reply;
  
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: botReply, isBot: true },
      ]);
    } catch (error) {
      console.error('Error getting bot reply:', error);
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: 'Xin lỗi, hệ thống đang gặp lỗi. Vui lòng thử lại.', isBot: true },
      ]);
    }
  };
  

  return (
    <div className="fixed bottom-6 right-6 w-[450px] h-[600px] bg-white border-2 border-[#9333EA] rounded-xl shadow-2xl flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-[#9333EA] text-white p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s-8-4-8-10V5l8-4 8 4v7c0 6-8 10-8 10z" />
          </svg>
          <h3 className="text-lg font-roboto font-bold">Tư vấn tuyển sinh</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transform transition-all duration-200 hover:scale-110 focus:outline-none"
        >
          ✕
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 rounded-full bg-[#EBF5FF] flex items-center justify-center mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0056B3" strokeWidth="2">
                  <path d="M12 22s-8-4-8-10V5l8-4 8 4v7c0 6-8 10-8 10z" />
                </svg>
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                message.isBot
                  ? 'bg-[#EBF5FF] text-[#0056B3] rounded-bl-none'
                  : 'bg-[#9333EA] text-white rounded-br-none'
              }`}
            >
              <div className="text-sm font-roboto">
                <ReactMarkdown>
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Input Area */}
      <div className="p-4 border-t border-[#9333EA] bg-white rounded-b-xl">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 p-3 border border-[#9333EA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA] text-sm font-roboto"
          />
          <button
            onClick={handleSendMessage}
            className="w-[80px] h-[44px] bg-[#9333EA] text-white font-roboto font-bold rounded-lg hover:bg-[#7D2CC9] transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}