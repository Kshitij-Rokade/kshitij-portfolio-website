import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiGithub, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { projectsAPI } from '../../api/services';
import { getCategoryLabel, getImageUrl } from '../../utils/helpers';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, loading, error } = useApi(() => projectsAPI.getBySlug(slug), true);

  if (loading) return (
    <div className="project-detail">
      <div className="container"><div className="loading-container"><div className="loading-spinner" /><p>Loading project...</p></div></div>
    </div>
  );

  if (error || !project) return (
    <div className="project-detail">
      <div className="container">
        <div className="error-container">
          <p>Project not found.</p>
          <Link to="/#projects" className="btn btn-primary">Back to Projects</Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{project.title} — Kshitij Rokade</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} — Kshitij Rokade`} />
        <meta property="og:description" content={project.description} />
      </Helmet>

      <div className="project-detail">
        <div className="container">
          {/* Back button */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" style={{ marginBottom: 'var(--space-xl)' }}>
            <Link to="/#projects" className="btn btn-ghost" style={{ color: 'var(--color-text-muted)' }}>
              <FiArrowLeft /> Back to Projects
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div className="project-detail-hero" variants={fadeInUp} initial="hidden" animate="visible">
            <span className="badge" style={{ marginBottom: 'var(--space-md)' }}>{getCategoryLabel(project.category)}</span>
            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 'var(--space-xl)' }}>
              {project.technologies?.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <FiGithub /> View Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.div>

          {/* Problem */}
          {project.problem && (
            <motion.div className="case-study-section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>The Problem</h2>
              <p>{project.problem}</p>
            </motion.div>
          )}

          {/* Solution */}
          {project.solution && (
            <motion.div className="case-study-section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>The Solution</h2>
              <p>{project.solution}</p>
            </motion.div>
          )}

          {/* My Role */}
          {project.myRole && (
            <motion.div className="case-study-section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>My Role</h2>
              <p>{project.myRole}</p>
              {project.responsibilities?.length > 0 && (
                <ul style={{ marginTop: 'var(--space-md)', paddingLeft: 'var(--space-xl)' }}>
                  {project.responsibilities.map((r, i) => (
                    <li key={i} style={{ listStyle: 'disc', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: 'var(--text-sm)' }}>{r}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}

          {/* Architecture */}
          {project.caseStudy?.architecture && (
            <motion.div className="case-study-section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>Technical Architecture</h2>
              <p>{project.caseStudy.architecture}</p>
              <div className="architecture-diagram glass-card" style={{ marginTop: 'var(--space-xl)' }}>
                <div className="arch-flow">
                  <div className="arch-node arch-node-primary">Frontend (React.js)</div>
                  <div className="arch-arrow">↓</div>
                  <div className="arch-node">REST API</div>
                  <div className="arch-arrow">↓</div>
                  <div className="arch-node arch-node-secondary">Express.js / Node.js</div>
                  <div className="arch-arrow">↓</div>
                  <div className="arch-node arch-node-accent">MongoDB</div>
                </div>
                <div style={{ marginTop: 'var(--space-xl)', fontSize: 'var(--text-sm)', color: 'var(--color-text-dim)' }}>
                  External: Google Maps / Places API
                </div>
              </div>
            </motion.div>
          )}

          {/* Features */}
          {project.caseStudy?.features?.length > 0 && (
            <motion.div className="case-study-section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>Key Features</h2>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                {project.caseStudy.features.map((feature, i) => (
                  <motion.div key={i} variants={staggerItem} className="glass-card" style={{ padding: 'var(--space-md) var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <FiChevronRight style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Challenges */}
          {project.caseStudy?.challenges?.length > 0 && (
            <motion.div className="case-study-section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>Engineering Challenges</h2>
              {project.caseStudy.challenges.map((challenge, i) => (
                <div key={i} className="challenge-card glass-card">
                  <h4>{challenge.title}</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{challenge.description}</p>
                  {challenge.solution && (
                    <>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-md)' }}>
                        <strong>Resolution:</strong> {challenge.solution}
                      </p>
                      <div className="challenge-flow">
                        {['Problem', 'Documentation', 'Debugging', 'Configuration', 'Testing', 'Working'].map((step, j) => (
                          <span key={j}>
                            <span className="challenge-step">{step}</span>
                            {j < 5 && <span className="challenge-arrow"> → </span>}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Results */}
          {project.caseStudy?.results && (
            <motion.div className="case-study-section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>Results</h2>
              <p>{project.caseStudy.results}</p>
            </motion.div>
          )}

          {/* Back navigation */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
            <Link to="/#projects" className="btn btn-secondary btn-lg">
              <FiArrowLeft /> Back to All Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
