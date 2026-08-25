import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const fillPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgImage = useMotionTemplate`linear-gradient(to right, var(--color-success) ${fillPercentage}%, var(--color-text-secondary) ${fillPercentage}%)`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`} role="navigation" aria-label="Main navigation">
        {/* Scroll Progress Bar */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'var(--color-primary)',
            boxShadow: '0 0 10px var(--color-primary)',
            scaleX: scrollYProgress,
            transformOrigin: '0%',
            zIndex: 10
          }}
        />
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="Kshitij Rokade — Home">
            <span style={{ 
              fontSize: '1.4rem', 
              fontWeight: 800, 
              letterSpacing: '1px', 
              color: 'var(--color-text)', 
              fontFamily: 'var(--font-display)' 
            }}>
              KSHITIJ<span style={{ color: 'var(--color-primary)' }}>.</span>
            </span>
          </Link>

          <div className="navbar-links">
            {navLinks.map(link => (
              <motion.a
                key={link.label}
                href={link.href}
                className="navbar-link"
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  backgroundImage: bgImage,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent', // fallback
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="navbar-actions">
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="mobile-menu-link"
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingLeft: '1.5rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a href="https://github.com/Kshitij-Rokade" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/kshitijrokade514/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
