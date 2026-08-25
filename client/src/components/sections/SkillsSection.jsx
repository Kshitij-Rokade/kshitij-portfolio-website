import { motion } from 'framer-motion';
import { FiCode, FiLayout, FiServer, FiDatabase, FiTool, FiLink, FiCpu } from 'react-icons/fi';
import { fadeInUp, staggerContainer, staggerItem, cardHover3D, skillHover3D } from '../../utils/animations';
import { useApi } from '../../hooks/useApi';
import { skillsAPI } from '../../api/services';
import { getCategoryLabel, skillCategoryOrder } from '../../utils/helpers';

const categoryIcons = {
  programming: <FiCode />,
  frontend: <FiLayout />,
  backend: <FiServer />,
  database: <FiDatabase />,
  tools: <FiTool />,
  apis: <FiLink />,
  'cs-fundamentals': <FiCpu />,
  other: <FiCode />,
};

export default function SkillsSection() {
  const { data: skills, loading, error } = useApi(skillsAPI.getAll);

  if (loading) return <section className="section" id="skills"><div className="container"><div className="loading-container"><div className="loading-spinner" /><p>Loading skills...</p></div></div></section>;
  if (error) return <section className="section" id="skills"><div className="container"><div className="error-container"><p>Unable to load skills.</p></div></div></section>;
  if (!skills?.length) return null;

  // Group skills by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const sortedCategories = skillCategoryOrder.filter(cat => grouped[cat]);

  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label">Technical Stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies I work with, grouped by area of expertise
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {sortedCategories.map(category => (
            <motion.div
              key={category}
              className="skill-category-card glass-card"
              variants={staggerItem}
              whileHover={cardHover3D.hover}
            >
              <div className="skill-category-header">
                <div className="skill-category-icon">{categoryIcons[category]}</div>
                <h3 className="skill-category-title">{getCategoryLabel(category)}</h3>
              </div>
              <div className="skill-items">
                {grouped[category].map(skill => (
                  <motion.div key={skill._id} className="skill-item" whileHover={skillHover3D.hover}>
                    <span className="skill-name" style={{ display: 'block', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
