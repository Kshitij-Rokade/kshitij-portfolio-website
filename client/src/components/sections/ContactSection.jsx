import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCheckCircle } from 'react-icons/fi';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';
import { contactAPI } from '../../api/services';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.length > 5000) e.message = 'Message is too long';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setSending(true);
    try {
      await contactAPI.submit(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setServerError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-label" style={{ color: 'var(--color-primary)' }}>Establish Connection</span>
          <h2 className="section-title">Ping Me</h2>
          <p className="section-subtitle">Let's build the future together.</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div className="contact-info" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <h3>Let's Connect</h3>
            <p>
              Whether you have a project idea, want to collaborate, or just want to say hello — feel free to reach out.
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <div className="contact-links">
              <a href="mailto:kshitijrokade@example.com" className="contact-link-item">
                <span className="contact-link-icon"><FiMail /></span>
                <span>kshitijrokade@example.com</span>
              </a>
              <a href="https://github.com/Kshitij-Rokade" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="contact-link-icon"><FiGithub /></span>
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/kshitijrokade514/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="contact-link-icon"><FiLinkedin /></span>
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          <motion.div className="contact-form glass-card" variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            {sent ? (
              <div className="contact-success">
                <div className="contact-success-icon"><FiCheckCircle /></div>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>Message Sent!</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>Thank you for reaching out. I'll get back to you soon.</p>
                <button className="btn btn-secondary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input id="contact-name" className="form-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} aria-required="true" />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input id="contact-email" className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} aria-required="true" />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input id="contact-subject" className="form-input" type="text" placeholder="What's this about?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} aria-required="true" />
                  {errors.subject && <div className="form-error">{errors.subject}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" className="form-textarea" placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} aria-required="true" />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>
                {serverError && <div className="form-error" style={{ marginBottom: 'var(--space-md)' }}>{serverError}</div>}
                <button type="submit" className="btn btn-primary btn-lg" disabled={sending} style={{ width: '100%' }}>
                  {sending ? 'Sending...' : 'Send Message'} <FiSend />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
