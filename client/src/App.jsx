import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import './App.css';

// Public pages
import Home from './pages/public/Home';
import ProjectDetail from './pages/public/ProjectDetail';

// Admin pages completely removed.

// No ProtectedRoute anymore

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return null;
}

import CustomCursor from './components/ui/CustomCursor';

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* 404 */}
          <Route path="*" element={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 700 }}>404</h1>
              <p style={{ color: 'var(--color-text-muted)' }}>Page not found.</p>
              <a href="/" className="btn btn-primary">Back to Home</a>
            </div>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
