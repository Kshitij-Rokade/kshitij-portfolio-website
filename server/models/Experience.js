const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  domain: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  responsibilities: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  learning: [{
    type: String,
    trim: true
  }],
  projectContribution: {
    type: String,
    default: ''
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

experienceSchema.index({ displayOrder: 1 });

module.exports = mongoose.model('Experience', experienceSchema);
