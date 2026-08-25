const router = require('express').Router();
const { getJourneyMilestones, createJourneyMilestone, updateJourneyMilestone, deleteJourneyMilestone } = require('../controllers/journeyController');

router.get('/', getJourneyMilestones);

module.exports = router;
