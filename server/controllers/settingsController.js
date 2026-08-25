const SiteSettings = require('../models/SiteSettings');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Journey = require('../models/Journey');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const ContactMessage = require('../models/ContactMessage');

// @route   GET /api/settings
// @desc    Get site settings
// @access  Public
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      const updateData = { ...req.body };
      if (req.body.socialLinks) {
        updateData.socialLinks = { ...settings.socialLinks?.toObject?.() || {}, ...req.body.socialLinks };
      }
      settings = await SiteSettings.findOneAndUpdate({}, updateData, {
        new: true,
        runValidators: true
      });
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/settings/dashboard
// @desc    Get dashboard statistics
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      totalSkills,
      totalCertifications,
      totalExperience,
      totalJourney,
      totalEducation,
      messageStats
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Certification.countDocuments(),
      Experience.countDocuments(),
      Journey.countDocuments(),
      Education.countDocuments(),
      ContactMessage.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    // Process message stats
    const messages = { total: 0, new: 0, read: 0, replied: 0, archived: 0 };
    messageStats.forEach(stat => {
      messages[stat._id] = stat.count;
      messages.total += stat.count;
    });

    // Projects by category
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Skills by category
    const skillsByCategory = await Skill.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Messages over time (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const messagesOverTime = await ContactMessage.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Projects by technology
    const projectsByTech = await Project.aggregate([
      { $unwind: '$technologies' },
      { $group: { _id: '$technologies', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      stats: {
        totalProjects,
        totalSkills,
        totalCertifications,
        totalExperience,
        totalJourney,
        totalEducation,
        messages
      },
      charts: {
        projectsByCategory,
        skillsByCategory,
        messagesOverTime,
        projectsByTech
      }
    });
  } catch (error) {
    next(error);
  }
};
