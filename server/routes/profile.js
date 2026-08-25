const router = require('express').Router();
const { getProfile, updateProfile, uploadResume, uploadProfileImage } = require('../controllers/profileController');
const upload = require('../middleware/upload');

router.get('/', getProfile);

module.exports = router;
