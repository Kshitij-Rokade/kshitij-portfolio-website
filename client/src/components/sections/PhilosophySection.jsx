import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const steps = [
  { title: 'Understand the Problem', desc: 'Start by deeply understanding what needs to be built and why.' },
  { title: 'Break It Down', desc: 'Decompose complex requirements into smaller, manageable components.' },
  { title: 'Choose the Right Tools', desc: 'Select appropriate technologies based on the problem, not trends.' },
  { title: 'Build Iteratively', desc: 'Start simple, get it working, then improve incrementally.' },
  { title: 'Debug Systematically', desc: 'When things break, follow the evidence — read errors, check docs, test hypotheses.' },
  { title: 'Test & Validate', desc: 'Verify that the solution works as expected across different scenarios.' },
  { title: 'Deploy & Document', desc: 'Ship the work and document decisions for future reference.' },
  { title: 'Learn from Results', desc: 'Every project teaches something — capture and apply those lessons.' },
];

export default function PhilosophySection() {
  return (
    <section className="section" id="philosophy">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-label">Engineering Approach</span>
          <h2 className="section-title">How I Build</h2>
          <p className="section-subtitle">A systematic approach to solving problems with software</p>
        </motion.div>

        <motion.div className="philosophy-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {steps.map((step, i) => (
            <motion.div key={i} className="philosophy-step glass-card" variants={staggerItem}>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
