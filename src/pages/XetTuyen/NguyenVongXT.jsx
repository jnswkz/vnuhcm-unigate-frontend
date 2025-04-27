import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';

// Danh sách trường học từ nganh_dtdh.csv
const schoolsData = [
  { value: '', label: 'Chọn trường' },
  { value: 'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP.HCM', label: 'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP.HCM' },
  { value: 'Trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM', label: 'Trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM' },
  { value: 'Trường Đại học Quốc tế, ĐHQG TP.HCM', label: 'Trường Đại học Quốc tế, ĐHQG TP.HCM' },
  { value: 'Trường Đại học Kinh tế - Luật, ĐHQG TP.HCM', label: 'Trường Đại học Kinh tế - Luật, ĐHQG TP.HCM' },
  { value: 'Trường Đại học Công nghệ Thông tin, ĐHQG TP.HCM', label: 'Trường Đại học Công nghệ Thông tin, ĐHQG TP.HCM' },
  { value: 'Trường Đại học Khoa học Sức khỏe, ĐHQG TP.HCM', label: 'Trường Đại học Khoa học Sức khỏe, ĐHQG TP.HCM' },
  { value: 'Trường Đại học An Giang, ĐHQG TP.HCM', label: 'Trường Đại học An Giang, ĐHQG TP.HCM' },
  { value: 'Phân hiệu ĐHQG-HCM tại tỉnh Bến Tre', label: 'Phân hiệu ĐHQG-HCM tại tỉnh Bến Tre' },
];

