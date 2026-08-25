const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['programming', 'frontend', 'backend', 'database', 'tools', 'apis', 'cs-fundamentals', 'other'],
    default: 'other'
  },
  icon: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  projects: [{
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

skillSchema.index({ category: 1, displayOrder: 1 });

module.exports = mongoose.model('Skill', skillSchema);
