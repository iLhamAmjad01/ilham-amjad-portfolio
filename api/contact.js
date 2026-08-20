// api/contact.js — Vercel Serverless Function
// POST /api/contact — Contact form email handler
// Uses Resend to send email to the portfolio owner.

const { Resend } = require('resend');

/* ─────────────────────────────────────────────
   HTML Email Builder
   Ported from server/services/emailService.js
   ───────────────────────────────────────────── */

/**
 * Escape HTML entities to prevent injection.
 * @param {string} str
 * @returns {string}
 */
const esc = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Build a clean, professional HTML email body.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {string} HTML string
 */
const buildEmailHtml = ({ name, email, subject, message }) => `
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
  <!-- Preview Text (Hidden in body, visible in inbox) -->
  <div style="display:none;font-size:1px;color:#070A12;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    New inquiry from ${esc(name)} via your portfolio...
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
                    <p style="margin:0;font-size:15px;font-weight:600;color:#F8FAFC;">${esc(name)}</p>
                  </td>
                  <td width="50%" style="padding-bottom:24px;vertical-align:top;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94A3B8;">Email</p>
                    <p style="margin:0;font-size:15px;font-weight:600;"><a href="mailto:${esc(email)}" style="color:#06B6D4;text-decoration:none;">${esc(email)}</a></p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-bottom:24px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94A3B8;">Subject</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#F8FAFC;">${esc(subject || 'No Subject')}</p>
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
                <p style="margin:0;font-size:15px;line-height:1.6;color:#E2E8F0;white-space:pre-wrap;">${esc(message)}</p>
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

/* ─────────────────────────────────────────────
   Validation
   Mirrors logic from server/validators/contactValidator.js
   ───────────────────────────────────────────── */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate and sanitize contact form fields.
 * @param {{ name, email, subject, message }} body
 * @returns {{ errors: string[], data: object }}
 */
const validateContact = (body) => {
  const errors = [];
  const data = {};

  // name
  const name = (body.name || '').trim();
  if (!name) {
    errors.push('Name is required');
  } else if (name.length < 2 || name.length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  } else {
    data.name = name;
  }

  // email
  const email = (body.email || '').trim().toLowerCase();
  if (!email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address');
  } else {
    data.email = email;
  }

  // subject
  const subject = (body.subject || '').trim();
  if (!subject || subject.length < 2) {
    errors.push('Subject must be at least 2 characters');
  } else if (subject.length > 200) {
    errors.push('Subject must not exceed 200 characters');
  } else {
    data.subject = subject;
  }

  // message
  const message = (body.message || '').trim();
  if (!message || message.length < 3) {
    errors.push('Message must be at least 3 characters');
  } else if (message.length > 5000) {
    errors.push('Message must not exceed 5000 characters');
  } else {
    data.message = message;
  }

  return { errors, data };
};

/* ─────────────────────────────────────────────
   Serverless Handler
   ───────────────────────────────────────────── */

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // CORS headers (Vercel handles same-origin, but set for safety)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Validate inputs
  const { errors, data } = validateContact(req.body || {});
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      // First error becomes the primary message so clients can display it directly
      message: errors[0],
      errors,
    });
  }

  // Check Resend API key — never expose it to the client
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return res.status(500).json({
      success: false,
      message: 'Email service not configured. Please contact the site owner directly.',
    });
  }

  // Resolve email addresses from environment variables
  const toEmail =
    process.env.CONTACT_EMAIL ||
    process.env.EMAIL_TO ||
    'ilhamamjad4050@gmail.com';

  const fromEmail =
    process.env.EMAIL_FROM ||
    'Portfolio Contact <onboarding@resend.dev>';

  // Send via Resend
  try {
    const resend = new Resend(apiKey);

    const { data: resendData, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Portfolio Inquiry: ${data.subject}`,
      replyTo: data.email,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error('[contact] Resend API error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again later.',
      });
    }

    console.log(`[contact] Email sent (id: ${resendData?.id}) from: ${data.email}`);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (err) {
    console.error('[contact] Unexpected error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
};
