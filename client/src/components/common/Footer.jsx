/**
 * Footer — premium multi-column footer with branding, navigation,
 * services, contact info, social links, and copyright bar.
 */
import { motion } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiArrowUp,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../../constants';

/* ─── Footer nav links ─── */
const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Experience', id: 'experience' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

/* ─── Footer service list ─── */
const SERVICE_ITEMS = [
  'Web Development',
  'UI / UX Design',
  'Mobile Development',
  'WordPress Development',
  'SEO & Performance',
  'AI Solutions',
];

/* ─── Social icons map ─── */
const SOCIAL_ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  instagram: FiInstagram,
};

/* ─── Smooth scroll handler ─── */
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.05 + i * 0.06,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Footer link style ─── */
const linkStyle = {
  color: '#6B7280',
  textDecoration: 'none',
  transition: 'color 0.25s',
};

/* ═══════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════ */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{ background: '#060A11' }}
    >
      {/* Top accent divider */}
      <div
        className="w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(91,108,255,0.2) 30%, rgba(139,124,255,0.35) 50%, rgba(91,108,255,0.2) 70%, transparent 95%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-6 sm:pb-8">
        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8">
          {/* ─ Col 1: Branding ─ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="sm:col-span-2 lg:col-span-4"
          >
            {/* Name */}
            <h3 className="text-lg sm:text-xl md:text-[22px] font-extrabold tracking-[-0.01em]">
              <span style={{ color: '#F3F4F6' }}>Ilham </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #6C5CE7, #5B6CFF)',
                }}
              >
                Amjad
              </span>
            </h3>

            {/* Description */}
            <p
              className="mt-3 sm:mt-4 text-[11px] sm:text-xs md:text-[13px] leading-[1.75] sm:leading-[1.8] max-w-xs"
              style={{ color: '#6B7280' }}
            >
              Full Stack Developer crafting modern digital experiences
              through clean engineering and thoughtful design.
            </p>

            {/* Social links */}
            <div className="mt-5 sm:mt-6 flex items-center gap-2 sm:gap-2.5">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-all duration-300"
                    style={{
                      background: '#0B111C',
                      border: '1px solid rgba(148,163,184,0.1)',
                      color: '#6B7280',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(99,102,241,0.35)';
                      e.currentTarget.style.color = '#8B7CFF';
                      e.currentTarget.style.background =
                        'rgba(91,108,255,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(148,163,184,0.1)';
                      e.currentTarget.style.color = '#6B7280';
                      e.currentTarget.style.background = '#0B111C';
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* ─ Col 2: Quick Links ─ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="lg:col-span-2"
          >
            <h4
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5"
              style={{ color: '#94A3B8' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-[12px] sm:text-[13px] font-medium transition-colors duration-250 cursor-pointer bg-transparent border-none p-0"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#C4B5FD';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6B7280';
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─ Col 3: Services ─ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="lg:col-span-3"
          >
            <h4
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5"
              style={{ color: '#94A3B8' }}
            >
              Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {SERVICE_ITEMS.map((service) => (
                <li key={service}>
                  <span
                    className="text-[12px] sm:text-[13px] font-medium"
                    style={{ color: '#6B7280' }}
                  >
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─ Col 4: Contact ─ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="lg:col-span-3"
          >
            <h4
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5"
              style={{ color: '#94A3B8' }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {/* Email */}
              <li className="flex items-center gap-3">
                <FiMail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: '#5B6CFF' }}
                />
                <a
                  href="mailto:ilhamamjad4050@gmail.com"
                  className="text-[12px] sm:text-[13px] font-medium transition-colors duration-250"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C4B5FD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6B7280';
                  }}
                >
                  ilhamamjad4050@gmail.com
                </a>
              </li>

              {/* Phone / WhatsApp */}
              <li className="flex items-center gap-3">
                <FaWhatsapp
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: '#8B7CFF' }}
                />
                <a
                  href="https://wa.me/923449832866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] sm:text-[13px] font-medium transition-colors duration-250"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C4B5FD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6B7280';
                  }}
                >
                  +92 344 983 2866
                </a>
              </li>

              {/* Location */}
              <li className="flex items-center gap-3">
                <FiMapPin
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: '#6C5CE7' }}
                />
                <span
                  className="text-[12px] sm:text-[13px] font-medium"
                  style={{ color: '#6B7280' }}
                >
                  Islamabad, Pakistan
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="mt-10 sm:mt-12 md:mt-14 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
          style={{
            borderTop: '1px solid rgba(148,163,184,0.08)',
          }}
        >
          <p
            className="text-[10px] sm:text-[11px] font-medium"
            style={{ color: '#4B5563' }}
          >
            © {currentYear} Ilham Amjad. All rights reserved.
          </p>

          <p
            className="text-[10px] sm:text-[11px] font-medium"
            style={{ color: '#4B5563' }}
          >
            Designed & Built by{' '}
            <span style={{ color: '#8B7CFF' }}>Ilham Amjad</span>
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-300 cursor-pointer"
            style={{
              background: '#0B111C',
              border: '1px solid rgba(148,163,184,0.1)',
              color: '#6B7280',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)';
              e.currentTarget.style.color = '#8B7CFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)';
              e.currentTarget.style.color = '#6B7280';
            }}
          >
            <FiArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Background decoration ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full opacity-[0.02]"
          style={{
            background:
              'radial-gradient(ellipse at bottom, #5B6CFF 0%, transparent 70%)',
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
