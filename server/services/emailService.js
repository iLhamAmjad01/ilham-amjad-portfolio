const { Resend } = require('resend');
const env = require('../config/env');
const { log } = require('../utils/logger');

/**
 * Email service using Resend.
 * Handles sending email notifications for contact form submissions.
 */

let resend = null;

/**
 * Initialize the Resend client.
 * Only creates the client if the API key is configured.
 */
const initResend = () => {
  if (!env.RESEND_API_KEY) {
    log.warn('Email not configured — RESEND_API_KEY missing. Emails will be skipped.');
    return null;
  }

  resend = new Resend(env.RESEND_API_KEY);
  return resend;
};

/**
 * Build a clean, professional HTML email body.
 * @param {object} data - { name, email, subject, message }
 * @returns {string} HTML string
 */
const buildEmailHtml = ({ name, email, subject, message }) => {
  // Escape HTML entities to prevent injection
  const esc = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#5B6CFF 0%,#6C5CE7 100%);padding:28px 32px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;">New Portfolio Inquiry</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Someone reached out via your portfolio contact form.</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px 32px;">
              <!-- Name -->
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6B7280;">Name</p>
              <p style="margin:0 0 20px;font-size:15px;color:#1F2937;">${esc(name)}</p>
              <!-- Email -->
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6B7280;">Email</p>
              <p style="margin:0 0 20px;font-size:15px;color:#1F2937;"><a href="mailto:${esc(email)}" style="color:#5B6CFF;text-decoration:none;">${esc(email)}</a></p>
              <!-- Subject -->
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6B7280;">Subject</p>
              <p style="margin:0 0 20px;font-size:15px;color:#1F2937;">${esc(subject || 'No Subject')}</p>
              <!-- Message -->
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6B7280;">Message</p>
              <div style="margin:0;padding:16px;background-color:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${esc(message)}</p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #f0f0f3;">
              <p style="margin:0;font-size:11px;color:#9CA3AF;text-align:center;">Sent from your portfolio contact form · Hit reply to respond directly</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Send a contact notification email via Resend.
 * @param {object} contactData - { name, email, subject, message }
 */
const sendContactEmail = async (contactData) => {
  if (!resend) {
    initResend();
  }

  if (!resend) {
    log.warn('Email skipped — Resend client not configured.');
    return false;
  }

  const toEmail = env.EMAIL_TO || 'ilhamamjad4050@gmail.com';
  const fromEmail = env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>';

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Portfolio Inquiry: ${contactData.subject || 'New Message'}`,
      replyTo: contactData.email,
      html: buildEmailHtml(contactData),
    });

    if (error) {
      log.error(`Resend API error: ${error.message}`);
      return false;
    }

    log.info(`Contact email sent (id: ${data?.id}) for: ${contactData.email}`);
    return true;
  } catch (error) {
    log.error(`Email sending failed: ${error.message}`);
    return false;
  }
};

module.exports = { sendContactEmail, initResend };
