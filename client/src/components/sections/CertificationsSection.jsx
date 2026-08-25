import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { fadeInUp, staggerContainer, staggerItem, cardHover3D } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { certificationsAPI } from '../../api/services';
import { formatDate } from '../../utils/helpers';

export default function CertificationsSection() {
  const { data: certifications, loading, error } = useApi(certificationsAPI.getAll);

  if (loading) return <section className="section" id="certifications"><div className="container"><div className="loading-container"><div className="loading-spinner" /><p>Loading certifications...</p></div></div></section>;
  if (error || !certifications?.length) return null;

  return (
    <section className="section" id="certifications">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Certifications</h2>
        </motion.div>

        <motion.div className="certifications-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {certifications.map(cert => (
            <motion.div key={cert._id} className="cert-card glass-card glass-card-glow" variants={staggerItem} whileHover={cardHover3D.hover}>
              <div className="cert-card-header">
                <div className="cert-icon"><FiAward /></div>
                <div>
                  <div className="cert-name">{cert.name}</div>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>
              </div>
              {cert.issueDate && <div className="cert-date">{formatDate(cert.issueDate)}</div>}
              {cert.credentialId && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>ID: {cert.credentialId}</div>}
              {cert.description && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>{cert.description}</p>}
              {cert.verificationUrl && (
                <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ marginTop: 'var(--space-md)' }}>
                  Verify
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
