import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import LoginForm from "./pages/login";
import RegistrationForm from "./pages/Register";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <main className="flex-grow">
      <HeroSection />
      {/* Các thành phần khác của trang chủ */}
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dang-nhap" element={<LoginForm />} />
          <Route path="/dang-ky" element={<RegistrationForm />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
