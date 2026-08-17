const env = require('../config/env');

/**
 * Simple logging utility.
 * Can be replaced with Winston or Pino in the future.
 */
const log = {
  info: (...args) => {
    console.log(`[INFO] [${new Date().toISOString()}]`, ...args);
  },

  warn: (...args) => {
    console.warn(`[WARN] [${new Date().toISOString()}]`, ...args);
  },

  error: (...args) => {
    console.error(`[ERROR] [${new Date().toISOString()}]`, ...args);
  },

  debug: (...args) => {
    if (env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] [${new Date().toISOString()}]`, ...args);
    }
  },
};

module.exports = { log };
