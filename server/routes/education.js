const router = require('express').Router();
const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');

router.get('/', getEducation);

module.exports = router;
