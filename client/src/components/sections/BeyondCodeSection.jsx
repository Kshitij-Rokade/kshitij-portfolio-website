import { motion } from 'framer-motion';
import { FiMessageCircle, FiUsers, FiTarget, FiRefreshCw, FiMonitor, FiTrendingUp } from 'react-icons/fi';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const items = [
  { icon: <FiMessageCircle />, title: 'Communication', desc: 'Explaining technical concepts clearly to both technical and non-technical audiences.' },
  { icon: <FiTarget />, title: 'Problem Solving', desc: 'Approaching challenges systematically — understanding, breaking down, and iterating toward solutions.' },
  { icon: <FiUsers />, title: 'Team Collaboration', desc: 'Working effectively in teams, sharing knowledge, and contributing to shared goals.' },
  { icon: <FiMonitor />, title: 'Project Presentation', desc: 'Documenting and presenting software projects with clarity and structure.' },
  { icon: <FiRefreshCw />, title: 'Continuous Improvement', desc: 'Consistently reviewing, refactoring, and improving work based on feedback.' },
  { icon: <FiTrendingUp />, title: 'Professional Growth', desc: 'Actively preparing for software engineering roles through learning and practice.' },
];

export default function BeyondCodeSection() {
  return (
    <section className="section" id="beyond" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-label">Professional Development</span>
          <h2 className="section-title">Beyond the Code</h2>
          <p className="section-subtitle">Software engineering extends beyond writing code</p>
        </motion.div>

        <motion.div className="beyond-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {items.map((item, i) => (
            <motion.div key={i} className="beyond-card glass-card" variants={staggerItem}>
              <div className="beyond-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
