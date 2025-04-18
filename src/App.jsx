import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
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


function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();
  return isLoggedIn ? children : <Navigate to="/dang-nhap" state={{ from: location }} replace />;
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
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({
      name: "Nguyen Van A",
      email: "nguyenvana@student.edu.vn",
      phone: "0912345678",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    console.log('Đăng xuất');
  };

  return (
    <Router>
      <MainLayout isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}>
        <Routes>
          {/* Trang chính */}
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
    </Router>
  );
}

