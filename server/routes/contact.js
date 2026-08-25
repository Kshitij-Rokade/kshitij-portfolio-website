const router = require('express').Router();
const { body } = require('express-validator');
const { submitMessage, getMessages, updateMessage, deleteMessage } = require('../controllers/contactController');
const validate = require('../middleware/validate');

// Public - submit contact message
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name is too long'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }).withMessage('Subject is too long'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }).withMessage('Message is too long'),
  validate
], submitMessage);

// Admin routes
router.get('/', getMessages);

module.exports = router;
