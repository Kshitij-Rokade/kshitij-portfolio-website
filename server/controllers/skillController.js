const Skill = require('../models/Skill');

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, displayOrder: 1 });
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/skills
// @desc    Create skill
// @access  Private
exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private
exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    res.json(skill);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private
exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    res.json({ message: 'Skill deleted.' });
  } catch (error) {
    next(error);
  }
};
