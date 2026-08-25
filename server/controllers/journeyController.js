const Journey = require('../models/Journey');

// @route   GET /api/journey
// @desc    Get all journey milestones
// @access  Public
exports.getJourneyMilestones = async (req, res, next) => {
  try {
    const query = req.user ? {} : { published: true };
    const milestones = await Journey.find(query).sort({ displayOrder: 1 });
    res.json(milestones);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/journey
// @desc    Create journey milestone
// @access  Private
exports.createJourneyMilestone = async (req, res, next) => {
  try {
    const milestone = await Journey.create(req.body);
    res.status(201).json(milestone);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/journey/:id
// @desc    Update journey milestone
// @access  Private
exports.updateJourneyMilestone = async (req, res, next) => {
  try {
    const milestone = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found.' });
    }

    res.json(milestone);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/journey/:id
// @desc    Delete journey milestone
// @access  Private
exports.deleteJourneyMilestone = async (req, res, next) => {
  try {
    const milestone = await Journey.findByIdAndDelete(req.params.id);

    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found.' });
    }

    res.json({ message: 'Milestone deleted.' });
  } catch (error) {
    next(error);
  }
};
