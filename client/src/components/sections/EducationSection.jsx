import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, cardHover3D } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { educationAPI } from '../../api/services';

export default function EducationSection() {
  const { data: education, loading, error } = useApi(educationAPI.getAll);

  if (loading || error || !education?.length) return null;

  return (
    <section className="section" id="education" style={{ background: 'rgba(11, 18, 32, 0.4)' }}>
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-label">Academic Background</span>
          <h2 className="section-title">Education</h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} style={{ maxWidth: '700px', margin: '0 auto' }}>
          {education.map(edu => (
            <motion.div key={edu._id} className="education-card glass-card" variants={staggerItem} whileHover={cardHover3D.hover}>
              <div className="education-degree">{edu.degree}</div>
              {edu.college && <div className="education-college">{edu.college}</div>}
              {edu.university && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{edu.university}</div>}
              {(edu.startYear || edu.endYear) && (
                <div className="education-year">{edu.startYear}{edu.endYear ? ` — ${edu.endYear}` : ' — Present'}</div>
              )}
              {edu.description && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-md)', lineHeight: 1.7 }}>{edu.description}</p>}
              {edu.technologies?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: 'var(--space-md)' }}>
                  {edu.technologies.map((tech, i) => <span key={i} className="tech-tag">{tech}</span>)}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
