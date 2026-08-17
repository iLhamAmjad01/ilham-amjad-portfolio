const { sendContactEmail } = require('./emailService');
const { log } = require('../utils/logger');

/**
 * Contact service — business logic for contact form.
 * Sends an email notification via Resend.
 */

/**
 * Process a contact form submission and send notification email.
 * @param {object} data - { name, email, subject, message }
 * @returns {object} Result with success status
 */
const processContactMessage = async (data) => {
  log.info(`Contact message received from: ${data.email}`);

  // Send email notification
  const emailSent = await sendContactEmail(data);

  if (!emailSent) {
    throw new Error('Failed to send email notification');
  }

  return { success: true };
};

module.exports = { processContactMessage };
