import { motion } from 'framer-motion';
import { FiTarget, FiLayers, FiServer, FiDatabase, FiCpu, FiGlobe, FiTrendingUp, FiBox } from 'react-icons/fi';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { profileAPI } from '../../api/services';

const defaultFocus = [
  { icon: <FiLayers />, text: 'Strong Full Stack Development' },
  { icon: <FiBox />, text: 'Production-ready React applications' },
  { icon: <FiServer />, text: 'Backend/API development' },
  { icon: <FiDatabase />, text: 'Database design' },
  { icon: <FiTrendingUp />, text: 'Better system architecture' },
  { icon: <FiCpu />, text: 'AI-powered applications' },
  { icon: <FiGlobe />, text: 'Modern web technologies' },
  { icon: <FiTarget />, text: 'Software engineering practices' },
];

const icons = [FiLayers, FiBox, FiServer, FiDatabase, FiTrendingUp, FiCpu, FiGlobe, FiTarget];

export default function CurrentFocusSection() {
  const { data: profile } = useApi(profileAPI.get);
  const focusItems = profile?.currentFocus?.length > 0
    ? profile.currentFocus.map((text, i) => ({ icon: icons[i % icons.length] ? <>{(() => { const Icon = icons[i % icons.length]; return <Icon />; })()}</> : <FiTarget />, text }))
    : defaultFocus;

  return (
    <section className="section" id="focus">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-label">Looking Ahead</span>
          <h2 className="section-title">What I'm Building Toward</h2>
          <p className="section-subtitle">Areas of growth and professional development</p>
        </motion.div>

        <motion.div className="focus-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {focusItems.map((item, i) => (
            <motion.div key={i} className="focus-card glass-card" variants={staggerItem}>
              <div className="focus-icon">{item.icon}</div>
              <span className="focus-text">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
