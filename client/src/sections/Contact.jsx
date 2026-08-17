/**
 * Contact section — premium contact form and info cards.
 * Split layout with info cards on left, form panel on right,
 * scroll-reveal animations, and backend API form submission via Resend.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiCheck,
  FiAlertCircle,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

/* ─── Contact info ─── */
const CONTACT_ITEMS = [
  {
    id: 'email',
    label: 'Email',
    value: 'ilhamamjad4050@gmail.com',
    href: 'mailto:ilhamamjad4050@gmail.com',
    Icon: FiMail,
    accent: '#5B6CFF',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+92 344 983 2866',
    href: 'https://wa.me/923449832866',
    Icon: FaWhatsapp,
    accent: '#8B7CFF',
    external: true,
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Islamabad, Pakistan',
    href: null,
    Icon: FiMapPin,
    accent: '#6C5CE7',
  },
];

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Initial form state ─── */
const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

/* ─── Contact Info Card ─── */
const ContactCard = ({ item, index }) => {
  const { label, value, href, Icon, accent, external } = item;

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? {
        href,
        ...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {}),
      }
    : {};

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      custom={index + 3}
    >
      <Wrapper
        {...wrapperProps}
        className="group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300"
        style={{
          background: '#0B111C',
          border: '1px solid rgba(148,163,184,0.1)',
          textDecoration: 'none',
          cursor: href ? 'pointer' : 'default',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${accent}35`;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-105"
          style={{
            background: `${accent}0D`,
            border: `1px solid ${accent}25`,
          }}
        >
          <Icon
            className="w-5 h-5 sm:w-[22px] sm:h-[22px]"
            style={{ color: accent }}
          />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p
            className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase"
            style={{ color: '#6B7280' }}
          >
            {label}
          </p>
          <p
            className="mt-0.5 text-[13px] sm:text-sm font-semibold truncate"
            style={{ color: '#E2E8F0' }}
          >
            {value}
          </p>
        </div>
      </Wrapper>
    </motion.div>
  );
};

/* ─── Form Input ─── */
const FormField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  className = '',
  ...props
}) => {
  const isTextarea = type === 'textarea';
  const Tag = isTextarea ? 'textarea' : 'input';

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase mb-2 sm:mb-2.5"
        style={{ color: '#6B7280' }}
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={isTextarea ? undefined : type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-[13px] sm:text-sm font-medium transition-all duration-300 outline-none ${
          isTextarea ? 'resize-none min-h-[120px] sm:min-h-[140px]' : ''
        }`}
        style={{
          background: '#0B111C',
          border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(148,163,184,0.1)'}`,
          color: '#E2E8F0',
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91,108,255,0.08)';
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
        {...props}
      />
      {error && (
        <p
          className="mt-1.5 text-[10px] sm:text-[11px] font-medium flex items-center gap-1"
          style={{ color: '#EF4444' }}
        >
          <FiAlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════ */
const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const errs = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid email format';
    }
    if (!subject || subject.length < 2) errs.subject = 'Subject must be at least 2 characters';
    if (!message || message.length < 3) errs.message = 'Message must be at least 3 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (sending) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setApiError('');
    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Use the first validation error if present, otherwise the message
        const msg =
          (data.errors && data.errors.length > 0)
            ? data.errors[0]
            : (data.message || 'Something went wrong');
        throw new Error(msg);
      }

      // Success
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      // Show the real error message from the API.
      // Only fall back to a generic message for true network failures.
      const isNetworkError =
        err.message === 'Failed to fetch' ||
        err.message === 'Load failed' ||
        err.name === 'TypeError';
      setApiError(
        isNetworkError
          ? 'Unable to reach the server. Please check your connection and try again.'
          : err.message || 'Unable to send your message right now. Please try again later.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: '#090F1A' }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28">
        {/* ── Section Header ── */}
        <div className="relative mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.24em] uppercase"
            style={{ color: '#8B7CFF' }}
          >
            — LET'S CONNECT
          </motion.p>

          {/* Main heading */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-3 sm:mt-4 text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-[-0.02em]"
          >
            <span style={{ color: '#F3F4F6' }}>Let's Build Something</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
              }}
            >
              Great Together.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mt-4 sm:mt-5 text-[12px] sm:text-[13px] md:text-sm lg:text-[15px] leading-[1.7] sm:leading-[1.8] max-w-lg"
            style={{ color: '#9CA3AF' }}
          >
            Have a project in mind or looking for a developer to bring your
            vision to life? Let's discuss how we can build something
            meaningful together.
          </motion.p>

          {/* Decorative accents */}
          <div
            className="absolute -top-3 -right-2 sm:top-0 sm:right-4 md:right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full opacity-[0.06] pointer-events-none hidden sm:block"
            style={{ border: '2px solid #5B6CFF' }}
            aria-hidden="true"
          />
          <div
            className="absolute top-6 right-6 sm:top-8 sm:right-12 md:right-20 w-3 h-3 rounded-full opacity-[0.15] pointer-events-none hidden sm:block"
            style={{ backgroundColor: '#6C5CE7' }}
            aria-hidden="true"
          />
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* ── Left: Contact Info ── */}
          <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4">
            {CONTACT_ITEMS.map((item, i) => (
              <ContactCard key={item.id} item={item} index={i} />
            ))}

            {/* Availability indicator */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={7}
              className="mt-2 sm:mt-3 flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl"
              style={{
                background: 'rgba(91,108,255,0.04)',
                border: '1px solid rgba(91,108,255,0.1)',
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping"
                  style={{ backgroundColor: '#22C55E' }}
                />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span
                className="text-[11px] sm:text-xs font-semibold"
                style={{ color: '#94A3B8' }}
              >
                Available for freelance projects
              </span>
            </motion.div>
          </div>

          {/* ── Right: Form Panel ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            className="lg:col-span-3"
          >
            <div
              className="rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8"
              style={{
                background: '#0B111C',
                border: '1px solid rgba(148,163,184,0.1)',
              }}
            >
              {/* Form header */}
              <div className="mb-6 sm:mb-7 md:mb-8">
                <h3
                  className="text-base sm:text-lg md:text-xl font-bold"
                  style={{ color: '#F3F4F6' }}
                >
                  Send a Message
                </h3>
                <p
                  className="mt-1.5 text-[11px] sm:text-xs md:text-[13px]"
                  style={{ color: '#6B7280' }}
                >
                  Fill out the form below and I'll get back to you promptly.
                </p>
              </div>

              {/* Success message */}
              {submitted && (
                <div
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.2)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                    style={{
                      background: 'rgba(34,197,94,0.15)',
                    }}
                  >
                    <FiCheck className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p
                      className="text-[13px] sm:text-sm font-semibold"
                      style={{ color: '#86EFAC' }}
                    >
                      Message sent successfully!
                    </p>
                    <p
                      className="text-[10px] sm:text-[11px] mt-0.5"
                      style={{ color: '#6B7280' }}
                    >
                      I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {apiError && (
                <div
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                    style={{
                      background: 'rgba(239,68,68,0.15)',
                    }}
                  >
                    <FiAlertCircle className="w-4 h-4" style={{ color: '#FCA5A5' }} />
                  </div>
                  <p
                    className="text-[13px] sm:text-sm font-semibold"
                    style={{ color: '#FCA5A5' }}
                  >
                    {apiError}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <FormField
                    label="Full Name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>

                {/* Row 2: Subject */}
                <div className="mt-4 sm:mt-5">
                  <FormField
                    label="Subject"
                    id="subject"
                    value={form.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="Project inquiry"
                  />
                </div>

                {/* Row 3: Message */}
                <div className="mt-4 sm:mt-5">
                  <FormField
                    label="Message"
                    id="message"
                    type="textarea"
                    value={form.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder="Tell me about your project..."
                    rows={5}
                  />
                </div>

                {/* Submit button */}
                <div className="mt-6 sm:mt-7 md:mt-8">
                  <button
                    type="submit"
                    disabled={sending}
                    className="group/btn flex items-center gap-2.5 sm:gap-3 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-[12px] sm:text-[13px] md:text-sm font-bold tracking-[0.03em] transition-all duration-300 cursor-pointer"
                    style={{
                      background:
                        'linear-gradient(135deg, #5B6CFF 0%, #6C5CE7 100%)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(139,124,255,0.3)',
                      boxShadow: '0 4px 20px rgba(91,108,255,0.15)',
                      opacity: sending ? 0.7 : 1,
                      cursor: sending ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!sending) {
                        e.currentTarget.style.boxShadow =
                          '0 6px 30px rgba(91,108,255,0.25)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 4px 20px rgba(91,108,255,0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {sending ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12" cy="12" r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            opacity="0.25"
                          />
                          <path
                            d="M12 2a10 10 0 0 1 10 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Background decorations ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #5B6CFF 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[350px] h-[350px] rounded-full opacity-[0.025]"
          style={{
            background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  );
};

export default Contact;
