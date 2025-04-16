import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet, NavLink } from "react-router-dom";
import HeaderCDN from "./components/HeaderCDN";
import HeaderDangNhap from "./components/HeaderDangNhap";
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import LoginForm from "./pages/login";
import RegistrationForm from "./pages/Register";
import Gioithieukythi from "./components/Gioithieukythi";
import CauTrucDeThi from "./components/CauTrucDeThi";
import LichThi from "./components/LichThi";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardTB from "./components/dashboard/DashboardTB";

// ProtectedRoute để bảo vệ các route yêu cầu đăng nhập
function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();
  return isLoggedIn ? children : <Navigate to="/dang-nhap" state={{ from: location }} replace />;
}

function MainLayout({ children, isLoggedIn, user, onLogout }) {
  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? (
        <HeaderDangNhap user={user} onLogout={onLogout} />
      ) : (
        <HeaderCDN />
      )}
      {children}
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <main className="flex-grow">
      <HeroSection />
    </main>
  );
}

function GioiThieuLayout() {
  return (
    <div className="flex flex-col">
      {/* Nội dung con */}
      <Outlet />
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ name: "Nguyen Van A" });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: "Nguyen Van A" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <MainLayout isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dang-nhap" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/dang-ky" element={<RegistrationForm />} />
          <Route
            path="/gioi-thieu"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <GioiThieuLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="ky-thi" replace />} /> {/* Mặc định chuyển đến "Giới thiệu kỳ thi" */}
            <Route path="ky-thi" element={<Gioithieukythi />} />
            <Route path="cau-truc-de-thi" element={<CauTrucDeThi />} />
            <Route path="lich-thi" element={<LichThi />} />
          </Route>
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-dashboard/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DashboardTB />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

