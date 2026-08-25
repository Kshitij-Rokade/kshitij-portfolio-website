const Profile = require('../models/Profile');

// @route   GET /api/profile
// @desc    Get profile
// @access  Public
exports.getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      // Handle nested objects properly
      const updateData = { ...req.body };
      
      if (req.body.heroContent) {
        updateData.heroContent = { ...profile.heroContent?.toObject?.() || {}, ...req.body.heroContent };
      }
      if (req.body.aboutContent) {
        updateData.aboutContent = { ...profile.aboutContent?.toObject?.() || {}, ...req.body.aboutContent };
      }
      if (req.body.socialLinks) {
        updateData.socialLinks = { ...profile.socialLinks?.toObject?.() || {}, ...req.body.socialLinks };
      }

      profile = await Profile.findOneAndUpdate({}, updateData, {
        new: true,
        runValidators: true
      });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/profile/resume
// @desc    Upload resume
// @access  Private
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file.' });
    }

    const resumeUrl = `/uploads/resume/${req.file.filename}`;
    
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ resumeUrl });
    } else {
      profile = await Profile.findOneAndUpdate({}, { resumeUrl }, { new: true });
    }

    res.json({ resumeUrl, profile });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/profile/image
// @desc    Upload profile image
// @access  Private
exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image.' });
    }

    const profileImage = `/uploads/profile/${req.file.filename}`;
    
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ profileImage });
    } else {
      profile = await Profile.findOneAndUpdate({}, { profileImage }, { new: true });
    }

    res.json({ profileImage, profile });
  } catch (error) {
    next(error);
  }
};
