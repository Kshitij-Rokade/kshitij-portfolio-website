const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Kshitij Rokade'
  },
  headline: {
    type: String,
    default: 'Final-Year Computer Engineering Student & Full Stack Developer'
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  portfolioUrl: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  heroContent: {
    title: { type: String, default: 'Building ideas into working software.' },
    subtitle: { type: String, default: 'Kshitij Rokade — Final-Year Computer Engineering Student & Full Stack Developer' },
    description: { type: String, default: 'From my first database-driven applications to MERN stack development, I learn by building real projects and solving practical problems.' }
  },
  aboutContent: {
    whoIAm: { type: String, default: 'Kshitij Rokade is a final-year Computer Engineering student focused on building practical software applications and developing into a strong full-stack engineer.' },
    journey: { type: String, default: '' },
    interests: { type: String, default: '' }
  },
  currentFocus: [{
    type: String
  }],
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    email: { type: String, default: '' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
