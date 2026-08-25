const router = require('express').Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');

router.get('/', getSkills);

module.exports = router;
