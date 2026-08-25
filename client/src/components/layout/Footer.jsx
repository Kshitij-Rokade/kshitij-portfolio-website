import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
              Kshitij Rokade
            </h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>Computer Engineering Student & Full Stack Developer.</p>
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'var(--bg-surface)', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>System Architecture</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <span>Frontend</span> <span style={{ color: 'var(--color-text-muted)' }}>→</span> <span>API</span> <span style={{ color: 'var(--color-text-muted)' }}>→</span> <span>Backend</span> <span style={{ color: 'var(--color-text-muted)' }}>→</span> <span>Database</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Navigation</h4>
            <div className="footer-links">
              <a href="/#home" className="footer-link">Home</a>
              <a href="/#journey" className="footer-link">Journey</a>
              <a href="/#about" className="footer-link">About</a>
              <a href="/#skills" className="footer-link">Skills</a>
              <a href="/#projects" className="footer-link">Projects</a>
              <a href="/#contact" className="footer-link">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Connect</h4>
            <div className="footer-links">
              <a href="https://github.com/Kshitij-Rokade" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/kshitijrokade514/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiLinkedin /> LinkedIn
              </a>
              <a href="mailto:kshitijrokade@example.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiMail /> Email
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Explore</h4>
            <div className="footer-links">
              <a href="/#experience" className="footer-link">Experience</a>
              <a href="/#certifications" className="footer-link">Certifications</a>
              <Link to="/projects/fuelsense" className="footer-link">FuelSense Case Study</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid var(--border-color)', marginTop: '3rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>&copy; {year} Kshitij Rokade. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Status: <span style={{ color: 'var(--color-success)' }}>Online</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
