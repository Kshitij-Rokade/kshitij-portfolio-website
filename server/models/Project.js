const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  problem: {
    type: String,
    default: ''
  },
  solution: {
    type: String,
    default: ''
  },
  myRole: {
    type: String,
    default: ''
  },
  technologies: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  github: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'backend', 'database', 'academic', 'experimental', 'other'],
    default: 'other'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned', 'archived'],
    default: 'completed'
  },
  caseStudy: {
    architecture: { type: String, default: '' },
    challenges: [{ 
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      solution: { type: String, default: '' }
    }],
    results: { type: String, default: '' },
    features: [{ type: String }]
  },
  responsibilities: [{
    type: String,
    trim: true
  }],
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

projectSchema.index({ slug: 1 });
projectSchema.index({ featured: 1, published: 1 });
projectSchema.index({ category: 1 });

module.exports = mongoose.model('Project', projectSchema);
