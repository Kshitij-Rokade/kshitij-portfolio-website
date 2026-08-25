const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Certification name is required'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'],
    trim: true
  },
  issueDate: {
    type: Date
  },
  credentialId: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  verificationUrl: {
    type: String,
    default: ''
  },
  description: {
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

certificationSchema.index({ displayOrder: 1 });

module.exports = mongoose.model('Certification', certificationSchema);
