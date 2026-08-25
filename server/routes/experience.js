const router = require('express').Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');

router.get('/', getExperiences);

module.exports = router;
