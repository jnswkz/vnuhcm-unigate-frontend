import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HeaderDangNhap from "./components/HeaderDangNhap";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import NewsPage from "./components/dashboard/NewsPage";
import NewsDetailPage from "./components/dashboard/NewsDetailPage"; 
import LoginForm from "./pages/login";
import RegistrationForm from "./pages/Register";
import Gioithieukythi from "./pages/Gioithieu/Gioithieukythi";
import CauTrucDeThi from "./pages/Gioithieu/CauTrucDeThi";
import LichThi from "./pages/Gioithieu/Lichthi";
import ChangePasswordPage from './components/dashboard/ChangePasswordPage'; 
import ProfilePage from './pages/ProfilePage'; 
import Batdau from './pages/ThiDGNL/Batdau'; 
import Dangkyduthi from './pages/ThiDGNL/Dangkyduthi'; 
import Saukhixacnhan from './pages/ThiDGNL/Saukhixacnhan'; 
import Thanhtoanthanhcong from './pages/ThiDGNL/Thanhtoanthanhcong'; 
import Contact from './pages/ContactPages/Contact';
import Admission from "./pages/XetTuyen/XetTuyen";
import ThongTinXetTuyen from "./pages/XetTuyen/ThongTinXetTuyen";
import NguyenVongXT from "./pages/XetTuyen/NguyenVongXT";
import KetQuaXT from "./pages/XetTuyen/KetQuaXT";
import MockTest from './pages/Thithu/Baithithu';
import ExamSchedulePage from './pages/ThiDGNL/Batdau';
import AdminLayout from './layouts/AdminLayout';
import Admin from './pages/Admin/Admin';
import Examinees from './pages/Admin/Examinees';
import ExamResults from './pages/Admin/ExamResults';
import ForumManagement from './pages/Admin/ForumManagement';
import ExamineeDetail from './pages/Admin/ExamineeDetail';
import Documents from './pages/Admin/Documents';
import Recruitment from './pages/Admin/Recruitment';
import AdmissionQuota from './pages/Admin/AdmissionQuota'; // Thêm import
import TaiLieuList from './pages/Tailieuontap/Tailieulist';

function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();
  return isLoggedIn ? children : <Navigate to="/dang-nhap" state={{ from: location }} replace />;
}

function AdminRoute({ children, isLoggedIn, user }) {
  const location = useLocation();
  const isAdmin = isLoggedIn && user?.role === 'admin';
  return isAdmin ? children : <Navigate to="/dang-nhap" state={{ from: location }} replace />;
}

function MainLayout({ children, isLoggedIn, user, onLogout }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderDangNhap user={user} onLogout={onLogout} />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: "Nguyen Van A",
    email: "nguyenvana@student.edu.vn",
    phone: "0912345678",
    role: "admin", // Giả định người dùng là admin
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({
      name: "Nguyen Van A",
      email: "nguyenvana@student.edu.vn",
      phone: "0912345678",
      role: "admin",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    console.log('Đăng xuất');
  };

  return (
    <Router>
      {/* ToastContainer ở cấp cao nhất để quản lý thông báo */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Các route công khai */}
        <Route
          path="/*"
          element={
            <MainLayout isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
                <Route path="/dang-nhap" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/dang-ky" element={<RegistrationForm />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />
                <Route path="/thi-dgnl" element={<Batdau />} />
                <Route path="/dang-ky/:examId" element={<Dangkyduthi />} />
                <Route path="/sau-khi-xac-nhan" element={<Saukhixacnhan />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/payment-success" element={<Thanhtoanthanhcong />} />
                <Route path="/lien-he" element={<Contact />} />
                <Route path="/thi-thu" element={<MockTest />} />
                <Route path="/bat-dau" element={<ExamSchedulePage />} />
                <Route path="/tai-lieu" element={<TaiLieuList />} />

                {/* Xét tuyển */}
                <Route
                  path="/xet-tuyen"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Outlet />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Admission />} />
                  <Route path="thong-tin" element={<ThongTinXetTuyen />} />
                  <Route path="nguyen-vong" element={<NguyenVongXT />} />
                  <Route path="ket-qua" element={<KetQuaXT />} />
                </Route>

                {/* Giới thiệu */}
                <Route
                  path="/gioi-thieu"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <div className="flex flex-col">
                        <Outlet />
                      </div>
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="ky-thi" replace />} />
                  <Route path="ky-thi" element={<Gioithieukythi />} />
                  <Route path="cau-truc-de-thi" element={<CauTrucDeThi />} />
                  <Route path="lich-thi" element={<LichThi />} />
                </Route>

                {/* Dashboard */}
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          }
        />

        {/* Các route Admin */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute isLoggedIn={isLoggedIn} user={user}>
              <AdminLayout>
                <Routes>
                  <Route path="overview" element={<Admin />} />
                  <Route path="examinees" element={<Examinees />} />
                  <Route path="examinees/:id" element={<ExamineeDetail />} />
                  <Route path="exams" element={<ExamResults />} />
                  <Route path="recruitment" element={<Recruitment />} />
                  <Route path="admission-quota" element={<AdmissionQuota />} /> 
                  <Route path="documents" element={<Documents />} />
                  <Route path="forums" element={<ForumManagement />} />
                  <Route path="messages" element={<div>Tin nhắn</div>} />
                  <Route path="schools" element={<div>Quản lý trường</div>} />
                  <Route index element={<Navigate to="overview" replace />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
