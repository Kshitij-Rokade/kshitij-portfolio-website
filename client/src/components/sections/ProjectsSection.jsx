import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { fadeInUp, staggerContainer, staggerItem, scaleIn, cardHover3D } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { projectsAPI } from '../../api/services';
import { getCategoryLabel, truncateText, getImageUrl } from '../../utils/helpers';

export default function ProjectsSection() {
  const { data: projects, loading, error } = useApi(projectsAPI.getAll);

  if (loading) return <section className="section" id="projects"><div className="container"><div className="loading-container"><div className="loading-spinner" /><p>Loading projects...</p></div></div></section>;
  if (error) return <section className="section" id="projects"><div className="container"><div className="error-container"><p>Unable to load projects.</p></div></div></section>;
  if (!projects?.length) return null;

  return (
    <section className="section" id="projects" style={{ position: 'relative', zIndex: 5 }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label" style={{ color: 'var(--color-primary)' }}>Project Databanks</span>
          <h2 className="section-title">System Architecture</h2>
          <p className="section-subtitle">
            Digital artifacts built to solve problems and master technologies.
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map(project => (
            <motion.div
              key={project._id}
              className={`project-card glass-card glass-card-glow ${project.featured ? 'featured' : ''} ${project.slug === 'fuelsense' ? 'project-fuelsense' : ''}`}
              variants={scaleIn}
              whileHover={cardHover3D.hover}
            >
              <div className="project-image">
                {project.images?.[0] ? (
                  <img src={getImageUrl(project.images[0])} alt={project.title} loading="lazy" />
                ) : (
                  <div className="project-image-placeholder">
                    <FiArrowRight />
                  </div>
                )}
              </div>

              <div className="project-body">
                <span className="project-category" style={{ color: project.slug === 'fuelsense' ? 'var(--color-success)' : 'var(--color-primary)' }}>{getCategoryLabel(project.category)}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {truncateText(project.description, project.featured ? 300 : 150)}
                </p>

                <div className="project-techs">
                  {project.technologies?.slice(0, project.featured ? 8 : 5).map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies?.length > (project.featured ? 8 : 5) && (
                    <span className="tech-tag" style={{ opacity: 0.5 }}>+{project.technologies.length - (project.featured ? 8 : 5)}</span>
                  )}
                </div>

                <div className="project-links">
                  <Link to={`/projects/${project.slug}`} className="btn btn-primary btn-sm">
                    {project.featured ? 'View Case Study' : 'View Details'} <FiArrowRight />
                  </Link>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <FiGithub /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      <FiExternalLink /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
