import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import LessonsPage from './pages/LessonsPage.tsx';
import DonatePage from './pages/DonatePage.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-deep text-cream">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
