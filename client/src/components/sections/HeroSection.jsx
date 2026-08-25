import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';
import { heroTextReveal, staggerContainer, staggerItem } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { profileAPI } from '../../api/services';

export default function HeroSection() {
  const { data: profile } = useApi(profileAPI.get);

  const hero = profile?.heroContent || {};
  const title = hero.title || 'SYSTEM INITIALIZED.';
  const subtitle = hero.subtitle || 'Kshitij Rokade — Full Stack Developer';
  const description = hero.description || 'From the first line of code to full-stack applications — building, debugging, learning, and evolving with every project.';

  return (
    <section className="hero" id="home" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
      <div className="container">
        {/* We constrain the text to the left side (max-width) so the 3D Character can occupy the right/center */}
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '600px', paddingTop: '15vh', pointerEvents: 'auto' }}
        >
          <motion.span 
            className="hero-greeting" 
            variants={heroTextReveal}
            style={{ 
              color: 'var(--color-primary)', 
              fontWeight: 600, 
              letterSpacing: '3px', 
              textTransform: 'uppercase',
              fontSize: 'var(--text-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ width: '8px', height: '8px', background: 'var(--color-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-primary)' }}></span>
            SYSTEM INITIALIZED
          </motion.span>

          <motion.h1 
            className="hero-title" 
            variants={heroTextReveal}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1.1,
              marginTop: '1.5rem',
              marginBottom: '1rem',
              letterSpacing: '-1px'
            }}
          >
            KSHITIJ ROKADE
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            variants={heroTextReveal}
            style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'var(--color-text)', 
              fontWeight: 500,
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            &gt; Computer Engineering Student
          </motion.h2>

          <motion.h2
            className="hero-subtitle"
            variants={heroTextReveal}
            style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'var(--color-primary)', 
              fontWeight: 500,
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            &gt; Full Stack Developer
          </motion.h2>

          <motion.p 
            className="hero-description" 
            variants={heroTextReveal}
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-lg)',
              lineHeight: 1.6,
              marginBottom: '2.5rem'
            }}
          >
            {description}
          </motion.p>

          <motion.div className="hero-buttons" variants={staggerItem} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#journey" className="btn btn-primary btn-lg" onClick={(e) => {
              e.preventDefault();
              document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore My Journey
            </a>
            <a href="#projects" className="btn btn-secondary btn-lg" onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Projects
            </a>
            <a href="#contact" className="btn btn-ghost btn-lg" style={{ border: '1px solid var(--border-color)' }} onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Contact Me
            </a>
          </motion.div>

          <motion.div 
            className="hero-social" 
            variants={staggerItem}
            style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              marginTop: '3rem',
              fontSize: '1.5rem'
            }}
          >
            <a href={profile?.github || profile?.socialLinks?.github || 'https://github.com/Kshitij-Rokade'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'} aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={profile?.linkedin || profile?.socialLinks?.linkedin || 'https://www.linkedin.com/in/kshitijrokade514/'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'} aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={`mailto:${profile?.email || ''}`} style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'} aria-label="Email">
              <FiMail />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
