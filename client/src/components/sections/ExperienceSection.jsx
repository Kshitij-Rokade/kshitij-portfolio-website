import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiMapPin } from 'react-icons/fi';
import { fadeInUp, cardHover3D } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { experienceAPI } from '../../api/services';

export default function ExperienceSection() {
  const { data: experiences, loading, error } = useApi(experienceAPI.getAll);
  const [expandedId, setExpandedId] = useState(null);

  if (loading) return <section className="section" id="experience"><div className="container"><div className="loading-container"><div className="loading-spinner" /><p>Loading experience...</p></div></div></section>;
  if (error || !experiences?.length) return null;

  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label">Professional Experience</span>
          <h2 className="section-title">Internship & Work</h2>
        </motion.div>

        {experiences.map(exp => (
          <motion.div
            key={exp._id}
            className="experience-card glass-card glass-card-glow"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={cardHover3D.hover}
            style={{ maxWidth: '800px', margin: '0 auto var(--space-xl)' }}
          >
            <div className="experience-header">
              <div>
                <h3 className="experience-role">{exp.role}</h3>
                <div className="experience-org">
                  <FiMapPin style={{ display: 'inline', marginRight: '0.25rem' }} />
                  {exp.organization}
                </div>
                {exp.domain && <div className="experience-domain">{exp.domain}</div>}
                {exp.duration && (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                    {exp.duration}
                  </div>
                )}
              </div>
              <button
                className="experience-expand btn btn-ghost btn-sm"
                onClick={() => setExpandedId(expandedId === exp._id ? null : exp._id)}
                aria-expanded={expandedId === exp._id}
              >
                {expandedId === exp._id ? 'Less' : 'Details'}
                {expandedId === exp._id ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>

            {exp.description && (
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                {exp.description}
              </p>
            )}

            {exp.technologies?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: 'var(--space-md)' }}>
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}

            <AnimatePresence>
              {expandedId === exp._id && (
                <motion.div
                  className="experience-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {exp.responsibilities?.length > 0 && (
                    <>
                      <h4>Responsibilities</h4>
                      <ul>{exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                    </>
                  )}
                  {exp.learning?.length > 0 && (
                    <>
                      <h4>Key Learning</h4>
                      <ul>{exp.learning.map((l, i) => <li key={i}>{l}</li>)}</ul>
                    </>
                  )}
                  {exp.projectContribution && (
                    <>
                      <h4>Project Contribution</h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', paddingLeft: 'var(--space-lg)' }}>{exp.projectContribution}</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
