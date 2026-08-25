const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  university: {
    type: String,
    default: '',
    trim: true
  },
  startYear: {
    type: Number
  },
  endYear: {
    type: Number
  },
  description: {
    type: String,
    default: ''
  },
  technologies: [{
    type: String,
    trim: true
  }],
  highlights: [{
    type: String,
    trim: true
  }],
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

educationSchema.index({ displayOrder: 1 });

module.exports = mongoose.model('Education', educationSchema);
