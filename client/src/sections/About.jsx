/**
 * About section — bio, philosophy, and technical skills.
 * "Developer System Dashboard" design — narrative column paired with
 * animated radial skill gauges in a 3×2 grid.
 */
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineChip } from 'react-icons/hi';

/* ─── Skills data ─── */
const SKILLS = [
  { name: 'HTML / CSS', pct: 90, color: '#5B6CFF' },
  { name: 'JavaScript', pct: 85, color: '#8B7CFF' },
  { name: 'React.js', pct: 80, color: '#6C5CE7' },
  { name: 'Node / Express', pct: 75, color: '#38BDF8' },
  { name: 'MongoDB / SQL', pct: 70, color: '#5B6CFF' },
  { name: 'UI/UX Design', pct: 78, color: '#8B7CFF' },
];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.12 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Animated radial gauge ─── */
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SkillGauge = ({ skill, index, isInView }) => {
  const [count, setCount] = useState(0);
  const targetPct = skill.pct;

  useEffect(() => {
    if (!isInView) return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(targetPct);
      return;
    }

    const delay = 200 + index * 120;
    const duration = 1200;
    let start = null;
    let raf;

    const timer = setTimeout(() => {
      const animate = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * targetPct));
        if (progress < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isInView, targetPct, index]);

  const strokeDashoffset = CIRCUMFERENCE - (count / 100) * CIRCUMFERENCE;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      custom={index + 3}
      className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl transition-colors duration-300 hover:bg-[rgba(91,108,255,0.04)]"
      style={{
        border: '1px solid rgba(148,163,184,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.22)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(148,163,184,0.08)';
      }}
    >
      {/* SVG Ring */}
      <div className="relative w-20 h-20 sm:w-[90px] sm:h-[90px] md:w-24 md:h-24">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full -rotate-90"
        >
          {/* Track */}
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none"
            stroke="rgba(148,163,184,0.08)"
            strokeWidth="5"
          />
          {/* Progress arc */}
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none"
            stroke={skill.color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.08s linear' }}
          />
        </svg>
        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-base sm:text-lg md:text-xl font-bold tabular-nums"
            style={{ color: '#F3F4F6' }}
          >
            {count}
            <span className="text-[10px] sm:text-xs font-medium" style={{ color: '#6B7280' }}>%</span>
          </span>
        </div>
      </div>

      {/* Skill name */}
      <span
        className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-center"
        style={{ color: '#9CA3AF' }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   ABOUT COMPONENT
   ═══════════════════════════════════════════ */
const About = () => {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: '#070B12' }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28">

        {/* ═══ TOP: About narrative ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-start">

          {/* ── Left column: Bio ── */}
          <div>
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
              — WHO I AM
            </motion.p>

            {/* Main heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="mt-3 sm:mt-4 text-[26px] sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-[1.1] tracking-[-0.02em]"
            >
              <span style={{ color: '#F3F4F6' }}>Building with{' '}</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
                }}
              >
                Intention
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="mt-5 sm:mt-6 md:mt-7 text-[12px] sm:text-[13px] md:text-sm lg:text-[15px] leading-[1.75] sm:leading-[1.8]"
              style={{ color: '#9CA3AF' }}
            >
              I'm a Full Stack Developer based in Pakistan, passionate about
              building modern, scalable, and high-performance digital
              experiences. I enjoy transforming ideas into clean interfaces and
              reliable backend systems.
            </motion.p>

            {/* Second paragraph */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="mt-3 sm:mt-4 text-[12px] sm:text-[13px] md:text-sm lg:text-[15px] leading-[1.75] sm:leading-[1.8]"
              style={{ color: '#9CA3AF' }}
            >
              Whether I'm architecting APIs, crafting responsive interfaces, or
              optimizing database queries, I bring the same attention to detail
              and commitment to building meaningful digital products.
            </motion.p>
          </div>

          {/* ── Right column: Quote panel ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="flex items-start lg:mt-16"
          >
            <div
              className="relative w-full rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8"
              style={{
                background: '#0B111C',
                border: '1px solid rgba(148,163,184,0.1)',
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 sm:top-7 sm:bottom-7 md:top-8 md:bottom-8 w-[3px] rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #6C5CE7, #5B6CFF)',
                }}
              />

              {/* Quote text */}
              <p
                className="pl-4 sm:pl-5 text-[13px] sm:text-sm md:text-[15px] lg:text-base leading-[1.7] sm:leading-[1.8] italic"
                style={{ color: '#CBD5E1' }}
              >
                "Clean code is not written for the machine — it's written for
                the next developer, and for yourself six months later."
              </p>

              {/* Quote label */}
              <div className="pl-4 sm:pl-5 mt-4 sm:mt-5 flex items-center gap-2">
                <div
                  className="w-4 h-px"
                  style={{ backgroundColor: 'rgba(99,102,241,0.4)' }}
                />
                <span
                  className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase"
                  style={{ color: '#6B7280' }}
                >
                  A philosophy I follow
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══ BOTTOM: Technical Skills Dashboard ═══ */}
        <div className="mt-16 sm:mt-20 md:mt-24" ref={skillsRef}>
          {/* Skills header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
          >
            <div
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg"
              style={{
                background: 'rgba(91,108,255,0.07)',
                border: '1px solid rgba(99,102,241,0.18)',
              }}
            >
              <HiOutlineChip
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5"
                style={{ color: '#8B7CFF' }}
              />
            </div>
            <div>
              <h3
                className="text-sm sm:text-base md:text-lg font-bold"
                style={{ color: '#F3F4F6' }}
              >
                Technical Proficiency
              </h3>
              <p
                className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.08em] sm:tracking-[0.1em] uppercase mt-0.5"
                style={{ color: '#6B7280' }}
              >
                Core Stack
              </p>
            </div>
          </motion.div>

          {/* Skills grid — radial gauges */}
          <div
            className="rounded-xl sm:rounded-2xl overflow-hidden p-1 sm:p-1.5"
            style={{
              background: '#0B111C',
              border: '1px solid rgba(148,163,184,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-1.5">
              {SKILLS.map((skill, i) => (
                <SkillGauge
                  key={skill.name}
                  skill={skill}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[15%] -right-32 w-[380px] h-[380px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #5B6CFF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[10%] -left-24 w-[300px] h-[300px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }}
        />
        {/* Grid line accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-[0.04] hidden lg:block"
          style={{ backgroundColor: '#5B6CFF' }}
        />
      </div>
    </section>
  );
};

export default About;
