import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "./api/axios"; // Import axios instance

// Import các components và pages
import HeaderDangNhap from "./components/HeaderDangNhap";
import HeaderCND from "./components/HeaderCDN";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import NewsPage from "./components/dashboard/NewsPage";
import NewsDetailPage from "./components/dashboard/NewsDetailPage"; 
import HeroSection from "./pages/HeroSection";
import LoginForm from "./pages/login";
import RegistrationForm from "./pages/Register";
import Gioithieukythi from "./pages/Gioithieu/Gioithieukythi";
import CauTrucDeThi from "./pages/Gioithieu/CauTrucDeThi";
import LichThi from "./pages/Gioithieu/Lichthi";
import QuyCheThi from "./pages/Gioithieu/QuyCheThi"; 
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
import AdmissionQuota from './pages/Admin/AdmissionQuota';
import TaiLieuList from './pages/Tailieuontap/Tailieulist'; 
import Forum from './pages/Forum/Forum.jsx'
import CreatePostForm from './pages/Forum/CreatePost.jsx';
import PostDetailPage from './pages/Forum/Post.jsx';
import PostPage from './pages/Forum/postPage.jsx';
import PostDetail  from './pages/Forum/PostDetails.jsx';
import ReplyBox from './pages/Forum/Reply.jsx';
import Chatbot from './components/dashboard/Chatbot';
import { AuthProvider, useAuth } from './components/AuthContext'; 

// import jwt from 'jwt-decode'

// Định nghĩa base URL của API

function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    return <div>Đang kiểm tra đăng nhập...</div>; 
  }

  return isLoggedIn ? children : <Navigate to="/dang-nhap" state={{ from: location }} replace />;
}

function AdminRoute({ children }) {
  const { isLoggedIn, user } = useAuth();  
  const location = useLocation();
  const isAdmin = isLoggedIn && user?.role === 'admin';

  return isAdmin ? children : <Navigate to="/dang-nhap" state={{ from: location }} replace />;
}

function MainLayout({ children, isLoggedIn, user, onLogout }) {
  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? (
        <HeaderDangNhap user={user} onLogout={onLogout} />
      ) : (
        <HeaderCND />
      )}
      {children}
      <Footer />
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();

  const handleDownload = async (doc) => {
    try {
      const response = await api.post(
        "/api/get-document",
        { id: doc.id },
        { responseType: "blob" }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", doc.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Tải file thất bại:", error);
    }
  };

  const handleLogin = async (cccd, password) => {
    try {
      const res = await api.post("/api/login", {
        username: cccd,
        password: password
      }, {
        withCredentials: true
      });
  
      const { access_token } = res.data;
      document.cookie = `access_token=${access_token}; path=/; max-age=3600`;
  
      const userRes = await api.get("/api/me", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const userData = userRes.data;
  
      setUser(userData);
      setIsLoggedIn(true);
  
      toast.success(
        userData.role === 'admin'
          ? "Đăng nhập thành công với quyền admin!"
          : "Đăng nhập thành công!"
      );
  
      if (userData.role === 'admin') {
        navigate("/admin");   
      } else {
        navigate("/");
      }
  
    } catch (err) {
      toast.error(err.response?.data?.detail || "Sai thông tin đăng nhập!");
    }
  };
  

  const handleLogout = async () => {
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };


  return (
    <div>
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
        <Route
          path="/*"
          element={
            <MainLayout isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}>
              <Routes>
                <Route
                  path="/"
                  element={
                    isLoggedIn ? <Dashboard /> : <HeroSection />
                  }
                />
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
                <Route path="/tin-tuc-su-kien" element={<NewsPage />} />
                <Route path="/thong-tin-ky-thi" element={<Navigate to="/gioi-thieu/ky-thi" replace />} />
                <Route path="/dang-ki-xet-tuyen" element={<Navigate to="/xet-tuyen" replace />} />
                <Route path="/dang-ki-thi" element={<Navigate to="/thi-dgnl" replace />} />
                <Route path="/tai-lieu-on-tap" element={<TaiLieuList handleDownload={handleDownload} />} />
                <Route path="/lich-thi" element={<LichThi />} />
                <Route path="/cau-truc-de-thi" element={<CauTrucDeThi />} /> 
                <Route path="/gioi-thieu/quy-che-thi" element={<QuyCheThi />} /> 
                <Route path="/thu-vien-so" element={<Navigate to= "/tai-lieu-on-tap" replace />} /> 
                <Route path="/bai-thi-thu" element={<Navigate to="/" replace/>} /> 
                <Route path="/dang-ky-du-thi" element={<Navigate to="/dang-ky" replace />} />
                <Route path="/tim-hieu-them" element={<Navigate to="/gioi-thieu/ky-thi" replace />} />


                <Route
                  path="/xet-tuyen"
                  element={
                    <ProtectedRoute >
                      <Outlet />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Admission />} />
                  <Route path="thong-tin" element={<ThongTinXetTuyen />} />
                  <Route path="nguyen-vong" element={<NguyenVongXT />} />
                  <Route path="ket-qua" element={<KetQuaXT />} />
                </Route>

                <Route
                  path="/gioi-thieu"
                  element={
                    <ProtectedRoute>
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
                  <Route path="quy-che-thi" element={<QuyCheThi />} /> {/* Thêm route mới */}
                </Route>

                <Route path="/dien-dan" element={
                    <ProtectedRoute>
                      <Outlet />
                    </ProtectedRoute>
                  }>
                  <Route index element={<Forum />} /> 
                  <Route path="create-post" element={<CreatePostForm />} />
                  <Route path="posts_page">
                    <Route path=":title" element={<PostPage />} />
                  </Route>
                  <Route path="post">
                    <Route path=":id" element={<PostDetail />} />
                  </Route>
                </Route>

                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminRoute>
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
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
