/**
 * Projects section — featured project showcase.
 * Premium bento-inspired layout with asymmetric card sizes,
 * visual hierarchy for flagship projects, and scroll-reveal animations.
 */
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

/* ─── Project thumbnails ─── */
import imgAiifaBlogs from '../assets/images/projects/aiifa-blogs.jpg';
import imgWeatherApp from '../assets/images/projects/weather-app.jpg';
import imgDentalWeb from '../assets/images/projects/dental-web.jpg';
import imgPromixa from '../assets/images/projects/promixa.jpg';
import imgSchoolMgmt from '../assets/images/projects/school-mgmt.jpg';
import imgAleena from '../assets/images/projects/aleena-portfolio.jpg';
import imgMentor from '../assets/images/projects/mentor-software.jpg';
import imgBadar from '../assets/images/projects/badar-alqamar.jpg';

/* ─── Project data ─── */
const PROJECTS = [
  {
    id: 1,
    title: 'Aiifa Blogs',
    category: 'BLOG PLATFORM',
    description:
      'A modern blogging platform designed for creating, managing, and exploring blog content through a clean and user-friendly interface.',
    image: imgAiifaBlogs,
    technologies: ['React', 'JavaScript', 'CSS', 'Web Development'],
    github: 'https://github.com/iLhamAmjad01/Aiifa_Blogs.git',
    live: 'https://682049a7ee86c86b910f95dd--creative-cat-9deffd.netlify.app/',
  },
  {
    id: 2,
    title: 'Weather Application',
    category: 'WEB APPLICATION',
    description:
      'A responsive weather application that provides weather information through a clean and interactive user interface.',
    image: imgWeatherApp,
    technologies: ['JavaScript', 'Weather API', 'HTML', 'CSS'],
    github: 'https://github.com/iLhamAmjad01/weather-application',
    live: 'https://weather-application-delta-lovat.vercel.app/',
  },
  {
    id: 3,
    title: 'Dental Web',
    category: 'BUSINESS WEBSITE',
    description:
      'A modern and professional dental website designed to present dental services and provide a clean, user-friendly online experience.',
    image: imgDentalWeb,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    github: 'https://github.com/iLhamAmjad01/dental-web',
    live: 'https://spiffy-unicorn-29db7c.netlify.app/',
  },
  {
    id: 4,
    title: 'Promixa',
    category: 'AI-DRIVEN HEALTHCARE',
    description:
      'An AI-driven healthcare platform featuring intelligent assistance, predictive analytics, and modern digital solutions for healthcare-related experiences.',
    image: imgPromixa,
    technologies: ['Node.js', 'Express', 'MongoDB', 'AI', 'JavaScript'],
    github: 'https://github.com/iLhamAmjad01/promixa',
    live: 'https://promixa-store.onrender.com/index.html',
    featured: true,
  },
  {
    id: 5,
    title: 'AI-Powered School Management System',
    category: 'AI & FULL-STACK SYSTEM',
    description:
      'A comprehensive school management system featuring intelligent functionality, role-based dashboards, student and teacher management, attendance, examinations, and AI-powered capabilities.',
    image: imgSchoolMgmt,
    technologies: ['Node.js', 'Express', 'MongoDB', 'AI', 'JWT'],
    github:
      'https://github.com/iLhamAmjad01/AI-Powered-School-Management-System',
    live: 'https://peaceful-kataifi-b540f8.netlify.app/',
    featured: true,
  },
  {
    id: 6,
    title: 'Aleena Portfolio',
    category: 'PORTFOLIO WEBSITE',
    description:
      'A modern personal portfolio website designed to showcase professional work, skills, projects, and personal branding through a polished interface.',
    image: imgAleena,
    technologies: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
    github: 'https://github.com/iLhamAmjad01/aleena-portfolio',
    live: 'https://aleena-portfolio-steel.vercel.app/',
  },
  {
    id: 7,
    title: 'Mentor Software House',
    category: 'COMPANY WEBSITE',
    description:
      'A professional software house website created to showcase digital services, technical expertise, and modern technology solutions.',
    image: imgMentor,
    technologies: ['Web Development', 'Node.js', 'JavaScript', 'Responsive Design'],
    github: 'https://github.com/iLhamAmjad01/Mentor-software-house',
    live: 'https://mentor-software-house.onrender.com/',
  },
  {
    id: 8,
    title: 'Badar Al Qamar',
    category: 'BUSINESS PLATFORM',
    description:
      'A modern business website designed with a professional visual identity, responsive layout, and structured digital presence.',
    image: imgBadar,
    technologies: ['React', 'Vite', 'Node.js', 'MongoDB'],
    github: 'https://github.com/iLhamAmjad01/Badaralqamar',
    live: 'https://badaralqamar.vercel.app/',
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

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.2 + i * 0.07,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Project Card ─── */
const ProjectCard = ({ project, index, isFeatured = false }) => {
  const { title, category, description, image, technologies, github, live } =
    project;

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl h-full flex flex-col"
      style={{
        background: '#0B111C',
        border: '1px solid rgba(148,163,184,0.1)',
        transition: 'border-color 0.3s, transform 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isFeatured
          ? 'rgba(99,102,241,0.35)'
          : 'rgba(99,102,241,0.22)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden ${isFeatured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
        style={{
          borderBottom: '1px solid rgba(148,163,184,0.08)',
        }}
      >
        <img
          src={image}
          alt={`${title} — ${category}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Featured badge */}
        {isFeatured && (
          <div
            className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md"
            style={{
              background: 'rgba(91,108,255,0.85)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                style={{ backgroundColor: '#fff' }}
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.12em] uppercase text-white">
              Featured
            </span>
          </div>
        )}

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 40%, rgba(11,17,28,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        {/* Category */}
        <span
          className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase"
          style={{ color: '#8B7CFF' }}
        >
          {category}
        </span>

        {/* Title */}
        <h3
          className={`mt-2 sm:mt-2.5 font-bold leading-tight ${
            isFeatured
              ? 'text-base sm:text-lg md:text-xl lg:text-[22px]'
              : 'text-[14px] sm:text-[15px] md:text-base lg:text-lg'
          }`}
          style={{ color: '#F3F4F6' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`mt-2 sm:mt-2.5 leading-[1.7] flex-1 ${
            isFeatured
              ? 'text-[11px] sm:text-xs md:text-[13px]'
              : 'text-[10px] sm:text-[11px] md:text-xs'
          }`}
          style={{ color: '#9CA3AF' }}
        >
          {description}
        </p>

        {/* Technology tags */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-[0.04em] px-2 sm:px-2.5 py-1 rounded-md transition-colors duration-300"
              style={{
                color: '#94A3B8',
                background: 'rgba(148,163,184,0.06)',
                border: '1px solid rgba(148,163,184,0.08)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-[11px] font-semibold tracking-[0.03em] transition-all duration-300"
            style={{
              background: 'rgba(91,108,255,0.12)',
              border: '1px solid rgba(91,108,255,0.25)',
              color: '#E2E8F0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(91,108,255,0.22)';
              e.currentTarget.style.borderColor = 'rgba(91,108,255,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(91,108,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(91,108,255,0.25)';
            }}
          >
            <FiExternalLink
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
              style={{ color: '#8B7CFF' }}
            />
            Live Website
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-[11px] font-semibold tracking-[0.03em] transition-all duration-300"
            style={{
              background: 'rgba(148,163,184,0.06)',
              border: '1px solid rgba(148,163,184,0.1)',
              color: '#CBD5E1',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(148,163,184,0.12)';
              e.currentTarget.style.borderColor = 'rgba(148,163,184,0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(148,163,184,0.06)';
              e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)';
            }}
          >
            <FiGithub
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
              style={{ color: '#9CA3AF' }}
            />
            GitHub Code
          </a>
        </div>
      </div>

      {/* Subtle corner accent glow */}
      <div
        className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]"
        style={{
          background:
            'radial-gradient(circle at top right, #5B6CFF, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════ */
const Projects = () => {
  /* Separate featured from regular */
  const featured = PROJECTS.filter((p) => p.featured);
  const regular = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ background: '#070B12' }}
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
            — FEATURED WORK
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
            <span style={{ color: '#F3F4F6' }}>Featured </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
              }}
            >
              Projects
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mt-4 sm:mt-5 text-[12px] sm:text-[13px] md:text-sm lg:text-[15px] leading-[1.7] sm:leading-[1.8] max-w-xl"
            style={{ color: '#9CA3AF' }}
          >
            A selection of projects showcasing my work across web development,
            AI, full-stack systems, business platforms, and modern digital
            experiences.
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

        {/* ── Featured Projects — large cards (2 cols) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isFeatured
            />
          ))}
        </div>

        {/* ── Regular Projects — bento grid ──
             Desktop (lg): 12-col bento
             Row 1: 3 cards → 4+4+4
             Row 2: 3 cards → 5+3+4
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Row 1 */}
          <div className="sm:col-span-1 lg:col-span-4">
            <ProjectCard project={regular[0]} index={2} />
          </div>
          <div className="sm:col-span-1 lg:col-span-4">
            <ProjectCard project={regular[1]} index={3} />
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <ProjectCard project={regular[2]} index={4} />
          </div>

          {/* Row 2 */}
          <div className="sm:col-span-1 lg:col-span-5">
            <ProjectCard project={regular[3]} index={5} />
          </div>
          <div className="sm:col-span-1 lg:col-span-3">
            <ProjectCard project={regular[4]} index={6} />
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <ProjectCard project={regular[5]} index={7} />
          </div>
        </div>
      </div>

      {/* ── Background decorations ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-[15%] -right-32 w-[380px] h-[380px] rounded-full opacity-[0.035]"
          style={{
            background: 'radial-gradient(circle, #5B6CFF 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[10%] -left-24 w-[300px] h-[300px] rounded-full opacity-[0.025]"
          style={{
            background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)',
          }}
        />
        {/* Vertical grid accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-[0.03] hidden lg:block"
          style={{ backgroundColor: '#5B6CFF' }}
        />
      </div>
    </section>
  );
};

export default Projects;
