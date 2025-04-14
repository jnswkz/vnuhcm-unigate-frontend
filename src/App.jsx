import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";

// Trang 404 đơn giản
const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "4rem" }}>
    <h1>404 - Trang không tồn tại</h1>
    <p>Vui lòng kiểm tra lại đường dẫn.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chính (/) chuyển hướng sang /register */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        {/* Trang đăng ký */}
        <Route path="/register" element={<Register />} />
        
        {/* Trang không tồn tại */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
