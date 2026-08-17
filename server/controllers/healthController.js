const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Health check endpoint
 * @route   GET /api/health
 * @access  Public
 */
const healthCheck = (req, res) => {
  ApiResponse.success(res, 'Server is running', {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

module.exports = { healthCheck };
