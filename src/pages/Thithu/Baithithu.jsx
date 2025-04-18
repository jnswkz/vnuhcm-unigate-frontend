// src/pages/MockTest.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MockTest() {

  const [currentQuestion, setCurrentQuestion] = useState(91); 
  const totalQuestions = 120;


  const [selectedSection, setSelectedSection] = useState(4); 


  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(9000); 

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false); 
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); 
  const [isResultModalOpen, setIsResultModalOpen] = useState(false); 

  // Danh sách câu hỏi (giả lập từ 91 đến 120 cho Phần 4)
  const questions = Array.from({ length: 30 }, (_, i) => i + 91); // Câu 91 đến 120

  // Danh sách đáp án giả lập cho câu 91
  const answerOptions = [
    'Phương án A cho câu 91',
    'Phương án B cho câu 91',
    'Phương án C cho câu 91',
    'Phương án D cho câu 91',
  ];

 
  const answeredQuestions = Object.keys(answers).length;
  const unansweredQuestions = totalQuestions - answeredQuestions; 
  const answeredPerSection = {
    1: Object.keys(answers).filter((q) => parseInt(q) >= 1 && parseInt(q) <= 30).length, 
    2: Object.keys(answers).filter((q) => parseInt(q) >= 31 && parseInt(q) <= 60).length, 
    3: Object.keys(answers).filter((q) => parseInt(q) >= 61 && parseInt(q) <= 90).length, 
    4: Object.keys(answers).filter((q) => parseInt(q) >= 91 && parseInt(q) <= 120).length,
  };

 
  const correctAnswers = answeredQuestions; 

 
  const navigate = useNavigate();

  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setIsResultModalOpen(true); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, []);


  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handlePrevious = () => {
    if (currentQuestion > 91) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

 
  const handleNext = () => {
    if (currentQuestion < 120) { 
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  
  const handleQuestionClick = (questionNumber) => {
    setCurrentQuestion(questionNumber);
  };


  const handleSectionClick = (section) => {
    setSelectedSection(section);
   
    if (section === 1) setCurrentQuestion(1); 
    if (section === 2) setCurrentQuestion(31); 
    if (section === 3) setCurrentQuestion(61); 
    if (section === 4) setCurrentQuestion(91); 
  };

 
  const handleAnswerChange = (index) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: index, 
    }));
  };

  
  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };


  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  
  const handleSubmit = () => {
    closeSubmitModal();
    setIsResultModalOpen(true); 
  };


  const openExitModal = () => {
    setIsExitModalOpen(true);
  };


  const closeExitModal = () => {
    setIsExitModalOpen(false);
  };

  
  const handleExit = () => {
    console.log('Thoát khỏi bài thi, tiến độ không được lưu.');
    closeExitModal();
    navigate('/dashboard'); 
  };


  const closeResultModal = () => {
    setIsResultModalOpen(false);
  };

  const handleReview = () => {
    closeResultModal();
    
    console.log('Xem lại bài làm:', answers);
  };


  const handleGoHome = () => {
    closeResultModal();
    navigate('/dashboard'); 
  };

  const getQuestionsForSection = () => {
    if (selectedSection === 1) return Array.from({ length: 30 }, (_, i) => i + 1); // Câu 1-30
    if (selectedSection === 2) return Array.from({ length: 30 }, (_, i) => i + 31); // Câu 31-60
    if (selectedSection === 3) return Array.from({ length: 30 }, (_, i) => i + 61); // Câu 61-90
    if (selectedSection === 4) return Array.from({ length: 30 }, (_, i) => i + 91); // Câu 91-120
    return [];
  };

  const currentQuestions = getQuestionsForSection();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tiêu đề chính - Cố định */}
      <div className="bg-[#0056B3] text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <h1 className="text-xl font-bold ml-[36px]">Bài thi thử ĐGNL</h1>
        <div className="flex items-center space-x-6 mr-[36px]">
          <span className="text-[14px] flex items-center">
            Đã trả lời: {answeredQuestions}/{totalQuestions}
          </span>
          <span className="text-[20px] font-bold">{formatTime(timeLeft)}</span>
          <button
            onClick={openExitModal}
            className="bg-[#DC2626] text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Thoát
          </button>
        </div>
      </div>

      {/* Nội dung chính và Pagination - Thêm padding-top để tránh bị header che */}
      <div className="pt-[72px] flex p-6">
        {/* Cột bên trái - Phần Thi */}
        <div className="w-[240px] bg-white rounded-[8px] shadow-md p-4 ml-[36px] mr-6">
          <h2 className="text-[18px] font-bold text-[#0056B3] mb-4">Phần Thi</h2>
          <hr className="border-t border-gray-200 mb-4" />
          <div className="space-y-2">
            <div
              className={`p-3 rounded cursor-pointer ${
                selectedSection === 1 ? 'bg-[#F0F7FF] text-[#0056B3]' : 'text-gray-700'
              }`}
              onClick={() => handleSectionClick(1)}
            >
              <p className="text-[16px] font-medium">Phần 1: Tiếng Việt</p>
              <p className="text-[12px] text-[#666666]">(Câu 1-30)</p>
            </div>
            <div
              className={`p-3 rounded cursor-pointer ${
                selectedSection === 2 ? 'bg-[#F0F7FF] text-[#0056B3]' : 'text-gray-700'
              }`}
              onClick={() => handleSectionClick(2)}
            >
              <p className="text-[16px] font-medium">Phần 2: Tiếng Anh</p>
              <p className="text-[12px] text-[#666666]">(Câu 31-60)</p>
            </div>
            <div
              className={`p-3 rounded cursor-pointer ${
                selectedSection === 3 ? 'bg-[#F0F7FF] text-[#0056B3]' : 'text-gray-700'
              }`}
              onClick={() => handleSectionClick(3)}
            >
              <p className="text-[16px] font-medium">Phần 3: Toán học</p>
              <p className="text-[12px] text-[#666666]">(Câu 61-90)</p>
            </div>
            <div
              className={`p-3 rounded cursor-pointer ${
                selectedSection === 4 ? 'bg-[#F0F7FF] text-[#0056B3]' : 'text-gray-700'
              }`}
              onClick={() => handleSectionClick(4)}
            >
              <p className="text-[16px] font-medium">Phần 4: Tư duy khoa học</p>
              <p className="text-[12px] text-[#666666]">(Câu 91-120)</p>
            </div>
          </div>
        </div>

        <div className="w-3/4 flex flex-col space-y-6">
          <div className="bg-white rounded-[8px] shadow-md p-6">
            <h2 className="text-[18px] font-bold text-[#0056B3] mb-2">Câu {currentQuestion}</h2>
            <p className="text-[14px] text-[#666666] mb-4">
              {selectedSection === 1 && 'Phần 1: Tiếng Việt'}
              {selectedSection === 2 && 'Phần 2: Tiếng Anh'}
              {selectedSection === 3 && 'Phần 3: Toán học'}
              {selectedSection === 4 && 'Phần 4: Tư duy khoa học'}
            </p>

          
            {selectedSection === 4 ? (
              <>
                {/* Thông tin bổ sung (context) */}
                <div className="bg-[#F0F7FF] border-l-4 border-black rounded-lg p-4 mb-4">
                  <p className="font-bold text-[#0056B3] mb-2">
                    DỰA VÀO THÔNG TIN DƯỚI ĐÂY ĐỂ TRẢ LỜI CÁC CÂU TỪ 91 ĐẾN 94
                  </p>
                  <p className="text-[16px] text-black">
                    Trong một nghiên cứu về một trường và biên độ khí hậu, các nhà khoa học đã phát hiện ra mối liên hệ giữa hoạt động con người và sự thay đổi của hệ sinh thái. Các dữ liệu thu thập được từ nhiều nguồn khác nhau cho thấy tác động đáng kể của việc phát thải khí nhà kính đối với nhiệt độ trái đất.
                  </p>
                </div>

                {/* Câu hỏi */}
                <p className="text-[16px] text-black mb-4">
                  Câu hỏi {currentQuestion}: Dựa vào đoạn văn về một trường và biên độ khí hậu, hãy phân tích...?
                </p>

                {/* Đáp án */}
                <div className="space-y-[11px]">
                  {answerOptions.map((answer, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-3 border rounded cursor-pointer ${
                        answers[currentQuestion] === index
                          ? 'border-[#0056B3] bg-[#F0F7FF]'
                          : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        checked={answers[currentQuestion] === index}
                        onChange={() => handleAnswerChange(index)}
                        className="mr-3"
                      />
                      <span className="text-[16px] text-gray-700">{answer}</span>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Câu hỏi (cho các phần khác) */}
                <p className="text-[16px] text-black mb-4">
                  Câu hỏi số {currentQuestion}: Đây là nội dung câu hỏi mẫu cho mục đích minh họa. Đâu là câu trả lời đúng cho tình huống này?
                </p>

                {/* Đáp án */}
                <div className="space-y-[11px]">
                  {answerOptions.map((answer, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-3 border rounded cursor-pointer ${
                        answers[currentQuestion] === index
                          ? 'border-[#0056B3] bg-[#F0F7FF]'
                          : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        checked={answers[currentQuestion] === index}
                        onChange={() => handleAnswerChange(index)}
                        className="mr-3"
                      />
                      <span className="text-[16px] text-gray-700">{answer}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Nút điều hướng */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === (selectedSection === 4 ? 91 : 1)}
                className={`py-2 px-4 rounded font-medium transition-colors ${
                  currentQuestion === (selectedSection === 4 ? 91 : 1)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0056B3] text-white hover:bg-[#004494]'
                }`}
              >
                Câu trước
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === (selectedSection === 4 ? 120 : 30)}
                className={`py-2 px-4 rounded font-medium transition-colors ${
                  currentQuestion === (selectedSection === 4 ? 120 : 30)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0056B3] text-white hover:bg-[#004494]'
                }`}
              >
                Câu tiếp theo
              </button>
            </div>
          </div>

          {/* Ô Pagination câu hỏi */}
          <div className="bg-white rounded-[8px] shadow-md p-6 flex flex-col">
            {/* Trạng thái - Góc phải phía trên */}
            <div className="flex justify-end space-x-4 mb-6">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-gray-200 mr-2 rounded-full"></span>
                <span>Chưa trả lời</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-[#0056B3] mr-2 rounded-full"></span>
                <span>Đã trả lời</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 border-2 border-[#0056B3] mr-2 rounded-full"></span>
                <span>Câu hiện tại</span>
              </div>
            </div>

            {/* Pagination câu hỏi */}
            <div className="grid grid-cols-10 gap-2 mb-6">
              {currentQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleQuestionClick(question)}
                  className={`p-2 border rounded text-center ${
                    question === currentQuestion
                      ? 'border-[#0056B3] bg-blue-50 text-[#0056B3]'
                      : answers[question] !== undefined
                      ? 'bg-[#0056B3] text-white border-[#0056B3]'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Nút Nộp Bài - Góc phải phía dưới */}
            <div className="flex justify-end">
              <button
                onClick={openSubmitModal}
                className="bg-[#0056B3] text-white py-2 px-6 rounded font-medium hover:bg-[#004494] transition-colors"
              >
                Nộp Bài
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Xác nhận nộp bài */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeSubmitModal}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] z-50">
            {/* Tiêu đề */}
            <h3 className="text-[18px] font-bold text-black mb-4">
              Xác nhận nộp bài
            </h3>
            {/* Nội dung */}
            <p className="text-[16px] text-[#666666] mb-6">
              Bạn còn {unansweredQuestions} câu chưa trả lời.<br />
              Bạn có chắc chắn muốn nộp bài?
            </p>
            {/* Nút điều hướng */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeSubmitModal}
                className="py-2 px-4 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmit}
                className="py-2 px-4 rounded font-medium bg-[#0056B3] text-white hover:bg-[#004494]"
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xác nhận thoát */}
      {isExitModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeExitModal}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] z-50">
            {/* Tiêu đề */}
            <h3 className="text-[18px] font-bold text-black mb-4">
              Xác nhận thoát
            </h3>
            {/* Nội dung */}
            <p className="text-[16px] text-[#666666] mb-6">
              Bạn có chắc chắn muốn thoát khỏi bài thi? Mọi câu trả lời sẽ không được lưu lại.
            </p>
            {/* Nút điều hướng */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeExitModal}
                className="py-2 px-4 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleExit}
                className="py-2 px-4 rounded font-medium bg-[#DC2626] text-white hover:bg-red-700"
              >
                Thoát
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Kết quả bài thi */}
      {isResultModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeResultModal}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] z-50">
            {/* Tiêu đề */}
            <h3 className="text-[18px] font-bold text-[#0056B3] mb-4">
              Kết quả bài thi
            </h3>
            {/* Số câu trả lời đúng */}
            <div className="bg-[#F0F7FF] p-4 rounded-lg mb-4 text-center">
              <p className="text-[16px] text-[#666666] mb-1">Số câu trả lời đúng</p>
              <p className="text-[24px] font-bold text-[#0056B3]">{correctAnswers}/{totalQuestions} câu</p>
            </div>
            {/* Kết quả theo phần */}
            <div className="mb-6">
              <h4 className="text-[16px] font-bold text-black mb-2">Kết quả theo phần</h4>
              <div className="space-y-4">
                {/* Phần 1: Tiếng Việt */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[14px] text-[#666666]">Phần 1: Tiếng Việt</p>
                    <p className="text-[14px] text-[#666666]">{answeredPerSection[1]}/30 câu</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#0056B3] h-2 rounded-full"
                      style={{ width: `${(answeredPerSection[1] / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {/* Phần 2: Tiếng Anh */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[14px] text-[#666666]">Phần 2: Tiếng Anh</p>
                    <p className="text-[14px] text-[#666666]">{answeredPerSection[2]}/30 câu</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#0056B3] h-2 rounded-full"
                      style={{ width: `${(answeredPerSection[2] / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {/* Phần 3: Toán học */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[14px] text-[#666666]">Phần 3: Toán học</p>
                    <p className="text-[14px] text-[#666666]">{answeredPerSection[3]}/30 câu</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#0056B3] h-2 rounded-full"
                      style={{ width: `${(answeredPerSection[3] / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {/* Phần 4: Tư duy khoa học */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[14px] text-[#666666]">Phần 4: Tư duy khoa học</p>
                    <p className="text-[14px] text-[#666666]">{answeredPerSection[4]}/30 câu</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#0056B3] h-2 rounded-full"
                      style={{ width: `${(answeredPerSection[4] / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Nút điều hướng */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleReview}
                className="py-2 px-4 rounded font-medium bg-[#0056B3] text-white hover:bg-[#004494]"
              >
                Xem lại bài làm
              </button>
              <button
                onClick={handleGoHome}
                className="py-2 px-4 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}