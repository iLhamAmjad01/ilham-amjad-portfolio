const ApiResponse = require('../utils/ApiResponse');

/**
 * 404 handler for undefined routes.
 */
const notFound = (req, res, next) => {
  ApiResponse.error(res, `Route not found: ${req.originalUrl}`, 404);
};

module.exports = notFound;
