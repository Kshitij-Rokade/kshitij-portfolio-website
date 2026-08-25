const Education = require('../models/Education');

// @route   GET /api/education
// @desc    Get all education
// @access  Public
exports.getEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ displayOrder: 1 });
    res.json(education);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/education
// @desc    Create education
// @access  Private
exports.createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/education/:id
// @desc    Update education
// @access  Private
exports.updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({ error: 'Education entry not found.' });
    }

    res.json(education);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/education/:id
// @desc    Delete education
// @access  Private
exports.deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({ error: 'Education entry not found.' });
    }

    res.json({ message: 'Education entry deleted.' });
  } catch (error) {
    next(error);
  }
};
