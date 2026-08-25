const Certification = require('../models/Certification');

// @route   GET /api/certifications
// @desc    Get all certifications
// @access  Public
exports.getCertifications = async (req, res, next) => {
  try {
    const certifications = await Certification.find().sort({ displayOrder: 1 });
    res.json(certifications);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/certifications
// @desc    Create certification
// @access  Private
exports.createCertification = async (req, res, next) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json(certification);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/certifications/:id
// @desc    Update certification
// @access  Private
exports.updateCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({ error: 'Certification not found.' });
    }

    res.json(certification);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/certifications/:id
// @desc    Delete certification
// @access  Private
exports.deleteCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);

    if (!certification) {
      return res.status(404).json({ error: 'Certification not found.' });
    }

    res.json({ message: 'Certification deleted.' });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/certifications/:id/image
// @desc    Upload certification image
// @access  Private
exports.uploadCertificationImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image.' });
    }

    const image = `/uploads/certifications/${req.file.filename}`;
    
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      { image },
      { new: true }
    );

    if (!certification) {
      return res.status(404).json({ error: 'Certification not found.' });
    }

    res.json(certification);
  } catch (error) {
    next(error);
  }
};
