const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Kshitij Rokade — Portfolio'
  },
  siteDescription: {
    type: String,
    default: 'Full Stack Developer | React Developer | MERN Stack Developer'
  },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    email: { type: String, default: '' }
  },
  footerText: {
    type: String,
    default: 'Built with React & MERN'
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  seoKeywords: [{
    type: String
  }],
  ogImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
