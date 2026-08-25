const Project = require('../models/Project');
const slugify = require('slugify');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const query = req.user ? {} : { published: true };
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ featured: -1, displayOrder: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/projects/:slug
// @desc    Get project by slug
// @access  Public
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    if (!project.published && !req.user) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/projects
// @desc    Create project
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    if (!req.body.slug) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    if (req.body.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json({ message: 'Project deleted.' });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/projects/:id/images
// @desc    Upload project images
// @access  Private
exports.uploadProjectImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one image.' });
    }

    const images = req.files.map(file => `/uploads/projects/${file.filename}`);
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: images } } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};
