const router = require('express').Router();
const { getSettings, updateSettings, getDashboardStats } = require('../controllers/settingsController');

router.get('/', getSettings);
router.get('/dashboard', getDashboardStats);

module.exports = router;