// Ánh xạ trường học với ngành học từ nganh_dtdh.csv
const schoolMajorsMapping = {
  'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP.HCM': [
    { value: 'Quản lý Giáo dục', label: 'Quản lý Giáo dục', majorCode: 'QSX7140114' },
    { value: 'Nghệ thuật học', label: 'Nghệ thuật học', majorCode: 'QSX7210213' },
    { value: 'Ngôn ngữ Anh', label: 'Ngôn ngữ Anh', majorCode: 'QSX7220201' },
    { value: 'Ngôn ngữ Anh (Chuẩn QT)', label: 'Ngôn ngữ Anh (Chuẩn QT)', majorCode: 'QSX7220201_CLC' },
    { value: 'Ngôn ngữ Nga', label: 'Ngôn ngữ Nga', majorCode: 'QSX7220202' },
    { value: 'Ngôn ngữ Pháp', label: 'Ngôn ngữ Pháp', majorCode: 'QSX7220203' },
    { value: 'Ngôn ngữ Trung Quốc', label: 'Ngôn ngữ Trung Quốc', majorCode: 'QSX7220204' },
    { value: 'NN Trung Quốc (Chuẩn QT)', label: 'NN Trung Quốc (Chuẩn QT)', majorCode: 'QSX7220204_CLC' },
    { value: 'Ngôn ngữ Đức', label: 'Ngôn ngữ Đức', majorCode: 'QSX7220205' },
    { value: 'Ngôn ngữ Đức (Chuẩn QT)', label: 'Ngôn ngữ Đức (Chuẩn QT)', majorCode: 'QSX7220205_CLC' },
    { value: 'Ngôn ngữ Tây Ban Nha', label: 'Ngôn ngữ Tây Ban Nha', majorCode: 'QSX7220206' },
    { value: 'Ngôn ngữ Italia', label: 'Ngôn ngữ Italia', majorCode: 'QSX7220208' },
    { value: 'Triết học', label: 'Triết học', majorCode: 'QSX7229001' },
    { value: 'Tôn giáo học', label: 'Tôn giáo học', majorCode: 'QSX7229009' },
    { value: 'Lịch sử', label: 'Lịch sử', majorCode: 'QSX7229010' },
    { value: 'Ngôn ngữ học', label: 'Ngôn ngữ học', majorCode: 'QSX7229020' },
    { value: 'Văn học', label: 'Văn học', majorCode: 'QSX7229030' },
    { value: 'Văn hóa học', label: 'Văn hóa học', majorCode: 'QSX7229040' },
    { value: 'Quan hệ Quốc tế', label: 'Quan hệ Quốc tế', majorCode: 'QSX7310206' },
    { value: 'Quan hệ Quốc tế (Chuẩn QT)', label: 'Quan hệ Quốc tế (Chuẩn QT)', majorCode: 'QSX7310206_CLC' },
    { value: 'Xã hội học', label: 'Xã hội học', majorCode: 'QSX7310301' },
    { value: 'Nhân học', label: 'Nhân học', majorCode: 'QSX7310302' },
    { value: 'Tâm lý học', label: 'Tâm lý học', majorCode: 'QSX7310401' },
    { value: 'Tâm lý học Giáo dục', label: 'Tâm lý học Giáo dục', majorCode: 'QSX7310403' },
    { value: 'Địa lý học', label: 'Địa lý học', majorCode: 'QSX7310501' },
    { value: 'Quốc tế học', label: 'Quốc tế học', majorCode: 'QSX7310601' },
    { value: 'Đông phương học', label: 'Đông phương học', majorCode: 'QSX7310608' },
    { value: 'Nhật Bản học', label: 'Nhật Bản học', majorCode: 'QSX7310613' },
    { value: 'Nhật Bản học (Chuẩn QT)', label: 'Nhật Bản học (Chuẩn QT)', majorCode: 'QSX7310613_CLC' },
    { value: 'Hàn Quốc học', label: 'Hàn Quốc học', majorCode: 'QSX7310614' },
    { value: 'Việt Nam học', label: 'Việt Nam học', majorCode: 'QSX7310630' },
    { value: 'Kinh doanh thương mại Hàn Quốc', label: 'Kinh doanh thương mại Hàn Quốc', majorCode: 'QSX73106a1' },
    { value: 'Báo chí', label: 'Báo chí', majorCode: 'QSX7320101' },
    { value: 'Báo chí (tăng cường Tiếng Anh)', label: 'Báo chí (tăng cường Tiếng Anh)', majorCode: 'QSX7320101_CLC' },
    { value: 'Truyền thông Đa phương tiện', label: 'Truyền thông Đa phương tiện', majorCode: 'QSX7320104' },
    { value: 'Thông tin - Thư viện', label: 'Thông tin - Thư viện', majorCode: 'QSX7320201' },
    { value: 'Quản lý Thông tin', label: 'Quản lý Thông tin', majorCode: 'QSX7320205' },
    { value: 'Lưu trữ học', label: 'Lưu trữ học', majorCode: 'QSX7320303' },
    { value: 'Quản trị Văn phòng', label: 'Quản trị Văn phòng', majorCode: 'QSX7340406' },
    { value: 'Đô thị học', label: 'Đô thị học', majorCode: 'QSX7580112' },
    { value: 'Công tác Xã hội', label: 'Công tác Xã hội', majorCode: 'QSX7760101' },
    { value: 'QT DV DL&LH', label: 'QT DV DL&LH', majorCode: 'QSX7810103' },
    { value: 'QT DV DL&LH (CQT)', label: 'QT DV DL&LH (CQT)', majorCode: 'QSX7810103_CLC' },
    { value: 'Giáo dục học', label: 'Giáo dục học', majorCode: 'QSX7140101' },
  ],
  'Trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM': [
    { value: 'Sinh học', label: 'Sinh học', majorCode: 'QST7420101' },
    { value: 'Sinh học (CTTCTA)', label: 'Sinh học (CTTCTA)', majorCode: 'QST7420101_DKD' },
    { value: 'Công nghệ Sinh học', label: 'Công nghệ Sinh học', majorCode: 'QST7420201' },
    { value: 'Công nghệ Sinh học (CTTCTA)', label: 'Công nghệ Sinh học (CTTCTA)', majorCode: 'QST7420201_DKD' },
    { value: 'Vật lý học (CTTCTA)', label: 'Vật lý học (CTTCTA)', majorCode: 'QST7440102_DKD' },
    { value: 'VL học, CNVLĐT&TH, CN bán dẫn', label: 'VL học, CNVLĐT&TH, CN bán dẫn', majorCode: 'QST7440102_NN' },
    { value: 'Hoá học', label: 'Hoá học', majorCode: 'QST7440112' },
    { value: 'Hóa học (CTTCTA)', label: 'Hóa học (CTTCTA)', majorCode: 'QST7440112_DKD' },
    { value: 'Khoa học Vật liệu', label: 'Khoa học Vật liệu', majorCode: 'QST7440122' },
    { value: 'Khoa học Vật liệu (CTTCTA)', label: 'Khoa học Vật liệu (CTTCTA)', majorCode: 'QST7440122_DKD' },
    { value: 'Địa chất học, KHQL & kinh tế đất đai', label: 'Địa chất học, KHQL & kinh tế đất đai', majorCode: 'QST7440201_NN' },
    { value: 'Hải dương học', label: 'Hải dương học', majorCode: 'QST7440228' },
    { value: 'Khoa học Môi trường', label: 'Khoa học Môi trường', majorCode: 'QST7440301' },
    { value: 'Khoa học Môi trường (CTTCTA)', label: 'Khoa học Môi trường (CTTCTA)', majorCode: 'QST7440301_DKD' },
    { value: 'Toán học, Toán Tin, Toán Ứng dụng', label: 'Toán học, Toán Tin, Toán Ứng dụng', majorCode: 'QST7460101_NN' },
    { value: 'Khoa học Dữ liệu', label: 'Khoa học Dữ liệu', majorCode: 'QST7460108' },
    { value: 'Khoa học Máy tính (CT Tiên tiến)', label: 'Khoa học Máy tính (CT Tiên tiến)', majorCode: 'QST7480101_TT' },
    { value: 'Trí tuệ Nhân tạo', label: 'Trí tuệ Nhân tạo', majorCode: 'QST7480107' },
    { value: 'Công nghệ Thông tin (CTTCTA)', label: 'Công nghệ Thông tin (CTTCTA)', majorCode: 'QST7480201_DKD' },
    { value: 'Nhóm ngành Máy tính và CNTT', label: 'Nhóm ngành Máy tính và CNTT', majorCode: 'QST7480201_NN' },
    { value: 'Công nghệ KT Hoá học (CTTCTA)', label: 'Công nghệ KT Hoá học (CTTCTA)', majorCode: 'QST7510401_DKD' },
    { value: 'Công nghệ Vật liệu', label: 'Công nghệ Vật liệu', majorCode: 'QST7510402' },
    { value: 'Công nghệ Kỹ thuật Môi trường', label: 'Công nghệ Kỹ thuật Môi trường', majorCode: 'QST7510406' },
    { value: 'KT Điện tử - Viễn thông (CTTCTA)', label: 'KT Điện tử - Viễn thông (CTTCTA)', majorCode: 'QST7520207_DKD' },
    { value: 'Nhóm ngành KT Điện tử - Viễn thông, TK vi mạch', label: 'Nhóm ngành KT Điện tử - Viễn thông, TK vi mạch', majorCode: 'QST7520207_NN' },
    { value: 'Kỹ thuật Hạt nhân', label: 'Kỹ thuật Hạt nhân', majorCode: 'QST7520402' },
    { value: 'Vật lý Y khoa', label: 'Vật lý Y khoa', majorCode: 'QST7520403' },
    { value: 'Kỹ thuật Địa chất', label: 'Kỹ thuật Địa chất', majorCode: 'QST7520501' },
    { value: 'Quản lý Tài nguyên và Môi trường', label: 'Quản lý Tài nguyên và Môi trường', majorCode: 'QST7850101' },
  ],
  'Trường Đại học Quốc tế, ĐHQG TP.HCM': [
    { value: 'Ngôn ngữ Anh', label: 'Ngôn ngữ Anh', majorCode: 'QSQ7220201' },
    { value: 'NNA (2+2) (ĐH West of England)', label: 'NNA (2+2) (ĐH West of England)', majorCode: 'QSQ7220201_WE2' },
    { value: 'NNA (3+1) (ĐH West of England)', label: 'NNA (3+1) (ĐH West of England)', majorCode: 'QSQ7220201_WE3' },
    { value: 'NNA (4+0) (ĐH West of England)', label: 'NNA (4+0) (ĐH West of England)', majorCode: 'QSQ7220201_WE4' },
    { value: 'Kinh tế (Phân tích Dữ liệu trong KT)', label: 'Kinh tế (Phân tích Dữ liệu trong KT)', majorCode: 'QSQ7310101' },
    { value: 'Quản trị Kinh doanh', label: 'Quản trị Kinh doanh', majorCode: 'QSQ7340101' },
    { value: 'QTKD (4+0) (ĐH Andrews)', label: 'QTKD (4+0) (ĐH Andrews)', majorCode: 'QSQ7340101_AND' },
    { value: 'QTKD (1+2/1.5+1.5) (ĐH Auckland)', label: 'QTKD (1+2/1.5+1.5) (ĐH Auckland)', majorCode: 'QSQ7340101_AU' },
    { value: 'QTKD (2+2) (ĐH Lakehead)', label: 'QTKD (2+2) (ĐH Lakehead)', majorCode: 'QSQ7340101_LU' },
    { value: 'QTKD (2+2) (ĐH New South Wales)', label: 'QTKD (2+2) (ĐH New South Wales)', majorCode: 'QSQ7340101_NS' },
    { value: 'QTKD (2+2) (ĐH Sydney)', label: 'QTKD (2+2) (ĐH Sydney)', majorCode: 'QSQ7340101_SY' },
    { value: 'QTKD (2+2) (ĐH Houston)', label: 'QTKD (2+2) (ĐH Houston)', majorCode: 'QSQ7340101_UH' },
    { value: 'QTKD (2+2) (ĐH West of England)', label: 'QTKD (2+2) (ĐH West of England)', majorCode: 'QSQ7340101_WE' },
    { value: 'QTKD (4+0) (ĐH West of England)', label: 'QTKD (4+0) (ĐH West of England)', majorCode: 'QSQ7340101_WE4' },
    { value: 'Marketing', label: 'Marketing', majorCode: 'QSQ7340115' },
    { value: 'Tài chính - Ngân hàng', label: 'Tài chính - Ngân hàng', majorCode: 'QSQ7340201' },
    { value: 'Kế toán', label: 'Kế toán', majorCode: 'QSQ7340301' },
    { value: 'Công nghệ Sinh học', label: 'Công nghệ Sinh học', majorCode: 'QSQ7420201' },
    { value: 'CNSH (2+2) (ĐH West of England)', label: 'CNSH (2+2) (ĐH West of England)', majorCode: 'QSQ7420201_WE2' },
    { value: 'CNSH (4+0) (ĐH West of England)', label: 'CNSH (4+0) (ĐH West of England)', majorCode: 'QSQ7420201_WE4' },
    { value: 'Hóa học (Hóa sinh)', label: 'Hóa học (Hóa sinh)', majorCode: 'QSQ7440112' },
    { value: 'Khoa học Dữ liệu', label: 'Khoa học Dữ liệu', majorCode: 'QSQ7460108' },
    { value: 'Toán ỨD (KT tài chính và QT rủi ro)', label: 'Toán ỨD (KT tài chính và QT rủi ro)', majorCode: 'QSQ7460112' },
    { value: 'Thống kê (Thống kê Ứng dụng)', label: 'Thống kê (Thống kê Ứng dụng)', majorCode: 'QSQ7460201' },
    { value: 'Khoa học Máy tính', label: 'Khoa học Máy tính', majorCode: 'QSQ7480101' },
    { value: 'KHMT (2+2) (ĐH West of England)', label: 'KHMT (2+2) (ĐH West of England)', majorCode: 'QSQ7480101_WE2' },
    { value: 'Công nghệ Thông tin', label: 'Công nghệ Thông tin', majorCode: 'QSQ7480201' },
    { value: 'CNTT (2+2) (ĐH SUNY Binghamton)', label: 'CNTT (2+2) (ĐH SUNY Binghamton)', majorCode: 'QSQ7480201_SB' },
    { value: 'CNTT (4+0) (ĐH West of England)', label: 'CNTT (4+0) (ĐH West of England)', majorCode: 'QSQ7480201_WE4' },
    { value: 'Logistics và QL Chuỗi cung ứng', label: 'Logistics và QL Chuỗi cung ứng', majorCode: 'QSQ7510605' },
    { value: 'Kỹ thuật Hệ thống Công nghiệp', label: 'Kỹ thuật Hệ thống Công nghiệp', majorCode: 'QSQ7520118' },
    { value: 'KT.HTCN (2+2) (SUNY Binghamton)', label: 'KT.HTCN (2+2) (SUNY Binghamton)', majorCode: 'QSQ7520118_SB' },
    { value: 'Kỹ thuật Không gian', label: 'Kỹ thuật Không gian', majorCode: 'QSQ7520121' },
    { value: 'Kỹ thuật Điện tử - Viễn thông', label: 'Kỹ thuật Điện tử - Viễn thông', majorCode: 'QSQ7520207' },
    { value: 'KTĐT (2+2) (ĐH SUNY Binghamton)', label: 'KTĐT (2+2) (ĐH SUNY Binghamton)', majorCode: 'QSQ7520207_SB' },
    { value: 'KTĐT-VT (2+2) (ĐH West of England)', label: 'KTĐT-VT (2+2) (ĐH West of England)', majorCode: 'QSQ7520207_WE' },
    { value: 'Kỹ thuật Y sinh', label: 'Kỹ thuật Y sinh', majorCode: 'QSQ7520212' },
    { value: 'Kỹ thuật Điều khiển và Tự động hóa', label: 'Kỹ thuật Điều khiển và Tự động hóa', majorCode: 'QSQ7520216' },
    { value: 'Kỹ thuật Hóa học', label: 'Kỹ thuật Hóa học', majorCode: 'QSQ7520301' },
    { value: 'Công nghệ Thực phẩm', label: 'Công nghệ Thực phẩm', majorCode: 'QSQ7540101' },
    { value: 'Kỹ thuật Xây dựng', label: 'Kỹ thuật Xây dựng', majorCode: 'QSQ7580201' },
    { value: 'KTXD (2+2) (ĐH Deakin)', label: 'KTXD (2+2) (ĐH Deakin)', majorCode: 'QSQ7580201_DK' },
    { value: 'Quản lý Xây dựng', label: 'Quản lý Xây dựng', majorCode: 'QSQ7580302' },
  ],
  'Trường Đại học Kinh tế - Luật, ĐHQG TP.HCM': [
    { value: 'Kinh tế (Kinh tế học)', label: 'Kinh tế (Kinh tế học)', majorCode: 'QSK7310101_401' },
    { value: 'Kinh tế (Kinh tế và Quản lý Công)', label: 'Kinh tế (Kinh tế và Quản lý Công)', majorCode: 'QSK7310101_403' },
    { value: 'Kinh tế Quốc tế (Kinh tế Đối ngoại)', label: 'Kinh tế Quốc tế (Kinh tế Đối ngoại)', majorCode: 'QSK7310101_402' },
    { value: 'Toán KT (Toán ỨD KT, QT&TC)', label: 'Toán KT (Toán ỨD KT, QT&TC)', majorCode: 'QSK7310101_413' },
    { value: 'Toán KT (Toán ỨD KT, QT&TC) (T.Anh)', label: 'Toán KT (Toán ỨD KT, QT&TC) (T.Anh)', majorCode: 'QSK7310101_413E' },
    { value: 'Toán KT (Phân tích dữ liệu)', label: 'Toán KT (Phân tích dữ liệu)', majorCode: 'QSK7310101_419' },
    { value: 'Quản trị Kinh doanh', label: 'Quản trị Kinh doanh', majorCode: 'QSK7310101_407' },
    { value: 'Quản trị Kinh doanh (T.Anh)', label: 'Quản trị Kinh doanh (T.Anh)', majorCode: 'QSK7310101_407E' },
    { value: 'QTKD (Quản trị du lịch và lữ hành)', label: 'QTKD (Quản trị du lịch và lữ hành)', majorCode: 'QSK7310101_415' },
    { value: 'Marketing', label: 'Marketing', majorCode: 'QSK7310101_410' },
    { value: 'Marketing (T.Anh)', label: 'Marketing (T.Anh)', majorCode: 'QSK7310101_410E' },
    { value: 'Marketing (Digital Marketing)', label: 'Marketing (Digital Marketing)', majorCode: 'QSK7310101_417' },
    { value: 'Kinh doanh Quốc tế', label: 'Kinh doanh Quốc tế', majorCode: 'QSK7310101_408' },
    { value: 'Kinh doanh Quốc tế (T.Anh)', label: 'Kinh doanh Quốc tế (T.Anh)', majorCode: 'QSK7310101_408E' },
    { value: 'Thương mại Điện tử', label: 'Thương mại Điện tử', majorCode: 'QSK7310101_411' },
    { value: 'Thương mại Điện tử (T.Anh)', label: 'Thương mại Điện tử (T.Anh)', majorCode: 'QSK7310101_411E' },
    { value: 'Tài chính - Ngân hàng', label: 'Tài chính - Ngân hàng', majorCode: 'QSK7310101_404' },
    { value: 'Tài chính – Ngân hàng (T.Anh)', label: 'Tài chính – Ngân hàng (T.Anh)', majorCode: 'QSK7310101_404E' },
    { value: 'Công nghệ Tài chính', label: 'Công nghệ Tài chính', majorCode: 'QSK7310101_414' },
    { value: 'CN Tài chính (CT hợp tác doanh nghiệp)', label: 'CN Tài chính (CT hợp tác doanh nghiệp)', majorCode: 'QSK7310101_414H' },
    { value: 'Kế toán', label: 'Kế toán', majorCode: 'QSK7310101_405' },
    { value: 'Kế toán (T.Anh) (c/c ICAEW)', label: 'Kế toán (T.Anh) (c/c ICAEW)', majorCode: 'QSK7310101_405E' },
    { value: 'Kiểm toán', label: 'Kiểm toán', majorCode: 'QSK7310101_409' },
    { value: 'Quản lý Công', label: 'Quản lý Công', majorCode: 'QSK7310101_418' },
    { value: 'Hệ thống Thông tin Quản lý', label: 'Hệ thống Thông tin Quản lý', majorCode: 'QSK7310101_406' },
    { value: 'HTTT Quản lý (CT hợp tác doanh nghiệp)', label: 'HTTT Quản lý (CT hợp tác doanh nghiệp)', majorCode: 'QSK7310101_406H' },
    { value: 'HTTT Quản lý (KD số & Trí tuệ NT)', label: 'HTTT Quản lý (KD số & Trí tuệ NT)', majorCode: 'QSK7310101_416' },
    { value: 'Luật (Luật Dân sự)', label: 'Luật (Luật Dân sự)', majorCode: 'QSK7310101_503' },
    { value: 'Luật (Luật Tài chính - Ngân hàng)', label: 'Luật (Luật Tài chính - Ngân hàng)', majorCode: 'QSK7310101_504' },
    { value: 'Luật (Luật và Chính sách công)', label: 'Luật (Luật và Chính sách công)', majorCode: 'QSK7310101_505' },
    { value: 'Luật Kinh tế (Luật Kinh doanh)', label: 'Luật Kinh tế (Luật Kinh doanh)', majorCode: 'QSK7310101_501' },
    { value: 'Luật KT (Luật Thương mại Quốc tế)', label: 'Luật KT (Luật Thương mại Quốc tế)', majorCode: 'QSK7310101_502' },
    { value: 'Luật KT (Luật Thương mại QT) (T.Anh)', label: 'Luật KT (Luật Thương mại QT) (T.Anh)', majorCode: 'QSK7310101_502E' },
  ],
  'Trường Đại học Công nghệ Thông tin, ĐHQG TP.HCM': [
    { value: 'Thương mại Điện tử', label: 'Thương mại Điện tử', majorCode: 'QSC7340122' },
    { value: 'Khoa học Dữ liệu', label: 'Khoa học Dữ liệu', majorCode: 'QSC7460108' },
    { value: 'Khoa học Máy tính', label: 'Khoa học Máy tính', majorCode: 'QSC7480101' },
    { value: 'Mạng Máy tính và TT Dữ liệu', label: 'Mạng Máy tính và TT Dữ liệu', majorCode: 'QSC7480102' },
    { value: 'Kỹ thuật Phần mềm', label: 'Kỹ thuật Phần mềm', majorCode: 'QSC7480103' },
    { value: 'Hệ thống Thông tin', label: 'Hệ thống Thông tin', majorCode: 'QSC7480104' },
    { value: 'Hệ thống Thông tin (Tiên tiến)', label: 'Hệ thống Thông tin (Tiên tiến)', majorCode: 'QSC7480104_TT' },
    { value: 'Kỹ thuật Máy tính', label: 'Kỹ thuật Máy tính', majorCode: 'QSC7480106' },
    { value: 'Trí tuệ Nhân tạo', label: 'Trí tuệ Nhân tạo', majorCode: 'QSC7480107' },
    { value: 'Công nghệ Thông tin', label: 'Công nghệ Thông tin', majorCode: 'QSC7480201' },
    { value: 'Công nghệ Thông tin (Việt - Nhật)', label: 'Công nghệ Thông tin (Việt - Nhật)', majorCode: 'QSC7480201_N' },
    { value: 'An toàn Thông tin', label: 'An toàn Thông tin', majorCode: 'QSC7480202' },
    { value: 'Thiết kế vi mạch', label: 'Thiết kế vi mạch', majorCode: 'QSC75202a1' },
  ],
  'Trường Đại học Khoa học Sức khỏe, ĐHQG TP.HCM': [
    { value: 'Y khoa', label: 'Y khoa', majorCode: 'QSY7720101' },
    { value: 'Y học Cổ truyền', label: 'Y học Cổ truyền', majorCode: 'QSY7720115' },
    { value: 'Dược học', label: 'Dược học', majorCode: 'QSY7720201' },
    { value: 'Điều dưỡng', label: 'Điều dưỡng', majorCode: 'QSY7720301' },
    { value: 'Răng - Hàm - Mặt', label: 'Răng - Hàm - Mặt', majorCode: 'QSY7720501' },
  ],
  'Trường Đại học An Giang, ĐHQG TP.HCM': [
    { value: 'Giáo dục Mầm non', label: 'Giáo dục Mầm non', majorCode: 'QSA7140201' },
    { value: 'Giáo dục Tiểu học', label: 'Giáo dục Tiểu học', majorCode: 'QSA7140202' },
    { value: 'Giáo dục Chính trị', label: 'Giáo dục Chính trị', majorCode: 'QSA7140205' },
    { value: 'Sư phạm Toán học', label: 'Sư phạm Toán học', majorCode: 'QSA7140209' },
    { value: 'Sư phạm Vật lý', label: 'Sư phạm Vật lý', majorCode: 'QSA7140211' },
    { value: 'Sư phạm Hóa học', label: 'Sư phạm Hóa học', majorCode: 'QSA7140212' },
    { value: 'Sư phạm Sinh học', label: 'Sư phạm Sinh học', majorCode: 'QSA7140213' },
    { value: 'Sư phạm Ngữ văn', label: 'Sư phạm Ngữ văn', majorCode: 'QSA7140217' },
    { value: 'Sư phạm Lịch sử', label: 'Sư phạm Lịch sử', majorCode: 'QSA7140218' },
    { value: 'Sư phạm Địa lý', label: 'Sư phạm Địa lý', majorCode: 'QSA7140219' },
    { value: 'Sư phạm Tiếng Anh', label: 'Sư phạm Tiếng Anh', majorCode: 'QSA7140231' },
    { value: 'Ngôn ngữ Anh', label: 'Ngôn ngữ Anh', majorCode: 'QSA7220201' },
    { value: 'Triết học', label: 'Triết học', majorCode: 'QSA7229001' },
    { value: 'Văn học', label: 'Văn học', majorCode: 'QSA7229030' },
    { value: 'Kinh tế Quốc tế', label: 'Kinh tế Quốc tế', majorCode: 'QSA7310106' },
    { value: 'Việt Nam học', label: 'Việt Nam học', majorCode: 'QSA7310630' },
    { value: 'Quản trị Kinh doanh', label: 'Quản trị Kinh doanh', majorCode: 'QSA7340101' },
    { value: 'Marketing', label: 'Marketing', majorCode: 'QSA7340115' },
    { value: 'Tài chính - Ngân hàng', label: 'Tài chính - Ngân hàng', majorCode: 'QSA7340201' },
    { value: 'Kế toán', label: 'Kế toán', majorCode: 'QSA7340301' },
    { value: 'Luật', label: 'Luật', majorCode: 'QSA7380101' },
    { value: 'Công nghệ Sinh học', label: 'Công nghệ Sinh học', majorCode: 'QSA7420201' },
    { value: 'Kỹ thuật Phần mềm', label: 'Kỹ thuật Phần mềm', majorCode: 'QSA7480103' },
    { value: 'Công nghệ Thông tin', label: 'Công nghệ Thông tin', majorCode: 'QSA7480201' },
    { value: 'Công nghệ Kỹ thuật Hóa học', label: 'Công nghệ Kỹ thuật Hóa học', majorCode: 'QSA7510401' },
    { value: 'Công nghệ Kỹ thuật Môi trường', label: 'Công nghệ Kỹ thuật Môi trường', majorCode: 'QSA7510406' },
    { value: 'Công nghệ Thực phẩm', label: 'Công nghệ Thực phẩm', majorCode: 'QSA7540101' },
    { value: 'ĐBCL và An toàn thực phẩm', label: 'ĐBCL và An toàn thực phẩm', majorCode: 'QSA7540106' },
    { value: 'Chăn nuôi', label: 'Chăn nuôi', majorCode: 'QSA7620105' },
    { value: 'Khoa học Cây trồng', label: 'Khoa học Cây trồng', majorCode: 'QSA7620110' },
    { value: 'Phát triển Nông thôn', label: 'Phát triển Nông thôn', majorCode: 'QSA76201116' },
    { value: 'Bảo vệ Thực vật', label: 'Bảo vệ Thực vật', majorCode: 'QSA7620112' },
    { value: 'Nuôi trồng Thủy sản', label: 'Nuôi trồng Thủy sản', majorCode: 'QSA7620301' },
    { value: 'Thú y', label: 'Thú y', majorCode: 'QSA7640101' },
    { value: 'Quản lý Tài nguyên và Môi trường', label: 'Quản lý Tài nguyên và Môi trường', majorCode: 'QSA7850101' },
  ],
  'Phân hiệu ĐHQG-HCM tại tỉnh Bến Tre': [
    { value: 'Kỹ thuật Xây dựng', label: 'Kỹ thuật Xây dựng', majorCode: 'QSP7580201' },
  ],
};

