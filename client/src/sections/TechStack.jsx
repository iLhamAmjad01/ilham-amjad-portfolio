/**
 * TechStack section — technology ecosystem in an asymmetric bento layout.
 * Each category occupies a uniquely-sized panel; technologies appear as
 * compact icon-chips inside each module.
 */
import { motion } from 'framer-motion';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiGit,
  SiDocker,
  SiVercel,
  SiFigma,
  SiLinux,
} from 'react-icons/si';
import { HiOutlineGlobeAlt, HiOutlineStatusOnline } from 'react-icons/hi';
import { FiCloud } from 'react-icons/fi';

/* ─── Category data ─── */
const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    accent: '#5B6CFF',
    technologies: [
      { name: 'React', Icon: SiReact },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: '#8B7CFF',
    technologies: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express.js', Icon: SiExpress },
      { name: 'REST APIs', Icon: HiOutlineGlobeAlt },
      { name: 'WebSockets', Icon: HiOutlineStatusOnline },
      { name: 'JWT Auth', Icon: SiJsonwebtokens },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    accent: '#38BDF8',
    technologies: [
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'Redis', Icon: SiRedis },
      { name: 'Firebase', Icon: SiFirebase },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Cloud',
    accent: '#6C5CE7',
    technologies: [
      { name: 'Git', Icon: SiGit },
      { name: 'Docker', Icon: SiDocker },
      { name: 'Vercel', Icon: SiVercel },
      { name: 'AWS', Icon: FiCloud },
      { name: 'Figma', Icon: SiFigma },
      { name: 'Linux', Icon: SiLinux },
    ],
  },
];

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.1 + i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const chipReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Tech chip ─── */
const TechChip = ({ tech, accent }) => {
  const { name, Icon } = tech;

  return (
    <motion.div
      variants={chipReveal}
      className="group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(148,163,184,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${accent}08`;
        e.currentTarget.style.borderColor = `${accent}35`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        e.currentTarget.style.borderColor = 'rgba(148,163,184,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <Icon
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-colors duration-300"
        style={{ color: '#6B7280' }}
        onMouseEnter={() => {}}
      />
      <span
        className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.04em] whitespace-nowrap"
        style={{ color: '#9CA3AF' }}
      >
        {name}
      </span>
    </motion.div>
  );
};

/* ─── Category module panel ─── */
const CategoryModule = ({ category, index }) => {
  const { label, accent, technologies } = category;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      className="relative rounded-xl sm:rounded-2xl overflow-hidden h-full"
      style={{
        background: '#0B111C',
        border: '1px solid rgba(148,163,184,0.1)',
      }}
    >
      <div className="p-5 sm:p-6 md:p-7 h-full flex flex-col">
        {/* Module header */}
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Status dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping"
                style={{ backgroundColor: accent }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: accent }}
              />
            </span>
            <span
              className="text-xs sm:text-[13px] md:text-sm font-bold tracking-[0.02em]"
              style={{ color: '#F3F4F6' }}
            >
              {label}
            </span>
          </div>

          {/* Tech count */}
          <span
            className="text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-md"
            style={{
              color: accent,
              background: `${accent}0D`,
              border: `1px solid ${accent}20`,
            }}
          >
            {technologies.length}
          </span>
        </div>

        {/* Technology chips */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="flex flex-wrap gap-2 sm:gap-2.5"
        >
          {technologies.map((tech) => (
            <TechChip key={tech.name} tech={tech} accent={accent} />
          ))}
        </motion.div>
      </div>

      {/* Subtle corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at top right, ${accent}, transparent 70%)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   TECH STACK SECTION
   ═══════════════════════════════════════════ */
const TechStack = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#090F1A' }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28">

        {/* ── Section Header ── */}
        <div className="relative mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.24em] uppercase"
            style={{ color: '#8B7CFF' }}
          >
            — TECHNOLOGIES
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-3 sm:mt-4 text-[28px] sm:text-4xl md:text-[42px] lg:text-5xl font-extrabold leading-[1.1] tracking-[-0.02em]"
          >
            <span style={{ color: '#F3F4F6' }}>Tech </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
              }}
            >
              Stack
            </span>
          </motion.h2>

          {/* Decorative accents */}
          <div
            className="absolute -top-2 right-0 sm:right-6 md:right-12 w-14 h-14 sm:w-20 sm:h-20 rounded-full opacity-[0.05] pointer-events-none hidden sm:block"
            style={{ border: '2px solid #5B6CFF' }}
            aria-hidden="true"
          />
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Frontend — wide (spans 7 cols on lg) */}
          <div className="lg:col-span-7">
            <CategoryModule category={CATEGORIES[0]} index={0} />
          </div>

          {/* Backend — narrower (spans 5 cols on lg) */}
          <div className="lg:col-span-5">
            <CategoryModule category={CATEGORIES[1]} index={1} />
          </div>

          {/* Database — medium (spans 5 cols on lg) */}
          <div className="lg:col-span-5">
            <CategoryModule category={CATEGORIES[2]} index={2} />
          </div>

          {/* Tools & Cloud — wide (spans 7 cols on lg) */}
          <div className="lg:col-span-7">
            <CategoryModule category={CATEGORIES[3]} index={3} />
          </div>
        </div>
      </div>

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -bottom-32 -right-32 w-[350px] h-[350px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #5B6CFF 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[20%] -left-20 w-[280px] h-[280px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }}
        />
      </div>
    </section>
  );
};

export default TechStack;
