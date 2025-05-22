import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDangNhap from '../components/HeaderDangNhap'; 

export default function QnA() {
    const [questions, setQuestions] = useState([
        // Đăng ký tài khoản và thông tin cá nhân
        {
            id: 1,
            question: 'Tôi cần những giấy tờ gì để đăng ký dự thi?',
            answer: 'Để đăng ký dự thi, bạn cần chuẩn bị CMND/CCCD, ảnh 3x4, học bạ (đối với học sinh), bằng tốt nghiệp THPT (đối với thí sinh tự do), và các giấy tờ ưu tiên (nếu có).',
            category: 'Đăng ký tài khoản và thông tin cá nhân'
        },
        {
            id: 2,
            question: 'Làm thế nào để đăng ký tài khoản trên hệ thống?',
            answer: 'Để đăng ký tài khoản, bạn cần truy cập trang web chính thức của kỳ thi, chọn "Đăng ký", điền đầy đủ thông tin cá nhân, xác nhận email, và tạo mật khẩu đăng nhập.',
            category: 'Đăng ký tài khoản và thông tin cá nhân'
        },
        {
            id: 3,
            question: 'Tôi không nhận được email kích hoạt tài khoản phải làm sao?',
            answer: 'Nếu bạn không nhận được email kích hoạt, hãy kiểm tra thư mục spam/rác trong hộp thư. Nếu vẫn không tìm thấy, bạn có thể sử dụng chức năng "Gửi lại email kích hoạt" trên trang đăng nhập hoặc liên hệ bộ phận hỗ trợ kỹ thuật.',
            category: 'Đăng ký tài khoản và thông tin cá nhân'
        },
        {
            id: 4,
            question: 'Tôi quên mật khẩu đăng nhập thì phải làm gì?',
            answer: 'Nếu quên mật khẩu, bạn có thể nhấp vào liên kết "Quên mật khẩu" trên trang đăng nhập, nhập email đã đăng ký và làm theo hướng dẫn để đặt lại mật khẩu mới.',
            category: 'Đăng ký tài khoản và thông tin cá nhân'
        },
        {
            id: 5,
            question: 'Tôi có thể đăng nhập bằng nhiều thiết bị cùng lúc được không?',
            answer: 'Có, bạn có thể đăng nhập vào tài khoản của mình từ nhiều thiết bị khác nhau. Tuy nhiên, để đảm bảo an toàn thông tin, hãy đảm bảo đăng xuất khi sử dụng máy tính công cộng.',
            category: 'Đăng ký tài khoản và thông tin cá nhân'
        },
        {
            id: 6,
            question: 'Tôi có thể thay đổi thông tin cá nhân sau khi đã đăng ký không?',
            answer: 'Bạn có thể thay đổi một số thông tin cá nhân như số điện thoại, địa chỉ liên hệ. Tuy nhiên, các thông tin quan trọng như họ tên, ngày sinh, số CMND/CCCD sẽ không thể thay đổi sau khi đã xác nhận. Nếu cần sửa, vui lòng liên hệ ban tổ chức.',
            category: 'Đăng ký tài khoản và thông tin cá nhân'
        },
        {
            id: 7,
            question: 'Tôi không biết mình thuộc khu vực ưu tiên nào?',
            answer: 'Để xác định khu vực ưu tiên, bạn cần căn cứ vào nơi học THPT (3 năm hoặc 2 năm cuối cấp). Thông tin chi tiết về các khu vực ưu tiên có trong quy chế tuyển sinh. Nếu vẫn chưa rõ, bạn có thể liên hệ với nhà trường hoặc ban tổ chức để được hướng dẫn.',
            category: 'Đăng ký tài khoản và thông tin cá nhân'
        },
        
        // Lệ phí và thanh toán
        {
            id: 8,
            question: 'Lệ phí đăng ký dự thi là bao nhiêu?',
            answer: 'Lệ phí đăng ký dự thi đánh giá năng lực ĐHQG TP.HCM thường dao động từ 200.000đ đến 300.000đ tùy theo từng đợt thi và năm tuyển sinh.',
            category: 'Lệ phí và thanh toán'
        },
        {
            id: 9,
            question: 'Lệ phí đăng ký xét tuyển nguyện vọng là bao nhiêu?',
            answer: 'Lệ phí đăng ký xét tuyển thường là 20.000đ/nguyện vọng. Tùy theo số lượng nguyện vọng bạn đăng ký, tổng lệ phí sẽ thay đổi tương ứng.',
            category: 'Lệ phí và thanh toán'
        },
        {
            id: 10,
            question: 'Tôi có thể thanh toán lệ phí bằng những hình thức nào?',
            answer: 'Bạn có thể thanh toán lệ phí qua các hình thức như chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay, VNPay), thẻ ATM nội địa có đăng ký Internet Banking, hoặc thẻ quốc tế (Visa, Mastercard).',
            category: 'Lệ phí và thanh toán'
        },
        {
            id: 11,
            question: 'Sau khi thanh toán, bao lâu hệ thống sẽ cập nhật trạng thái?',
            answer: 'Thông thường, hệ thống sẽ cập nhật trạng thái thanh toán trong vòng 24-48 giờ. Nếu thanh toán qua các cổng thanh toán trực tuyến, việc cập nhật có thể nhanh hơn, chỉ trong vài phút.',
            category: 'Lệ phí và thanh toán'
        },
        {
            id: 12,
            question: 'Tôi đã thanh toán nhưng hệ thống chưa cập nhật, tôi phải làm gì?',
            answer: 'Nếu sau 48 giờ hệ thống vẫn chưa cập nhật trạng thái thanh toán, bạn cần liên hệ với ban tổ chức qua email hoặc hotline hỗ trợ, cung cấp thông tin cá nhân và bằng chứng thanh toán (như biên lai, mã giao dịch) để được hỗ trợ.',
            category: 'Lệ phí và thanh toán'
        },
        {
            id: 13,
            question: 'Lệ phí đã đóng có được hoàn trả không?',
            answer: 'Thông thường, lệ phí đã đóng sẽ không được hoàn trả, trừ trường hợp bất khả kháng như kỳ thi bị hủy bỏ. Vui lòng tham khảo quy định cụ thể trong thông báo tuyển sinh của năm hiện tại.',
            category: 'Lệ phí và thanh toán'
        },
        
        // Đăng ký dự thi
        {
            id: 14,
            question: 'Thời gian đăng ký dự thi là khi nào?',
            answer: 'Thời gian đăng ký dự thi thường được thông báo trên website chính thức của kỳ thi, thường bắt đầu từ 1-2 tháng trước ngày thi. Mỗi đợt thi sẽ có thời gian đăng ký khác nhau, vui lòng theo dõi thông báo chính thức.',
            category: 'Đăng ký dự thi'
        },
        {
            id: 15,
            question: 'Làm thế nào để thay đổi địa điểm thi?',
            answer: 'Để thay đổi địa điểm thi, bạn cần đăng nhập vào tài khoản và sử dụng chức năng "Thay đổi thông tin dự thi" trong thời gian cho phép điều chỉnh. Sau thời hạn này, việc thay đổi địa điểm thi sẽ không được chấp nhận.',
            category: 'Đăng ký dự thi'
        },
        {
            id: 16,
            question: 'Tôi có thể đăng ký thi nhiều đợt trong năm không?',
            answer: 'Có, bạn có thể đăng ký tham gia nhiều đợt thi trong năm. Mỗi đợt thi sẽ yêu cầu đăng ký và đóng lệ phí riêng. Điểm cao nhất trong các đợt thi sẽ được sử dụng để xét tuyển.',
            category: 'Đăng ký dự thi'
        },
        {
            id: 17,
            question: 'Học sinh lớp 11 hoặc thí sinh tự do có được đăng ký dự thi không?',
            answer: 'Có, học sinh lớp 11 và thí sinh tự do đều có thể đăng ký dự thi đánh giá năng lực. Tuy nhiên, khi xét tuyển đại học, thí sinh cần đáp ứng điều kiện tốt nghiệp THPT theo quy định của Bộ Giáo dục và Đào tạo.',
            category: 'Đăng ký dự thi'
        },
        {
            id: 18,
            question: 'Tôi cần làm gì sau khi hoàn thành đăng ký dự thi?',
            answer: 'Sau khi hoàn thành đăng ký và thanh toán lệ phí, bạn cần theo dõi email và tài khoản trên hệ thống để nhận thông tin về số báo danh, phòng thi, và lịch thi. Trước ngày thi 1-2 tuần, bạn có thể tải Giấy báo dự thi từ hệ thống.',
            category: 'Đăng ký dự thi'
        },
        
        // Xét tuyển
        {
            id: 19,
            question: 'Có bao nhiêu trường sử dụng kết quả thi đánh giá năng lực ĐHQG TP.HCM?',
            answer: 'Hiện có khoảng 80-100 trường đại học, cao đẳng trên cả nước sử dụng kết quả thi đánh giá năng lực ĐHQG TP.HCM để xét tuyển. Danh sách cụ thể các trường và ngành xét tuyển được cập nhật hàng năm trên website chính thức của kỳ thi.',
            category: 'Xét tuyển'
        },
        {
            id: 20,
            question: 'Làm thế nào để đăng ký xét tuyển bằng điểm thi đánh giá năng lực?',
            answer: 'Để đăng ký xét tuyển, bạn cần truy cập vào hệ thống xét tuyển của trường đại học mà bạn muốn nộp hồ sơ, chọn phương thức xét tuyển bằng điểm đánh giá năng lực, và nhập mã số dự thi cùng các thông tin cần thiết khác theo hướng dẫn.',
            category: 'Xét tuyển'
        },
        {
            id: 21,
            question: 'Tôi có thể đăng ký bao nhiêu nguyện vọng xét tuyển?',
            answer: 'Số lượng nguyện vọng xét tuyển thường không giới hạn, tuy nhiên mỗi nguyện vọng sẽ có một khoản lệ phí riêng. Bạn nên sắp xếp thứ tự ưu tiên các nguyện vọng một cách hợp lý.',
            category: 'Xét tuyển'
        },
        {
            id: 22,
            question: 'Tôi muốn xét tuyển vào trường ngoài hệ thống ĐHQG TP.HCM thì đăng ký như thế nào?',
            answer: 'Để xét tuyển vào các trường ngoài hệ thống ĐHQG TP.HCM nhưng có sử dụng kết quả thi đánh giá năng lực, bạn cần truy cập website tuyển sinh của trường đó và làm theo hướng dẫn đăng ký xét tuyển. Mỗi trường sẽ có quy trình và thời gian xét tuyển riêng.',
            category: 'Xét tuyển'
        },
        {
            id: 23,
            question: 'Điểm thi đánh giá năng lực ĐHQG HN có thể quy đổi sang điểm thi ĐHQG TP.HCM không?',
            answer: 'Hiện tại, điểm thi đánh giá năng lực của ĐHQG Hà Nội và ĐHQG TP.HCM là hai hệ thống riêng biệt và không có cơ chế quy đổi chính thức. Bạn cần sử dụng kết quả thi phù hợp với yêu cầu của trường mà bạn muốn xét tuyển.',
            category: 'Xét tuyển'
        },
        
        // Kết quả thi
        {
            id: 24,
            question: 'Khi nào công bố kết quả thi?',
            answer: 'Kết quả thi thường được công bố sau 2-3 tuần kể từ ngày thi. Bạn có thể tra cứu kết quả bằng số báo danh và CMND/CCCD trên cổng thông tin điện tử của kỳ thi.',
            category: 'Kết quả thi'
        },
        {
            id: 25,
            question: 'Làm thế nào để tra cứu điểm thi?',
            answer: 'Để tra cứu điểm thi, bạn cần đăng nhập vào tài khoản trên hệ thống hoặc truy cập mục "Tra cứu điểm thi" trên website chính thức, nhập số báo danh và CMND/CCCD để xem kết quả.',
            category: 'Kết quả thi'
        },
        {
            id: 26,
            question: 'Tôi có thể nhận Giấy chứng nhận kết quả thi bằng cách nào?',
            answer: 'Sau khi có kết quả thi, bạn có thể tải Giấy chứng nhận kết quả thi từ hệ thống và in ra. Trong một số trường hợp, ban tổ chức có thể gửi Giấy chứng nhận qua đường bưu điện nếu thí sinh có yêu cầu và đóng phí gửi.',
            category: 'Kết quả thi'
        },
        {
            id: 27,
            question: 'Thời hạn sử dụng kết quả thi là bao lâu?',
            answer: 'Thời hạn sử dụng kết quả thi đánh giá năng lực ĐHQG TP.HCM thường là 1 năm (áp dụng cho mùa tuyển sinh ngay sau kỳ thi). Một số trường có thể có quy định riêng về việc sử dụng kết quả thi, vui lòng kiểm tra thông tin tuyển sinh của từng trường.',
            category: 'Kết quả thi'
        }
    ]);
    
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleQuestionClick = (question) => {
        if (selectedQuestion === question) {
            setShowAnswer(!showAnswer);
        } else {
            setSelectedQuestion(question);
            setShowAnswer(true);
        }
    }

    // Nhóm câu hỏi theo chủ đề
    const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.category]) {
            acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
    }, {});

    return (
        <div className="flex flex-col items-start min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-center w-full">Các câu hỏi thường gặp</h1>
            <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mx-auto">
                {/* <h2 className="text-xl font-semibold mb-4">Danh Sách Câu Hỏi</h2> */}
                
                {Object.keys(groupedQuestions).map((category) => (
                    <div key={category} className="mb-6">
                        <h3 className="text-lg font-bold mb-2 bg-gray-100 p-2 rounded">{category}</h3>
                        <ul className="list-none p-0">
                            {groupedQuestions[category].map((q) => (
                                <li 
                                    key={q.id} 
                                    className="border-b border-gray-300 py-2 cursor-pointer"
                                    onClick={() => handleQuestionClick(q)}
                                >
                                    <h4 className="text-md font-semibold">{q.question}</h4>
                                    {showAnswer && selectedQuestion === q && (
                                        <p className="mt-2 text-gray-700">{q.answer}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
