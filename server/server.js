const app = require('./app');
const env = require('./config/env');
const { log } = require('./utils/logger');

// Start server
const startServer = async () => {
  try {
    app.listen(env.PORT, () => {
      log.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      log.info(`API available at http://localhost:${env.PORT}/api`);
    });
  } catch (error) {
    log.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
