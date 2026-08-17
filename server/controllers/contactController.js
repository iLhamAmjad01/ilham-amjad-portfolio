const { validationResult } = require('express-validator');
const { processContactMessage } = require('../services/contactService');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Submit a contact form message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.error(res, 'Validation failed', 400, errors.array());
    }

    await processContactMessage(req.body);

    ApiResponse.success(res, 'Message sent successfully! I\'ll get back to you soon.', null, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact };
