import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parse, isAfter, isBefore } from 'date-fns';
import CountUp from 'react-countup';

const getLocationName = (locationValue) => {
  if (!locationValue) return '';
  switch (locationValue) {
    case 'khanh-hoa':
      return 'Khánh Hòa';
    case 'ho-chi-minh':
      return 'Hồ Chí Minh';
    case 'ha-noi':
      return 'Hà Nội';
    default:
      return locationValue;
  }
};

// CSS cho hiệu ứng đổi màu và thêm animation scale-in
const styles = `
  @keyframes colorChange {
    0% { background: #EF4444; } /* Đỏ */
    40% { background: #EF4444; } /* Đỏ */
    41% { background: #F97316; } /* Cam */
    70% { background: #F97316; } /* Cam */
    71% { background: #059669; } /* Xanh */
    100% { background: #059669; } /* Xanh */
  }

  .score-bar {
    animation: colorChange 1s ease-out forwards;
  }

  @keyframes scaleIn {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  .animate-scale-in {
    animation: scaleIn 0.3s ease-out forwards;
  }
`;

const ExamSchedulePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendedMajors, setRecommendedMajors] = useState([]);
  const [registeredExams, setRegisteredExams] = useState([]);
  const [error, setError] = useState(null);
  const [scoreWidths, setScoreWidths] = useState({});

  const exams = [
    {
      id: 1,
      title: 'Kỳ thi ĐGNL đợt 1 năm 2025',
      date: '30/03/2025',
      registrationPeriod: '20/01/2025 - 20/02/2025',
      resultAnnouncementDate: '16/04/2025',
      ticketAnnouncementDate: '22/03/2025',
      scores: {
        total: 1064,
        vietnamese: 264,
        english: 276,
        math: 255,
        logic: 108,
        science: 161,
      },
    },
    {
      id: 2,
      title: 'Kỳ thi ĐGNL đợt 2 năm 2025',
      date: '01/06/2025',
      registrationPeriod: '17/04/2025 - 07/05/2025',
      resultAnnouncementDate: '16/06/2025',
      ticketAnnouncementDate: '24/05/2025',
    },
  ];

  const currentDate = new Date(); 

  useEffect(() => {
    try {
      const storedExams = localStorage.getItem('registeredExams');
      if (storedExams) {
        const parsedExams = JSON.parse(storedExams);
        setRegisteredExams(Array.isArray(parsedExams) ? parsedExams : []);
      } else {
        setRegisteredExams([]);
      }
    } catch (err) {
      console.error('Error parsing registeredExams from localStorage:', err);
      setRegisteredExams([]);
      setError('Không thể tải dữ liệu đăng ký. Vui lòng thử lại.');
    }
  }, []);

  // Hiệu ứng động cho thanh điểm
  useEffect(() => {
    const initialWidths = {};
    exams.forEach((exam) => {
      if (exam.scores) {
        initialWidths[exam.id] = {
          vietnamese: 0,
          english: 0,
          math: 0,
          logic: 0,
          science: 0,
        };
        setTimeout(() => {
          setScoreWidths((prev) => ({
            ...prev,
            [exam.id]: {
              vietnamese: (exam.scores.vietnamese / 300) * 100,
              english: (exam.scores.english / 300) * 100,
              math: (exam.scores.math / 300) * 100,
              logic: (exam.scores.logic / 120) * 100,
              science: (exam.scores.science / 180) * 100,
            },
          }));
        }, 100);
      }
    });
    setScoreWidths(initialWidths);
  }, []);

  const handleRegister = (exam) => {
    if (!exam || !exam.id) return;
    navigate(`/dang-ky/${exam.id}`, { state: { title: exam.title, date: exam.date } });
  };

  const handleAdjust = (exam) => {
    if (!exam || !exam.id) return;
    navigate(`/dang-ky/${exam.id}`, { state: { title: exam.title, date: exam.date } });
  };

  const handlePayment = (exam) => {
    if (!exam || !exam.id) return;
    const registeredExam = registeredExams.find((re) => re.examId === exam.id.toString());
    if (!registeredExam) return;

    const updatedRegistrationData = {
      ...registeredExam,
      isPaid: true,
    };

    const updatedExams = registeredExams.map((re) =>
      re.examId === exam.id.toString() ? updatedRegistrationData : re
    );
    setRegisteredExams(updatedExams);
    localStorage.setItem('registeredExams', JSON.stringify(updatedExams));

    navigate('/payment-success', { state: { registrationData: updatedRegistrationData } });
  };

  const handleDownloadTicket = () => {
    alert('Tải giấy báo dự thi...');
  };

  const handleDownloadResult = () => {
    alert('Tải kết quả thi...');
  };

  const handleRequestReview = () => {
    alert('Đăng ký phúc khảo...');
  };

  const handleRecommendMajor = () => {
    const majors = [
      {
        code: '7343057969630',
        name: 'QST7480101.TT',
        school: 'Khoa học Máy tính (CT Tiên tiến)',
        rank: 1,
        previousScore: 1035,
      },
      {
        code: '7343057969630',
        name: 'QST7480107',
        school: 'Trí tuệ Nhân tạo',
        rank: 2,
        previousScore: 1001,
      },
      {
        code: '7343057969630',
        name: 'QSC7480107',
        school: 'Trí tuệ Nhân tạo',
        rank: 3,
        previousScore: 970,
      },
    ];
    setRecommendedMajors(majors);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getExamStatus = (exam) => {
    if (!exam || !exam.registrationPeriod || !exam.date || !exam.resultAnnouncementDate || !exam.ticketAnnouncementDate) {
      return {
        isBeforeRegistration: false,
        isDuringRegistration: false,
        isAfterRegistration: false,
        isAfterTicketAnnouncement: false,
        isAfterExam: false,
        hasResult: false,
      };
    }

    try {
      const [startDate, endDate] = exam.registrationPeriod
        .split(' - ')
        .map((date) => parse(date.trim(), 'dd/MM/yyyy', new Date()));
      const examDate = parse(exam.date, 'dd/MM/yyyy', new Date());
      const resultDate = parse(exam.resultAnnouncementDate, 'dd/MM/yyyy', new Date());
      const ticketDate = parse(exam.ticketAnnouncementDate, 'dd/MM/yyyy', new Date());

      const isBeforeRegistration = isBefore(currentDate, startDate);
      const isDuringRegistration = !isBeforeRegistration && isBefore(currentDate, endDate);
      const isAfterRegistration = isAfter(currentDate, endDate);
      const isAfterTicketAnnouncement = isAfter(currentDate, ticketDate);
      const isAfterExam = isAfter(currentDate, examDate);
      const hasResult = isAfter(currentDate, resultDate);

      return {
        isBeforeRegistration,
        isDuringRegistration,
        isAfterRegistration,
        isAfterTicketAnnouncement,
        isAfterExam,
        hasResult,
      };
    } catch (err) {
      console.error('Error parsing dates for exam:', exam, err);
      return {
        isBeforeRegistration: false,
        isDuringRegistration: false,
        isAfterRegistration: false,
        isAfterTicketAnnouncement: false,
        isAfterExam: false,
        hasResult: false,
      };
    }
  };

  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-white">
        <div className="relative w-full max-w-[1200px] mx-auto flex-grow py-6 px-4">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="w-full min-h-screen flex flex-col bg-white">
        <div className="relative w-full max-w-[1200px] mx-auto flex-grow py-6 px-4">
          {exams.some((exam) => {
            const { hasResult, isAfterExam } = getExamStatus(exam);
            const registeredExam = registeredExams.find((re) => re.examId === exam.id.toString());
            return registeredExam && registeredExam.isPaid && hasResult && isAfterExam;
          }) ? (
            <>
              <div className="w-full bg-[#F0FDF4] border-l-4 border-[#059669] p-4 mb-6 animate-slide-right">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#059669] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h2 className="text-[#059669] text-lg font-bold">Kết quả kỳ thi đã được công bố!</h2>
                    <p className="text-[#059669] text-sm">Kết quả {exams[0]?.title || 'kỳ thi'} đã có. Xem ngay bên dưới.</p>
                  </div>
                </div>
              </div>
              {exams
                .filter((exam) => {
                  const { hasResult, isAfterExam } = getExamStatus(exam);
                  const registeredExam = registeredExams.find((re) => re.examId === exam.id.toString());
                  return registeredExam && registeredExam.isPaid && hasResult && isAfterExam;
                })
                .map((exam, index) => (
                  <div
                    key={exam.id}
                    className="w-full bg-white rounded-lg shadow-md p-6 mb-6 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-black">{exam.title}</h3>
                        <p className="text-sm text-gray-500 mt-2">Ngày thi: {exam.date}</p>
                      </div>
                      <div className="flex space-x-2 mt-4 sm:mt-0">
                        <button
                          className="px-4 py-2 border border-[#0056B3] text-[#0056B3] text-sm font-bold rounded hover:bg-[#e6f0ff] transition transform hover:scale-105"
                          onClick={handleRecommendMajor}
                        >
                          Khuyến nghị ngành học
                        </button>
                        <button
                          className="px-4 py-2 border border-[#0056B3] text-[#0056B3] text-sm font-bold rounded hover:bg-[#e6f0ff] transition transform hover:scale-105"
                          onClick={handleDownloadResult}
                        >
                          Tải kết quả thi
                        </button>
                        <button
                          className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#003f8a] transition transform hover:scale-105"
                          onClick={handleRequestReview}
                        >
                          Đăng ký phúc khảo
                        </button>
                      </div>
                    </div>
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-500">Tổng điểm</p>
                      <p className="text-4xl font-bold text-[#059669]">
                        <CountUp
                          start={0}
                          end={exam.scores?.total || 0}
                          duration={2}
                          useEasing={true}
                          separator=","
                        />
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Tiếng Việt</span>
                          <span className="text-sm text-[#059669] font-bold">
                            Điểm đạt được: {exam.scores?.vietnamese || 0}/300
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out score-bar"
                            style={{
                              width: `${scoreWidths[exam.id]?.vietnamese || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Tiếng Anh</span>
                          <span className="text-sm text-[#059669] font-bold">
                            Điểm đạt được: {exam.scores?.english || 0}/300
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out score-bar"
                            style={{
                              width: `${scoreWidths[exam.id]?.english || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Toán học</span>
                          <span className="text-sm text-[#059669] font-bold">
                            Điểm đạt được: {exam.scores?.math || 0}/300
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out score-bar"
                            style={{
                              width: `${scoreWidths[exam.id]?.math || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Logic và phân tích số liệu</span>
                          <span className="text-sm text-[#059669] font-bold">
                            Điểm đạt được: {exam.scores?.logic || 0}/120
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out score-bar"
                            style={{
                              width: `${scoreWidths[exam.id]?.logic || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Suy luận khoa học</span>
                          <span className="text-sm text-[#059669] font-bold">
                            Điểm đạt được: {exam.scores?.science || 0}/180
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out score-bar"
                            style={{
                              width: `${scoreWidths[exam.id]?.science || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#0056B3] text-sm mt-4">
                      Kết quả này có giá trị trong vòng 1 năm kể từ ngày thi.
                    </p>
                  </div>
                ))}
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-black mb-6 animate-fade-in">Kỳ thi sắp diễn ra</h2>
              {exams.length === 0 ? (
                <p className="text-center text-gray-500">Hiện tại chưa có kỳ thi nào.</p>
              ) : (
                <div className="space-y-6">
                  {exams.map((exam, index) => {
                    const {
                      isBeforeRegistration,
                      isDuringRegistration,
                      isAfterRegistration,
                      isAfterTicketAnnouncement,
                      isAfterExam,
                      hasResult,
                    } = getExamStatus(exam);

                    const registeredExam = registeredExams.find(
                      (re) => re.examId === exam.id.toString()
                    );
                    const isRegistered = !!registeredExam;
                    const isPaid = registeredExam?.isPaid;

                    let statusText = '';
                    if (isBeforeRegistration) {
                      statusText = 'Sắp mở đăng ký';
                    } else if (isDuringRegistration) {
                      statusText = 'Đang mở đăng ký';
                    } else if (isAfterRegistration && !isAfterTicketAnnouncement) {
                      statusText = 'Hết hạn đăng ký';
                    } else if (isAfterTicketAnnouncement && !isAfterExam) {
                      statusText = 'Sắp diễn ra';
                    } else if (isAfterExam && !hasResult) {
                      statusText = 'Đang chờ kết quả';
                    } else if (hasResult) {
                      statusText = 'Đã có kết quả';
                    }

                    return (
                      <div
                        key={exam.id}
                        className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-black">{exam.title}</h3>
                            <p className="text-sm text-gray-500 mt-2">Ngày thi: {exam.date}</p>
                            <p className="text-sm text-gray-500">
                              Thời gian đăng ký thi: {exam.registrationPeriod}
                            </p>
                            {isRegistered && (
                              <>
                                <p className="text-sm text-gray-500">
                                  Mã hồ sơ dự thi: {registeredExam?.profileCode || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Địa điểm dự thi: {getLocationName(registeredExam?.examLocation)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Tình trạng thanh toán:{' '}
                                  <span className={isPaid ? 'text-green-500' : 'text-red-500'}>
                                    {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                  </span>
                                </p>
                              </>
                            )}
                          </div>
                          <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
                            <span
                              className={`px-4 py-1 text-sm rounded-full bg-gray-200 text-black flex items-center justify-center transform transition-all duration-300 hover:scale-105`}
                            >
                              {statusText}
                            </span>
                            {isRegistered ? (
                              isPaid ? (
                                isAfterExam ? (
                                  hasResult ? (
                                    <button
                                      className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#003f8a] transition transform hover:scale-105"
                                      onClick={handleDownloadResult}
                                    >
                                      Xem kết quả
                                    </button>
                                  ) : (
                                    <p className="text-sm text-gray-500">Đang chờ kết quả...</p>
                                  )
                                ) : isAfterTicketAnnouncement ? (
                                  <button
                                    className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#003f8a] transition transform hover:scale-105"
                                    onClick={handleDownloadTicket}
                                  >
                                    Tải giấy báo dự thi
                                  </button>
                                ) : (
                                  <p className="text-sm text-gray-500">Chờ thông báo giấy báo dự thi...</p>
                                )
                              ) : (
                                <div className="flex space-x-2">
                                  <button
                                    className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#003f8a] transition transform hover:scale-105"
                                    onClick={() => handleAdjust(exam)}
                                  >
                                    Điều chỉnh
                                  </button>
                                  <button
                                    className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition transform hover:scale-105"
                                    onClick={() => handlePayment(exam)}
                                  >
                                    Thanh toán
                                  </button>
                                </div>
                              )
                            ) : isDuringRegistration ? (
                              <button
                                aria-label={`Đăng ký kỳ thi ${exam.title}`}
                                className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#003f8a] transition transform hover:scale-105"
                                onClick={() => handleRegister(exam)}
                              >
                                Đăng ký
                              </button>
                            ) : (
                              <p className="text-sm text-red-500 font-medium">
                                {isBeforeRegistration ? 'Chưa mở đăng ký' : 'Không thể đăng ký'}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
          <h2 className="text-xl font-bold text-black mt-8 mb-6 animate-fade-in">Kỳ thi sắp tới</h2>
          <div className="space-y-6">
            {exams
              .filter((exam) => {
                const { hasResult } = getExamStatus(exam);
                return !hasResult;
              })
              .map((exam, index) => {
                const { isBeforeRegistration, isDuringRegistration, isAfterTicketAnnouncement, isAfterExam } = getExamStatus(exam);
                let statusText = '';
                if (isBeforeRegistration) {
                  statusText = 'Sắp mở đăng ký';
                } else if (isDuringRegistration) {
                  statusText = 'Đang mở đăng ký';
                } else if (isAfterTicketAnnouncement && !isAfterExam) {
                  statusText = 'Sắp diễn ra';
                } else {
                  statusText = 'Hết hạn đăng ký';
                }

                return (
                  <div
                    key={exam.id}
                    className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-black">{exam.title}</h3>
                        <p className="text-sm text-gray-500 mt-2">Ngày thi: {exam.date}</p>
                        <p className="text-sm text-gray-500">
                          Số lượng: 2500 Đã đăng ký: 0
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
                        <span className="px-4 py-1 text-sm rounded-full bg-gray-200 text-black flex items-center justify-center transform transition-all duration-300 hover:scale-105">
                          {statusText}
                        </span>
                        {isDuringRegistration ? (
                          <button
                            className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#003f8a] transition transform hover:scale-105"
                            onClick={() => handleRegister(exam)}
                          >
                            Đăng ký
                          </button>
                        ) : (
                          <p className="text-sm text-gray-500">
                            {isBeforeRegistration ? 'Chưa mở đăng ký' : 'Hết hạn đăng ký'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={handleCloseModal}
            ></div>
            <div className="bg-white rounded-lg shadow-md p-6 z-50 flex flex-col justify-between w-[640px] max-h-[80vh] overflow-y-auto animate-fade-in animate-scale-in">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Khuyến nghị ngành học
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-sm font-semibold text-gray-700">Mã ngành</th>
                        <th className="p-3 text-sm font-semibold text-gray-700">Tên ngành</th>
                        <th className="p-3 text-sm font-semibold text-gray-700">Tên trường</th>
                        <th className="p-3 text-sm font-semibold text-gray-700">Xếp hạng</th>
                        <th className="p-3 text-sm font-semibold text-gray-700">Điểm chuẩn năm trước</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recommendedMajors.map((major, index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-200 hover:bg-gray-50 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                        >
                          <td className="p-3 text-sm text-gray-900">{major.code}</td>
                          <td className="p-3 text-sm text-gray-900">{major.name}</td>
                          <td className="p-3 text-sm text-gray-900">{major.school}</td>
                          <td className="p-3 text-sm text-gray-900">{major.rank}</td>
                          <td className="p-3 text-sm text-gray-900">{major.previousScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#0056B3] text-sm mt-4 italic">
                  Lưu ý: Khuyến nghị này dựa trên kết quả thi của thí sinh và chỉ mang tính chất tham khảo.
                </p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleCloseModal}
                  className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded font-medium hover:bg-gray-100 transition transform hover:scale-105"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExamSchedulePage;