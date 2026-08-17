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
