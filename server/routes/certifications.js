const router = require('express').Router();
const { getCertifications, createCertification, updateCertification, deleteCertification, uploadCertificationImage } = require('../controllers/certificationController');
const upload = require('../middleware/upload');

router.get('/', getCertifications);

module.exports = router;
