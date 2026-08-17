const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');
const { contactValidationRules } = require('../validators/contactValidator');
const { contactLimiter } = require('../middleware/rateLimiter');

// POST /api/contact — Submit contact form
router.post('/', contactLimiter, contactValidationRules, submitContact);

module.exports = router;
