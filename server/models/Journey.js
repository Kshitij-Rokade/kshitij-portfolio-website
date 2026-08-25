const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Year is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['foundation', 'web-development', 'frontend', 'backend', 'fullstack', 'internship', 'project', 'learning', 'other'],
    default: 'other'
  },
  technologies: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

journeySchema.index({ displayOrder: 1 });
journeySchema.index({ published: 1 });

module.exports = mongoose.model('Journey', journeySchema);
