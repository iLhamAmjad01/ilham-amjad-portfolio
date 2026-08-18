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
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#070A12;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;word-break:break-word;">
  <!-- Preview Text -->
  <div style="display:none;font-size:1px;color:#070A12;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    New inquiry from \${esc(name)} via your portfolio...
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#070A12;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#0D111D;border-radius:16px;border:1px solid #1E293B;box-shadow:0 10px 30px rgba(0,0,0,0.5),0 0 40px rgba(99,102,241,0.05);overflow:hidden;">
          
          <!-- Brand & Header -->
          <tr>
            <td style="padding:40px 40px 30px;background:radial-gradient(120% 100% at 50% 0%, rgba(99,102,241,0.15) 0%, rgba(7,10,18,0) 100%);">
              <!-- Indicator & Name -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="width:8px;height:8px;background-color:#10D9A0;border-radius:50%;box-shadow:0 0 8px rgba(16,217,160,0.5);"></td>
                  <td style="padding-left:10px;font-size:12px;font-weight:600;color:#E2E8F0;letter-spacing:1px;text-transform:uppercase;">Ilham Amjad</td>
                </tr>
              </table>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#F8FAFC;letter-spacing:-0.02em;">New Portfolio Inquiry</h1>
              <p style="margin:10px 0 0;font-size:14px;color:#94A3B8;line-height:1.5;">Someone reached out via your portfolio contact form.</p>
            </td>
          </tr>
          
          <!-- Contact Details -->
          <tr>
            <td style="padding:10px 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="50%" style="padding-bottom:24px;vertical-align:top;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94A3B8;">Name</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#F8FAFC;">\${esc(name)}</p>
                  </td>
                  <td width="50%" style="padding-bottom:24px;vertical-align:top;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94A3B8;">Email</p>
                    <p style="margin:0;font-size:15px;font-weight:600;"><a href="mailto:\${esc(email)}" style="color:#06B6D4;text-decoration:none;">\${esc(email)}</a></p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-bottom:24px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94A3B8;">Subject</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#F8FAFC;">\${esc(subject || 'No Subject')}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Message Body -->
          <tr>
            <td style="padding:0 40px 40px;">
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94A3B8;">Message</p>
              <div style="margin:0;padding:24px;background-color:#070A12;border-radius:12px;border:1px solid #1E293B;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#E2E8F0;white-space:pre-wrap;">\${esc(message)}</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background-color:#0A0E17;border-top:1px solid #1E293B;text-align:center;">
              <p style="margin:0;font-size:12px;color:#64748B;line-height:1.5;">Sent from Ilham Amjad's portfolio contact form <span style="color:#6366F1;margin:0 4px;">&lt;/&gt;</span></p>
              <p style="margin:8px 0 0;font-size:12px;color:#64748B;">Hit <strong style="color:#94A3B8;">Reply</strong> to respond directly</p>
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
