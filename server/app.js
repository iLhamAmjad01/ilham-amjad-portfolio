const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const corsOptions = require('./config/cors');
const { apiLimiter } = require('./middleware/rateLimiter');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

// Initialize Express app
const app = express();

// --------------- Security Middleware ---------------
app.use(helmet());
app.use(cors(corsOptions));

// --------------- Body Parsing ---------------
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// --------------- Rate Limiting ---------------
app.use('/api', apiLimiter);

// --------------- API Routes ---------------
app.use('/api', routes);

// --------------- Error Handling ---------------
app.use(notFound);
app.use(errorHandler);

module.exports = app;
