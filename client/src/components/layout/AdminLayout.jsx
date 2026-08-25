import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiUser, FiMap, FiStar, FiFolder, FiBriefcase, FiBookOpen, FiAward, FiMail, FiSettings, FiLogOut, FiMenu, FiFileText } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useMediaQuery } from '../../hooks/useApi';

const sidebarItems = [
  { label: 'Dashboard', icon: <FiGrid />, path: '/admin' },
  { label: 'Profile', icon: <FiUser />, path: '/admin/profile' },
  { label: 'Journey', icon: <FiMap />, path: '/admin/journey' },
  { label: 'Skills', icon: <FiStar />, path: '/admin/skills' },
  { label: 'Projects', icon: <FiFolder />, path: '/admin/projects' },
  { label: 'Experience', icon: <FiBriefcase />, path: '/admin/experience' },
  { label: 'Education', icon: <FiBookOpen />, path: '/admin/education' },
  { label: 'Certifications', icon: <FiAward />, path: '/admin/certifications' },
  { label: 'Messages', icon: <FiMail />, path: '/admin/messages' },
  { label: 'Settings', icon: <FiSettings />, path: '/admin/settings' },
];

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar overlay on mobile */}
      {isMobile && sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 45 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen || !isMobile ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>KR</span> Admin
          </div>
          <div className="admin-sidebar-label">Portfolio Dashboard</div>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          {sidebarItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

          <NavLink
            to="/"
            className="admin-nav-item"
            style={{ color: 'var(--color-accent)' }}
          >
            <span className="admin-nav-icon"><FiFileText /></span>
            View Portfolio
          </NavLink>

          <button className="admin-nav-item" onClick={handleLogout} style={{ color: 'var(--color-error)' }}>
            <span className="admin-nav-icon"><FiLogOut /></span>
            Logout
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginRight: '1rem' }}
              aria-label="Toggle sidebar"
            >
              <FiMenu />
            </button>
          )}
          <h1>{title}</h1>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
