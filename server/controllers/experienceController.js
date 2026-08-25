const Experience = require('../models/Experience');

// @route   GET /api/experience
// @desc    Get all experience
// @access  Public
exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ displayOrder: 1 });
    res.json(experiences);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/experience
// @desc    Create experience
// @access  Private
exports.createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/experience/:id
// @desc    Update experience
// @access  Private
exports.updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found.' });
    }

    res.json(experience);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/experience/:id
// @desc    Delete experience
// @access  Private
exports.deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found.' });
    }

    res.json({ message: 'Experience deleted.' });
  } catch (error) {
    next(error);
  }
};
