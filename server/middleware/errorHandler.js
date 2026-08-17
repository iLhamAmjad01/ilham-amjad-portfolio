const env = require('../config/env');
const { log } = require('../utils/logger');

/**
 * Global error handling middleware.
 * Catches all errors thrown in routes/controllers.
 */
const errorHandler = (err, req, res, next) => {
  log.error(`${err.name}: ${err.message}`);

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
    });
  }

  // Default server error — never expose internals in production
  res.status(err.statusCode || 500).json({
    success: false,
    message: env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
};

module.exports = errorHandler;
