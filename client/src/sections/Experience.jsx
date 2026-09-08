/**
 * Experience section — Work history grid + Internship card.
 * Premium 2×3 connected panel layout with hover effects,
 * large decorative numbers, scroll-reveal animations,
 * and a dedicated Internship & Training subsection.
 */
import { motion } from 'framer-motion';
import {
  HiCode,
  HiOutlineServer,
  HiOutlineCube,
  HiOutlinePencil,
  HiOutlineTemplate,
  HiOutlineTerminal,
  HiOutlineBriefcase,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineBadgeCheck,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

/* ─── Experience data ─── */
const EXPERIENCES = [
  {
    num: '01',
    title: 'HTML / CSS Developer',
    desc: 'Crafting semantic, accessible, and pixel-perfect interfaces with modern CSS, responsive layouts, and clean frontend structure.',
    Icon: HiCode,
  },
  {
    num: '02',
    title: 'Node.js Developer',
    desc: 'Building scalable backend services, REST APIs, authentication systems, and reliable server-side application architecture.',
    Icon: HiOutlineServer,
  },
  {
    num: '03',
    title: 'React Developer',
    desc: 'Developing reusable, component-driven interfaces with modern React patterns, clean state management, and responsive user experiences.',
    Icon: HiOutlineCube,
  },
  {
    num: '04',
    title: 'UI/UX Designer',
    desc: 'Designing intuitive and visually polished digital experiences with a strong focus on hierarchy, usability, and consistency.',
    Icon: HiOutlinePencil,
  },
  {
    num: '05',
    title: 'Web Designer',
    desc: 'Creating modern, responsive, and visually engaging websites that balance strong design, usability, and performance.',
    Icon: HiOutlineTemplate,
  },
  {
    num: '06',
    title: 'Full Stack Developer',
    desc: 'Building complete web applications from polished frontend interfaces to scalable backend APIs, databases, and deployment.',
    Icon: HiOutlineTerminal,
  },
];

/* ─── Internship data ─── */
const INTERNSHIP = {
  org: 'Arch Technologies',
  position: 'Web Development Intern',
  email: 'archtechnologies.pk@gmail.com',
  period: '1 July 2026 – 30 August 2026',
  duration: '8 Weeks',
  type: 'Internship & Training Program',
  focus: 'Web Development',
  bullets: [
    'Completed practical, project-based assignments aligned with real-world web development workflows.',
    'Engaged with structured learning resources covering frontend development fundamentals and best practices.',
    'Gained hands-on exposure to industry-relevant processes within a professional organisational environment.',
  ],
};

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

/* ─── Single experience card ─── */
const ExperienceCard = ({ item, index }) => {
  const { num, title, desc, Icon } = item;
  const isLeftCol = index % 2 === 0;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      className={[
        'group relative overflow-hidden transition-colors duration-300',
        'hover:bg-[#0f1729]',
        /* borders — shared edges */
        'border-b border-[rgba(148,163,184,0.12)]',
        /* right border on left-column items (desktop only) */
        isLeftCol ? 'md:border-r' : '',
        /* remove bottom border on last row */
        index >= 4 ? 'border-b-0' : '',
      ].join(' ')}
      style={{ borderColor: 'rgba(148,163,184,0.12)' }}
    >
      <div className="relative px-5 py-7 sm:px-7 sm:py-9 md:px-9 md:py-10 lg:px-10 lg:py-12">
        {/* Large background number */}
        <span
          className="absolute top-3 right-4 sm:top-4 sm:right-6 md:top-5 md:right-8 text-[64px] sm:text-[80px] md:text-[96px] lg:text-[110px] font-black leading-none select-none pointer-events-none"
          style={{ color: 'rgba(91,108,255,0.045)' }}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Icon */}
        <div
          className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg transition-all duration-300 group-hover:border-[rgba(99,102,241,0.35)]"
          style={{
            background: 'rgba(91,108,255,0.07)',
            border: '1px solid rgba(99,102,241,0.18)',
          }}
        >
          <Icon
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] md:w-6 md:h-6 transition-colors duration-300"
            style={{ color: '#8B7CFF' }}
          />
        </div>

        {/* Title */}
        <h3
          className="relative z-10 mt-4 sm:mt-5 md:mt-6 text-[15px] sm:text-base md:text-lg lg:text-xl font-bold leading-tight"
          style={{ color: '#F3F4F6' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="relative z-10 mt-2 sm:mt-3 text-[11px] sm:text-xs md:text-[13px] lg:text-sm leading-[1.65] sm:leading-[1.7] md:leading-[1.8] max-w-[380px]"
          style={{ color: '#9CA3AF' }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

/* ─── Internship Card ─── */
const InternshipCard = () => {
  const { org, position, email, period, duration, type, bullets } = INTERNSHIP;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={3}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl"
      style={{
        background: '#0B111C',
        border: '1px solid rgba(148,163,184,0.12)',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s',
      }}
      whileHover={{
        borderColor: 'rgba(99,102,241,0.35)',
        boxShadow: '0 30px 90px rgba(91,108,255,0.1)',
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-xl"
        style={{ background: 'linear-gradient(90deg, #6C5CE7 0%, #8B7CFF 50%, #5B6CFF 100%)' }}
        aria-hidden="true"
      />

      <div className="relative px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12 lg:py-11">
        {/* Header row: icon + org/position */}
        <div className="flex items-start gap-4">
          {/* Briefcase icon */}
          <div
            className="flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg"
            style={{
              background: 'rgba(91,108,255,0.07)',
              border: '1px solid rgba(99,102,241,0.22)',
            }}
          >
            <HiOutlineBriefcase className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#8B7CFF' }} />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className="text-base sm:text-lg md:text-xl font-bold leading-tight truncate"
              style={{ color: '#F3F4F6' }}
            >
              {position}
            </h3>
            <p className="mt-0.5 text-[13px] sm:text-sm font-semibold" style={{ color: '#8B7CFF' }}>
              {org}
            </p>
          </div>
        </div>

        {/* Meta chips row */}
        <div className="mt-5 flex flex-wrap gap-2">
          {/* Calendar */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium"
            style={{
              background: 'rgba(91,108,255,0.08)',
              border: '1px solid rgba(99,102,241,0.18)',
              color: '#A5B4FC',
            }}
          >
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            {period}
          </span>

          {/* Duration */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium"
            style={{
              background: 'rgba(91,108,255,0.08)',
              border: '1px solid rgba(99,102,241,0.18)',
              color: '#A5B4FC',
            }}
          >
            <HiOutlineBadgeCheck className="w-3.5 h-3.5" />
            {duration}
          </span>

          {/* Type */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium"
            style={{
              background: 'rgba(108,92,231,0.1)',
              border: '1px solid rgba(108,92,231,0.22)',
              color: '#C4B5FD',
            }}
          >
            {type}
          </span>
        </div>

        {/* Divider */}
        <div
          className="my-5 h-px"
          style={{ background: 'rgba(148,163,184,0.1)' }}
          aria-hidden="true"
        />

        {/* Bullet points */}
        <ul className="space-y-2.5">
          {bullets.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <HiOutlineCheckCircle
                className="flex-shrink-0 w-4 h-4 mt-0.5"
                style={{ color: '#8B7CFF' }}
              />
              <span
                className="text-[12px] sm:text-[13px] md:text-sm leading-[1.7]"
                style={{ color: '#9CA3AF' }}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div
          className="mt-5 mb-4 h-px"
          style={{ background: 'rgba(148,163,184,0.1)' }}
          aria-hidden="true"
        />

        {/* Email row */}
        <div className="flex items-center gap-2">
          <HiOutlineMail className="flex-shrink-0 w-4 h-4" style={{ color: '#8B7CFF' }} />
          <a
            href={`mailto:${email}`}
            id="internship-email-link"
            className="text-[12px] sm:text-[13px] font-medium transition-colors duration-200"
            style={{ color: '#A5B4FC' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C4B5FD')}
            onMouseLeave={e => (e.currentTarget.style.color = '#A5B4FC')}
          >
            {email}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   EXPERIENCE COMPONENT
   ═══════════════════════════════════════════ */
const Experience = () => {
  return (
    <section
      id="experience"
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
            — WORK HISTORY
          </motion.p>

          {/* Main heading */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-3 sm:mt-4 text-[28px] sm:text-4xl md:text-[42px] lg:text-5xl font-extrabold leading-[1.1] tracking-[-0.02em]"
          >
            <span style={{ color: '#F3F4F6' }}>Work </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
              }}
            >
              Experience
            </span>
          </motion.h2>

          {/* Decorative circle accent */}
          <div
            className="absolute -top-3 -right-2 sm:top-0 sm:right-4 md:right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full opacity-[0.06] pointer-events-none hidden sm:block"
            style={{
              border: '2px solid #5B6CFF',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-6 right-6 sm:top-8 sm:right-12 md:right-20 w-3 h-3 rounded-full opacity-[0.15] pointer-events-none hidden sm:block"
            style={{ backgroundColor: '#6C5CE7' }}
            aria-hidden="true"
          />
        </div>

        {/* ── Experience Grid Panel ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="rounded-xl sm:rounded-2xl overflow-hidden"
          style={{
            background: '#0B111C',
            border: '1px solid rgba(148,163,184,0.12)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {EXPERIENCES.map((item, i) => (
              <ExperienceCard key={item.num} item={item} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Internship & Training Subsection ── */}
        <div className="mt-14 sm:mt-16 md:mt-20">
          {/* Sub-header */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.24em] uppercase"
            style={{ color: '#8B7CFF' }}
          >
            — INTERNSHIP &amp; TRAINING
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-3 mb-7 sm:mb-8 md:mb-10 text-[22px] sm:text-3xl md:text-[34px] lg:text-4xl font-extrabold leading-[1.15] tracking-[-0.02em]"
          >
            <span style={{ color: '#F3F4F6' }}>Industry </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
              }}
            >
              Internship
            </span>
          </motion.h2>

          <InternshipCard />
        </div>
      </div>

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #5B6CFF 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[350px] h-[350px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }}
        />
      </div>
    </section>
  );
};

export default Experience;
