import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiZap, FiTarget, FiBook, FiCpu } from 'react-icons/fi';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { profileAPI } from '../../api/services';

export default function AboutSection() {
  const { data: profile } = useApi(profileAPI.get);
  const about = profile?.aboutContent || {};

  const highlights = [
    { icon: <FiCode />, title: 'Software Development', desc: 'Building web applications from frontend to backend' },
    { icon: <FiLayers />, title: 'Full Stack Engineering', desc: 'React, Node.js, Express, MongoDB — the complete stack' },
    { icon: <FiTarget />, title: 'Problem Solving', desc: 'Breaking complex problems into manageable solutions' },
    { icon: <FiBook />, title: 'Continuous Learning', desc: 'Always exploring new technologies and approaches' },
    { icon: <FiZap />, title: 'Project-Driven', desc: 'Learning by building real, practical applications' },
    { icon: <FiCpu />, title: 'Emerging Tech', desc: 'Interest in AI, data science, and modern web' },
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label">Who I Am</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h3>Building Software, One Project at a Time</h3>
            <p>{about.whoIAm || 'Kshitij Rokade is a final-year Computer Engineering student focused on building practical software applications and developing into a strong full-stack engineer.'}</p>
            {about.journey && <p>{about.journey}</p>}
            {about.interests && (
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-sm)' }}>
                <strong style={{ color: 'var(--color-text-secondary)' }}>Interests:</strong> {about.interests}
              </p>
            )}
          </motion.div>

          <motion.div
            className="about-highlights"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {highlights.map((item, i) => (
              <motion.div key={i} className="about-highlight-item" variants={staggerItem}>
                <div className="about-highlight-icon">{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>{item.title}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
