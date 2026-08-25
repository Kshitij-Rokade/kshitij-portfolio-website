const router = require('express').Router();
const { getProjects, getProjectBySlug, createProject, updateProject, deleteProject, uploadProjectImages } = require('../controllers/projectController');
const upload = require('../middleware/upload');

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

module.exports = router;
