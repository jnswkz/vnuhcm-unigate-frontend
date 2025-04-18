import { NavLink } from 'react-router-dom';
import Tabs from '../../components/Tabs';
export default function LichThi() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Tabs />

      {/* Nội dung chính */}
      <div className="max-w-[1224px] mx-auto mt-8">
        <h1 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px]">
          Lịch thi ĐGNL 2024
        </h1>

        {/* Khối nội dung */}
        <div className="mt-12 bg-[#F8FAFC] rounded-lg p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Đợt 1 */}
            <div className="bg-white rounded-lg p-6">
              <div className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
                Đợt 1
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex">
                  <div className="text-base font-bold text-[#333333] font-roboto leading-6 w-40">
                    Thời gian đăng ký:
                  </div>
                  <div className="text-base text-[#333333] font-roboto leading-6">
                    01/12/2023 - 31/12/2023
                  </div>
                </div>
                <div className="flex">
                  <div className="text-base font-bold text-[#333333] font-roboto leading-6 w-40">
                    Ngày thi:
                  </div>
                  <div className="text-base text-[#333333] font-roboto leading-6">
                    20/01/2024 - 21/01/2024
                  </div>
                </div>
                <div className="flex">
                  <div className="text-base font-bold text-[#333333] font-roboto leading-6 w-40">
                    Công bố kết quả:
                  </div>
                  <div className="text-base text-[#333333] font-roboto leading-6">
                    31/01/2024
                  </div>
                </div>
              </div>
            </div>

            {/* Đợt 2 */}
            <div className="bg-white rounded-lg p-6">
              <div className="text-[20px] font-bold text-[#0056B3] font-roboto leading-[30px]">
                Đợt 2
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex">
                  <div className="text-base font-bold text-[#333333] font-roboto leading-6 w-40">
                    Thời gian đăng ký:
                  </div>
                  <div className="text-base text-[#333333] font-roboto leading-6">
                    01/03/2024 - 31/03/2024
                  </div>
                </div>
                <div className="flex">
                  <div className="text-base font-bold text-[#333333] font-roboto leading-6 w-40">
                    Ngày thi:
                  </div>
                  <div className="text-base text-[#333333] font-roboto leading-6">
                    20/04/2024 - 21/04/2024
                  </div>
                </div>
                <div className="flex">
                  <div className="text-base font-bold text-[#333333] font-roboto leading-6 w-40">
                    Công bố kết quả:
                  </div>
                  <div className="text-base text-[#333333] font-roboto leading-6">
                    30/04/2024
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ghi chú */}
          <div className="mt-6 bg-[#E6F0F9] rounded-md p-4">
            <div className="text-sm text-[#0056B3] font-roboto leading-[21px]">
              Lưu ý: Thí sinh cần đăng ký dự thi trực tuyến và nộp lệ phí theo quy định. Mỗi thí sinh được đăng ký tối đa 2 đợt thi trong năm.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}