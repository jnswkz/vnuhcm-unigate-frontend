import { useState } from 'react';

export default function Chatbot() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: "bot" },
    { text: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleStartChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setMessages([
      { text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: "bot" },
      { text: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.", sender: "bot" },
    ]);
    setInput("");
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <>
      {!isChatVisible && (
        <button
          onClick={handleToggleChat}
          className="fixed bottom-5 right-5 w-[60px] h-[60px] bg-[#9333EA] rounded-full flex items-center justify-center shadow-lg hover:bg-[#7e2cc9]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-8.5-8.5 8.38 8.38 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" />
            <path d="M15.5 11.5h-3v3h-3v-3h-3v-3h3v-3h3v3h3v3z" />
          </svg>
        </button>
      )}

      {isChatVisible && (
        <div className="fixed bottom-0 right-0 w-[380px] bg-white rounded-t-lg border border-[#E5E7EB] shadow-lg">
          {isChatOpen ? (
            <>
              <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center">
                <h3 className="text-[20px] font-bold text-[#9333EA] font-roboto leading-[30px]">
                  Tư vấn tuyển sinh
                </h3>
                <button
                  onClick={handleToggleChat}
                  className="text-[24px] text-[#6B7280] font-roboto"
                >
                  ×
                </button>
              </div>
              <div className="p-4 space-y-4 h-[400px] overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`w-[277px] bg-[#EBF5FF] rounded-lg p-3 ${
                      msg.sender === "user" ? "ml-auto" : ""
                    }`}
                  >
                    <p className="text-[16px] text-[#0056B3] font-roboto leading-[24px]">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 w-full p-4 border-t border-[#E5E7EB] flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="w-[282px] h-[42px] border border-[#E5E7EB] rounded-md px-4 text-[16px] text-[#999999] font-roboto"
                />
                <button
                  onClick={handleSend}
                  className="w-[57px] h-[42px] bg-[#9333EA] text-white text-[16px] font-roboto font-bold rounded-md hover:bg-[#7e2cc9]"
                >
                  Gửi
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center">
                <h3 className="text-[20px] font-bold text-[#9333EA] font-roboto leading-[30px]">
                  Tư vấn tuyển sinh
                </h3>
                <button
                  onClick={handleToggleChat}
                  className="text-[24px] text-[#6B7280] font-roboto"
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                <p className="text-[14px] text-[#6B7280] font-roboto leading-[21px]">
                  Trò chuyện với Chatbot để nhận tư vấn
                </p>
                <button
                  onClick={handleStartChat}
                  className="w-full h-[48px] mt-4 bg-[#9333EA] text-white text-[16px] font-roboto font-bold rounded-md hover:bg-[#7e2cc9]"
                >
                  Bắt đầu trò chuyện
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}