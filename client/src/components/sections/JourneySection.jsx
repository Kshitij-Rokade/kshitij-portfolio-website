import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { journeyAPI } from '../../api/services';

export default function JourneySection() {
  const { data: milestones, loading, error } = useApi(journeyAPI.getAll);

  if (loading) return <section className="section" id="journey"><div className="container"><div className="loading-container"><div className="loading-spinner" /><p>Loading journey...</p></div></div></section>;
  if (error) return <section className="section" id="journey"><div className="container"><div className="error-container"><p>Unable to load journey milestones.</p></div></div></section>;
  if (!milestones?.length) return null;

  return (
    <section className="section" id="journey" style={{ position: 'relative', zIndex: 5 }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label" style={{ color: 'var(--color-primary)' }}>System Architecture</span>
          <h2 className="section-title">The Engineering Journey</h2>
          <p className="section-subtitle">
            From code fundamentals to full-stack system integrations.
          </p>
        </motion.div>

        {/* Animated progression bar */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: 'var(--space-3xl)',
            flexWrap: 'wrap'
          }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {['Programming', '→', 'Web Dev', '→', 'PHP/MySQL', '→', 'React', '→', 'MERN Stack'].map((item, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
              style={{
                padding: item === '→' ? '0.3rem' : '0.4rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                background: item === '→' ? 'transparent' : 'var(--color-primary-light)',
                color: item === '→' ? 'var(--color-text-dim)' : 'var(--color-primary)',
                border: item === '→' ? 'none' : '1px solid rgba(0, 200, 255, 0.3)',
                boxShadow: item === '→' ? 'none' : 'inset 0 0 10px rgba(0, 200, 255, 0.1)'
              }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        <div className="timeline">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone._id}
              className="timeline-item"
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <span className="timeline-year">{milestone.year}</span>
              <div className="timeline-dot" />
              <div className="timeline-card glass-card glass-card-glow">
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
                {milestone.technologies?.length > 0 && (
                  <div className="timeline-techs">
                    {milestone.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
