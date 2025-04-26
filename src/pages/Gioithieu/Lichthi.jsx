import React, { useState, useEffect } from 'react';
import Tabs from '../../components/Tabs';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaHourglassStart } from 'react-icons/fa';

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const noteVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
};

export default function LichThi() {
  // Countdown timer state for each Đợt
  const [countdownDot1, setCountdownDot1] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownDot2, setCountdownDot2] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextEventDot1, setNextEventDot1] = useState('');
  const [nextEventDot2, setNextEventDot2] = useState('');

  // Dates for Đợt 1 and Đợt 2
  const dot1Dates = {
    registrationStart: new Date('2025-01-20T00:00:00'),
    registrationEnd: new Date('2025-02-20T23:59:59'),
    examDate: new Date('2025-03-30T08:00:00'),
    resultAnnouncement: new Date('2025-04-16T08:00:00'),
  };

  const dot2Dates = {
    registrationStart: new Date('2025-04-17T00:00:00'),
    registrationEnd: new Date('2025-05-07T23:59:59'),
    examDate: new Date('2025-06-01T08:00:00'),
    resultAnnouncement: new Date('2025-06-16T08:00:00'),
  };

  // Function to calculate countdown
  const calculateCountdown = (targetDate, setCountdown) => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  };

  // Determine the next upcoming event for each Đợt
  useEffect(() => {
    const now = new Date();

    // Đợt 1
    const dot1Events = [
      { date: dot1Dates.registrationStart, label: 'Mở đăng ký dự thi' },
      { date: dot1Dates.registrationEnd, label: 'Kết thúc đăng ký' },
      { date: dot1Dates.examDate, label: 'Ngày thi' },
      { date: dot1Dates.resultAnnouncement, label: 'Công bố kết quả' },
    ];

    const nextDot1Event = dot1Events.find(event => event.date > now) || dot1Events[dot1Events.length - 1];
    setNextEventDot1(nextDot1Event.label);
    calculateCountdown(nextDot1Event.date, setCountdownDot1);

    // Đợt 2
    const dot2Events = [
      { date: dot2Dates.registrationStart, label: 'Mở đăng ký dự thi' },
      { date: dot2Dates.registrationEnd, label: 'Kết thúc đăng ký' },
      { date: dot2Dates.examDate, label: 'Ngày thi' },
      { date: dot2Dates.resultAnnouncement, label: 'Công bố kết quả' },
    ];

    const nextDot2Event = dot2Events.find(event => event.date > now) || dot2Events[dot2Events.length - 1];
    setNextEventDot2(nextDot2Event.label);
    calculateCountdown(nextDot2Event.date, setCountdownDot2);

    // Update countdown every second
    const interval = setInterval(() => {
      calculateCountdown(nextDot1Event.date, setCountdownDot1);
      calculateCountdown(nextDot2Event.date, setCountdownDot2);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Tabs />

      {/* Nội dung chính */}
      <motion.div
        className="max-w-[1224px] mx-auto mt-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#0056B3] font-roboto leading-tight text-center mb-8">
          Lịch thi ĐGNL 2025
        </h1>

        {/* Khối nội dung */}
        <div className="mt-12 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Đợt 1 */}
            <motion.div
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              role="region"
              aria-label="Lịch thi Đợt 1"
            >
              <div className="text-xl font-bold text-[#0056B3] font-roboto leading-7 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2" /> Đợt 1
              </div>
              <div className="space-y-4">
                {/* Mở đăng ký và Kết thúc đăng ký chung hàng */}
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center flex-1">
                    <FaHourglassStart className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Mở đăng ký:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        20/01/2025
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-1">
                    <FaHourglassStart className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Kết thúc đăng ký:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        20/02/2025
                      </div>
                    </div>
                  </div>
                </div>
                {/* Ngày thi và Công bố kết quả chung hàng */}
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center flex-1">
                    <FaCalendarAlt className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Ngày thi:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        30/03/2025
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-1">
                    <FaCheckCircle className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Công bố kết quả:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        16/04/2025
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Countdown Timer */}
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-300 to-blue-400 rounded-lg text-center border border-indigo-200 shadow-md">
                <div className="text-sm font-bold text-white mb-2">
                  Còn lại đến {nextEventDot1}:
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot1.days}</div>
                    <div className="text-xs text-gray-700">Ngày</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot1.hours}</div>
                    <div className="text-xs text-gray-700">Giờ</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot1.minutes}</div>
                    <div className="text-xs text-gray-700">Phút</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot1.seconds}</div>
                    <div className="text-xs text-gray-700">Giây</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Đợt 2 */}
            <motion.div
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              role="region"
              aria-label="Lịch thi Đợt 2"
            >
              <div className="text-xl font-bold text-[#0056B3] font-roboto leading-7 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2" /> Đợt 2
              </div>
              <div className="space-y-4">
                {/* Mở đăng ký và Kết thúc đăng ký chung hàng */}
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center flex-1">
                    <FaHourglassStart className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Mở đăng ký:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        17/04/2025
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-1">
                    <FaHourglassStart className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Kết thúc đăng ký:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        07/05/2025
                      </div>
                    </div>
                  </div>
                </div>
                {/* Ngày thi và Công bố kết quả chung hàng */}
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center flex-1">
                    <FaCalendarAlt className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Ngày thi:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        01/06/2025
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-1">
                    <FaCheckCircle className="text-[#0056B3] mr-3" />
                    <div>
                      <div className="text-base font-bold text-[#333333] font-roboto leading-6">
                        Công bố kết quả:
                      </div>
                      <div className="text-base text-[#333333] font-roboto leading-6">
                        16/06/2025
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Countdown Timer */}
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-300 to-blue-400 rounded-lg text-center border border-indigo-200 shadow-md">
                <div className="text-sm font-bold text-white mb-2">
                  Còn lại đến {nextEventDot2}:
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot2.days}</div>
                    <div className="text-xs text-gray-700">Ngày</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot2.hours}</div>
                    <div className="text-xs text-gray-700">Giờ</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot2.minutes}</div>
                    <div className="text-xs text-gray-700">Phút</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-md p-2 border border-indigo-100 shadow-sm">
                    <div className="text-xl font-bold text-indigo-600">{countdownDot2.seconds}</div>
                    <div className="text-xs text-gray-700">Giây</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Ghi chú */}
          <motion.div
            className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md p-4 shadow-sm"
            variants={noteVariants}
          >
            <div className="text-sm text-[#0056B3] font-roboto leading-[21px] flex items-center">
              <FaCheckCircle className="mr-2" />
              Lưu ý: Thí sinh cần đăng ký dự thi trực tuyến và nộp lệ phí theo quy định. Mỗi thí sinh được đăng ký tối đa 2 đợt thi trong năm.
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}