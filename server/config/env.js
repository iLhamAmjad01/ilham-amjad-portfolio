const dotenv = require('dotenv');
const path = require('path');

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Environment variables with defaults
const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  // Resend
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
  EMAIL_TO: process.env.EMAIL_TO || 'ilhamamjad4050@gmail.com',
};

// Validate required variables
const requiredVars = ['RESEND_API_KEY'];

const missing = requiredVars.filter((key) => !env[key]);
if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

module.exports = env;
