/**
 * Hero section — the landing/first-impression section.
 * Premium dark developer portfolio hero with two-column layout,
 * square profile card, floating badges, stats, and social links.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDownload,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiChevronDown,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import { IoRocketSharp } from 'react-icons/io5';
import profileImage from '../assets/images/ilham.profile.png';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../constants';

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.15 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const floatBadge = {
  animate: {
    y: [0, -9, 0],
    transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const floatBadgeAlt = {
  animate: {
    y: [0, 9, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};

/* ─── Blinking cursor ─── */
const Cursor = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className="inline-block w-[2px] h-[1.15em] ml-0.5 align-middle"
      style={{
        backgroundColor: '#22D3EE',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.08s',
      }}
    />
  );
};

/* ─── Decorative dot ─── */
const Dot = ({ className, size = 4, color = 'rgba(91,108,255,0.5)' }) => (
  <span
    className={`absolute rounded-full pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      boxShadow: `0 0 ${size * 3}px ${color}`,
    }}
  />
);

/* ─── Stats data ─── */
const STATS = [
  { value: '6-MO', label: 'YEARS EXP.' },
  { value: '05+', label: 'PROJECTS' },
  { value: '05+', label: 'CLIENTS' },
];

/* ─── Social icons ─── */
const HERO_SOCIALS = [
  { key: 'github', Icon: FiGithub, url: SOCIAL_LINKS.github },
  { key: 'linkedin', Icon: FiLinkedin, url: SOCIAL_LINKS.linkedin },
  { key: 'twitter', Icon: FiTwitter, url: SOCIAL_LINKS.twitter },
  { key: 'whatsapp', Icon: FaWhatsapp, url: 'https://wa.me/923449832866' },
];

/* ═══════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════ */
const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-0 lg:min-h-screen overflow-hidden flex items-start lg:items-center"
      style={{ background: '#070B12' }}
    >
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Large gradient orb — top right */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #5B6CFF 0%, transparent 70%)',
          }}
        />
        {/* Smaller orb — bottom left */}
        <div
          className="absolute -bottom-56 -left-56 w-[450px] h-[450px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)',
          }}
        />
        {/* Scattered glowing dots */}
        <Dot className="top-[18%] right-[14%]" size={5} color="rgba(91,108,255,0.35)" />
        <Dot className="top-[32%] right-[7%]" size={3} color="rgba(108,92,231,0.3)" />
        <Dot className="bottom-[28%] left-[6%]" size={4} color="rgba(91,108,255,0.25)" />
        <Dot className="top-[55%] right-[28%]" size={3} color="rgba(139,124,255,0.2)" />
        <Dot className="top-[12%] left-[38%]" size={3} color="rgba(34,211,238,0.25)" />

        {/* Thin decorative ring — right side */}
        <div
          className="absolute top-[20%] right-[5%] w-24 h-24 rounded-full border opacity-[0.06] hidden lg:block"
          style={{ borderColor: '#5B6CFF' }}
        />
        {/* Small circle accent */}
        <div
          className="absolute bottom-[18%] right-[10%] w-3 h-3 rounded-full opacity-[0.15] hidden lg:block"
          style={{ backgroundColor: '#6C5CE7' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-14 xl:px-16 pt-20 sm:pt-22 lg:pt-24 pb-16 lg:pb-0">
        <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-20">

          {/* ══════════════════════════════
              LEFT COLUMN — Text Content
              ══════════════════════════════ */}
          <div className="flex-1 min-w-0 lg:max-w-[580px] order-1">

            {/* ── Availability Badge ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span
                className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-[8px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.14em] uppercase select-none"
                style={{
                  background: 'rgba(10,15,24,0.85)',
                  border: '1px solid rgba(99,102,241,0.22)',
                  color: '#9CA3B5',
                }}
              >
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for new projects
              </span>
            </motion.div>

            {/* ── Main Heading ── */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-3 sm:mt-5 md:mt-7 lg:mt-8 leading-[1.02] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(1.35rem, 5.5vw, 5.2rem)',
                fontWeight: 800,
              }}
            >
              <span style={{ color: '#F3F4F6' }}>Ilham</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
                }}
              >
                Amjad.
              </span>
            </motion.h1>

            {/* ── Developer Role ── */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-2 sm:mt-3 md:mt-5 text-[10px] sm:text-xs md:text-sm lg:text-[15px] font-mono tracking-[0.04em] sm:tracking-[0.06em]"
              style={{ color: '#22D3EE' }}
            >
              <span className="opacity-70 mr-1">{'>'}</span>
              Full Stack Developer ,React developer , Web Designer , Seo Specalist, AI Automation Engineer,Ios Developer, App Developer
              <Cursor />
            </motion.p>

            {/* ── Description ── */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-2 sm:mt-4 md:mt-6 text-[9px] sm:text-xs md:text-sm lg:text-[15px] leading-[1.5] sm:leading-[1.6] md:leading-[1.8] max-w-[480px]"
              style={{ color: '#A8AFBD' }}
            >
              Full Stack Developer crafting high-performance web
              experiences — from elegant interfaces to robust backend
              architecture. Based in Islamabad, Pakistan.
            </motion.p>

            {/* ── Stats ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-3 sm:mt-5 md:mt-7 lg:mt-9 flex items-center"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  {i > 0 && (
                    <div
                      className="w-px h-6 sm:h-8 md:h-11 mx-2 sm:mx-4 md:mx-5 lg:mx-8"
                      style={{ backgroundColor: 'rgba(99,102,241,0.18)' }}
                    />
                  )}
                  <div>
                    <div
                      className="text-sm sm:text-xl md:text-[26px] lg:text-3xl font-bold leading-none"
                      style={{ color: '#F3F4F6' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="mt-0.5 sm:mt-1 md:mt-1.5 text-[7px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.16em] uppercase"
                      style={{ color: '#6B7280' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── Buttons ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-3 sm:mt-5 md:mt-7 lg:mt-9 flex flex-wrap items-center gap-2 sm:gap-3 md:gap-3.5"
            >
              {/* Primary */}
              <a
                href={PERSONAL_INFO.resumeUrl || '#'}
                download
                className="group inline-flex items-center gap-1.5 sm:gap-2 md:gap-2.5 px-3 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3.5 rounded-full text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(91,108,255,0.25)] hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #6C5CE7 0%, #5B6CFF 100%)',
                }}
              >
                <FiDownload className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Download CV
              </a>

              {/* Secondary */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 sm:gap-2 md:gap-2.5 px-3 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3.5 rounded-full text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm font-semibold transition-all duration-300 active:scale-[0.97]"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(99,102,241,0.22)',
                  color: '#D1D5DB',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                  e.currentTarget.style.color = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.22)';
                  e.currentTarget.style.color = '#D1D5DB';
                }}
              >
                <FiMail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110" />
                Get in Touch
              </a>
            </motion.div>

            {/* ── Social Icons ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="mt-3 sm:mt-5 md:mt-7 flex items-center gap-1.5 sm:gap-2 md:gap-2.5"
            >
              {HERO_SOCIALS.map(({ key, Icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg transition-all duration-300 hover:scale-110"
                  style={{
                    background: '#0D1524',
                    border: '1px solid rgba(99,102,241,0.12)',
                    color: '#6B7280',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)';
                    e.currentTarget.style.color = '#8B7CFF';
                    e.currentTarget.style.background = 'rgba(91,108,255,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.12)';
                    e.currentTarget.style.color = '#6B7280';
                    e.currentTarget.style.background = '#0D1524';
                  }}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ══════════════════════════════
              RIGHT COLUMN — Profile Card
              ══════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="relative flex-shrink-0 order-2 w-[38%] sm:w-[40%] md:w-[42%] max-w-[420px]"
          >
            {/* Square profile image container */}
            <div
              className="relative w-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '1 / 1',
                backgroundColor: '#070B12',
                border: '1px solid rgba(99,102,241,0.2)',
                boxShadow:
                  '0 0 80px rgba(91,108,255,0.06), 0 25px 60px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={profileImage}
                alt="Ilham Amjad"
                className="w-full h-full object-cover object-[center_15%]"
                loading="eager"
                draggable={false}
              />
              {/* Very subtle top edge glow */}
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 10%, rgba(139,124,255,0.25) 50%, transparent 90%)',
                }}
              />
            </div>

            {/* ── Floating Badge: Experience (top-right) ── */}
            <motion.div
              variants={floatBadge}
              animate="animate"
              className="absolute -top-2 -right-1 sm:-top-3 sm:-right-3 md:-top-5 md:-right-4 lg:-right-7 z-20"
            >
              <div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2.5 md:py-3.5 rounded-lg sm:rounded-xl"
                style={{
                  background: 'rgba(13,21,36,0.95)',
                  border: '1px solid rgba(99,102,241,0.18)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg"
                  style={{
                    background: 'rgba(91,108,255,0.1)',
                    color: '#8B7CFF',
                  }}
                >
                  <HiCode className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <div
                    className="text-xs sm:text-sm md:text-xl font-bold leading-none"
                    style={{ color: '#F3F4F6' }}
                  >
                    3+
                  </div>
                  <div
                    className="mt-0.5 sm:mt-1 text-[6px] sm:text-[8px] md:text-[10px] font-semibold tracking-[0.04em] sm:tracking-[0.08em] uppercase"
                    style={{ color: '#6B7280' }}
                  >
                    Years Experience
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Floating Badge: Projects (bottom-left) ── */}
            <motion.div
              variants={floatBadgeAlt}
              animate="animate"
              className="absolute -bottom-2 -left-1 sm:-bottom-3 sm:-left-3 md:-bottom-5 md:-left-4 lg:-left-7 z-20"
            >
              <div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2.5 md:py-3.5 rounded-lg sm:rounded-xl"
                style={{
                  background: 'rgba(13,21,36,0.95)',
                  border: '1px solid rgba(99,102,241,0.18)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg"
                  style={{
                    background: 'rgba(108,92,231,0.1)',
                    color: '#8B7CFF',
                  }}
                >
                  <IoRocketSharp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <div
                    className="text-xs sm:text-sm md:text-xl font-bold leading-none"
                    style={{ color: '#F3F4F6' }}
                  >
                    20+
                  </div>
                  <div
                    className="mt-0.5 sm:mt-1 text-[6px] sm:text-[8px] md:text-[10px] font-semibold tracking-[0.04em] sm:tracking-[0.08em] uppercase"
                    style={{ color: '#6B7280' }}
                  >
                    Projects Shipped
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiChevronDown className="w-4 h-4" style={{ color: '#5a6175' }} />
        </motion.div>
        <span
          className="text-[9px] font-semibold tracking-[0.22em] uppercase"
          style={{ color: '#4B5563' }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