// Component con để xử lý từng hàng trong bảng
const SortableRow = ({ wish, handleEdit, handleDelete, isExpired }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: wish.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-b border-gray-200 hover:bg-gray-50"
    >
      <td className="py-5 px-4">{wish.priority}</td>
      <td className="py-5 px-4">{wish.applicationCode}</td>
      <td className="py-5 px-4">{wish.school}</td>
      <td className="py-5 px-4">{wish.major}</td>
      <td className="py-5 px-4">{wish.majorCode}</td>
      <td className="py-5 px-4 flex space-x-2">
        <button
          onClick={() => handleEdit(wish)}
          className="text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          title="Sửa"
          disabled={isExpired}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(wish.id)}
          className="text-red-600 hover:text-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          title="Xóa"
          disabled={isExpired}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default function AdmissionWishes() {
  const [wishList, setWishList] = useState([
    {
      id: '1',
      priority: 1,
      applicationCode: 'XT2024-1234',
      school: 'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP.HCM',
      major: 'Ngôn ngữ Anh',
      majorCode: 'QSX7220201',
    },
    {
      id: '2',
      priority: 2,
      applicationCode: 'XT2024-1234',
      school: 'Trường Đại học Công nghệ Thông tin, ĐHQG TP.HCM',
      major: 'Kỹ thuật Phần mềm',
      majorCode: 'QSC7480103',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newWish, setNewWish] = useState({
    school: '',
    major: '',
    majorCode: '',
  });
  const [editingWish, setEditingWish] = useState(null);
  const [deleteWishId, setDeleteWishId] = useState(null);
  const [availableMajors, setAvailableMajors] = useState([{ value: '', label: 'Chọn ngành' }]);

  const deadline = new Date('2025-07-15T17:00:00');
  const currentDate = new Date();
  const isExpired = currentDate > deadline;

  // Cập nhật danh sách ngành học khi trường được chọn
  const handleSchoolChange = (e) => {
    const selectedSchool = e.target.value;
    setNewWish((prev) => ({ ...prev, school: selectedSchool, major: '', majorCode: '' }));
    
    const majors = schoolMajorsMapping[selectedSchool] || [{ value: '', label: 'Chọn ngành' }];
    setAvailableMajors(majors);
  };

  // Cập nhật ngành và mã ngành khi ngành được chọn
  const handleMajorChange = (e) => {
    const selectedMajor = e.target.value;
    const selectedMajorData = availableMajors.find((major) => major.value === selectedMajor);
    setNewWish((prev) => ({
      ...prev,
      major: selectedMajor,
      majorCode: selectedMajorData ? selectedMajorData.majorCode : '',
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWishList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        return newItems.map((item, index) => ({
          ...item,
          priority: index + 1,
        }));
      });
    }
  };

  const handleAddWish = () => {
    setEditingWish(null);
    setNewWish({ school: '', major: '', majorCode: '' });
    setAvailableMajors([{ value: '', label: 'Chọn ngành' }]);
    setIsModalOpen(true);
  };

  const handleEdit = (wish) => {
    setEditingWish(wish);
    setNewWish({
      school: wish.school,
      major: wish.major,
      majorCode: wish.majorCode,
    });
    const majors = schoolMajorsMapping[wish.school] || [{ value: '', label: 'Chọn ngành' }];
    setAvailableMajors(majors);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteWishId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWish(null);
    setNewWish({ school: '', major: '', majorCode: '' });
    setAvailableMajors([{ value: '', label: 'Chọn ngành' }]);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteWishId(null);
  };

  const handleSaveWish = () => {
    if (!newWish.school || !newWish.major || !newWish.majorCode) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (editingWish) {
      setWishList((prev) =>
        prev.map((wish) =>
          wish.id === editingWish.id
            ? { ...wish, school: newWish.school, major: newWish.major, majorCode: newWish.majorCode }
            : wish
        )
      );
    } else {
      const newId = (wishList.length + 1).toString();
      const newPriority = wishList.length + 1;
      const newWishData = {
        id: newId,
        priority: newPriority,
        applicationCode: 'XT2024-1234',
        school: newWish.school,
        major: newWish.major,
        majorCode: newWish.majorCode,
      };
      setWishList((prev) => [...prev, newWishData]);
    }

    handleCloseModal();
  };

  const handleConfirmDelete = () => {
    setWishList((prev) => {
      const updatedList = prev.filter((wish) => wish.id !== deleteWishId);
      return updatedList.map((wish, index) => ({
        ...wish,
        priority: index + 1,
      }));
    });
    handleCloseDeleteModal();
  };

  return (
    <div className="bg-white rounded shadow-md">
      {isExpired && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-start">
          <svg
            className="h-6 w-6 text-red-600 mr-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-red-600 font-semibold">
              Đã hết thời gian điều chỉnh nguyện vọng.
            </p>
            <p className="text-red-600">
              thời gian điều chỉnh nguyện vọng đã kết thúc vào 17:00 ngày 15/07/2024
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Danh sách nguyện vọng
        </h2>
        {!isExpired && (
          <button
            onClick={handleAddWish}
            className="bg-[#0056B3] text-white py-2 px-4 rounded font-medium hover:bg-[#004494] transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center"
          >
            <span className="mr-2">+</span> Thêm nguyện vọng
          </button>
        )}
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={isExpired ? () => {} : handleDragEnd}>
        <SortableContext
          items={wishList.map((wish) => wish.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-4 text-left font-medium">Thứ tự ưu tiên</th>
                  <th className="py-4 px-4 text-left font-medium">Mã hồ sơ xét tuyển</th>
                  <th className="py-4 px-4 text-left font-medium">Trường</th>
                  <th className="py-4 px-4 text-left font-medium">Ngành</th>
                  <th className="py-4 px-4 text-left font-medium">Mã ngành</th>
                  <th className="py-4 px-4 text-left font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {wishList.map((wish) => (
                  <SortableRow
                    key={wish.id}
                    wish={wish}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    isExpired={isExpired}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </SortableContext>
      </DndContext>

      {!isExpired && (
        <div className="my-4 flex items-center">
          <span className="w-12 text-center font-bold text-[#0056B3]">+</span>
          <p className="text-[#64748B]">Kéo và thả để sắp xếp thứ tự ưu tiên</p>
        </div>
      )}

      {isExpired && (
        <div className="mt-6 flex items-center justify-start">
          <svg
            className="h-5 w-5 text-[#0056B3] mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-[#0056B3]">
            Mọi thắc mắc về nguyện vọng xét tuyển vui lòng liên hệ hotline: 1900 1508
          </p>
        </div>
      )}

      {/* Modal thêm/chỉnh sửa nguyện vọng */}
      {isModalOpen && !isExpired && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div
            className="bg-white rounded-lg shadow-md p-6 z-50 flex flex-col justify-between"
            style={{ width: '640px', height: '331px' }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingWish ? 'Chỉnh sửa nguyện vọng' : 'Thêm nguyện vọng mới'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Thứ tự ưu tiên
                    </label>
                    <input
                      type="number"
                      value={editingWish ? editingWish.priority : wishList.length + 1}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Ngành
                    </label>
                    <div className="relative">
                      <select
                        name="major"
                        value={newWish.major}
                        onChange={handleMajorChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {availableMajors.map((major) => (
                          <option key={major.value} value={major.value}>
                            {major.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Trường
                    </label>
                    <div className="relative">
                      <select
                        name="school"
                        value={newWish.school}
                        onChange={handleSchoolChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {schoolsData.map((school) => (
                          <option key={school.value} value={school.value}>
                            {school.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Mã ngành
                    </label>
                    <input
                      type="text"
                      name="majorCode"
                      value={newWish.majorCode}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveWish}
                className="py-2 px-4 bg-[#0056B3] text-white rounded font-medium hover:bg-[#004494] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && !isExpired && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDeleteModal}
          ></div>
          <div
            className="bg-white rounded-lg shadow-md p-6 z-50 flex flex-col justify-between"
            style={{ width: '400px', height: '200px' }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Bạn có chắc muốn xóa nguyện vọng?
              </h3>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseDeleteModal}
                className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-2 px-4 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}