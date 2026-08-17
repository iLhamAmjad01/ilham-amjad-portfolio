/**
 * Services section — premium bento-grid service offering.
 * 7 service cards in an asymmetric layout with staggered scroll-reveal,
 * hover micro-interactions, and WhatsApp CTA per card.
 */
import { motion } from 'framer-motion';
import {
  HiCode,
  HiOutlinePencil,
  HiOutlineDeviceMobile,
  HiOutlineSearch,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { SiWordpress } from 'react-icons/si';
import { FaApple, FaWhatsapp } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

/* ─── WhatsApp handler ─── */
const WHATSAPP_NUMBER = '923449832866';

const handleServiceInquiry = (serviceName) => {
  const message = `Hello Ilham, I'm interested in your ${serviceName} service. I would like to discuss my project.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

/* ─── Services data ─── */
const SERVICES = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Modern, responsive, and high-performance websites and web applications built with clean architecture and scalable technologies.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    Icon: HiCode,
    accent: '#5B6CFF',
  },
  {
    number: '02',
    title: 'UI / UX Design',
    description:
      'Clean, intuitive, and user-focused digital interfaces designed with strong visual hierarchy, usability, and consistency.',
    tags: ['Figma', 'Prototyping', 'Wireframes', 'Design Systems'],
    Icon: HiOutlinePencil,
    accent: '#8B7CFF',
  },
  {
    number: '03',
    title: 'Mobile Development',
    description:
      'Cross-platform mobile experiences focused on performance, usability, responsive interactions, and scalable application architecture.',
    tags: ['React Native', 'Android', 'Cross Platform', 'Mobile UI'],
    Icon: HiOutlineDeviceMobile,
    accent: '#6C5CE7',
  },
  {
    number: '04',
    title: 'WordPress Development',
    description:
      'Professional WordPress websites, custom layouts, business websites, landing pages, and optimized content management solutions.',
    tags: ['WordPress', 'Elementor', 'WooCommerce', 'Custom Themes'],
    Icon: SiWordpress,
    accent: '#38BDF8',
  },
  {
    number: '05',
    title: 'SEO & Performance',
    description:
      'Technical SEO, on-page optimization, performance improvements, metadata structure, and search-friendly website architecture.',
    tags: ['Technical SEO', 'On-Page SEO', 'Performance', 'Analytics'],
    Icon: HiOutlineSearch,
    accent: '#5B6CFF',
  },
  {
    number: '06',
    title: 'iOS Development',
    description:
      'Modern and user-focused mobile experiences designed for Apple devices with smooth interactions and high-quality interface standards.',
    tags: ['iOS', 'Swift', 'Apple UI', 'Mobile Apps'],
    Icon: FaApple,
    accent: '#8B7CFF',
  },
  {
    number: '07',
    title: 'AI Solutions',
    description:
      'AI-powered features and intelligent solutions including chatbots, automation, smart workflows, API integrations, and data-driven experiences.',
    tags: ['AI Integration', 'Chatbots', 'Automation', 'APIs'],
    Icon: HiOutlineSparkles,
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

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.15 + i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Service Card ─── */
const ServiceCard = ({ service, index, className = '' }) => {
  const { number, title, description, tags, Icon, accent } = service;

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl h-full ${className}`}
      style={{
        background: '#0B111C',
        border: '1px solid rgba(148,163,184,0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accent}35`;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="relative p-5 sm:p-6 md:p-7 lg:p-8 h-full flex flex-col">
        {/* Large background number */}
        <span
          className="absolute top-3 right-4 sm:top-4 sm:right-5 md:top-5 md:right-6 text-[56px] sm:text-[68px] md:text-[80px] lg:text-[90px] font-black leading-none select-none pointer-events-none"
          style={{ color: `${accent}08` }}
          aria-hidden="true"
        >
          {number}
        </span>

        {/* Icon box */}
        <div
          className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg transition-all duration-300 group-hover:scale-105"
          style={{
            background: `${accent}0D`,
            border: `1px solid ${accent}25`,
          }}
        >
          <Icon
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] md:w-6 md:h-6 transition-colors duration-300"
            style={{ color: accent }}
          />
        </div>

        {/* Number label */}
        <div className="relative z-10 mt-4 sm:mt-5 flex items-center gap-2.5">
          <span
            className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{ color: accent }}
          >
            {number}
          </span>
          <div
            className="h-px flex-1 max-w-[32px]"
            style={{ backgroundColor: `${accent}30` }}
          />
        </div>

        {/* Title */}
        <h3
          className="relative z-10 mt-2 sm:mt-2.5 text-[15px] sm:text-base md:text-lg lg:text-xl font-bold leading-tight"
          style={{ color: '#F3F4F6' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="relative z-10 mt-2.5 sm:mt-3 text-[11px] sm:text-xs md:text-[13px] leading-[1.7] sm:leading-[1.75] flex-1"
          style={{ color: '#9CA3AF' }}
        >
          {description}
        </p>

        {/* Tags */}
        <div className="relative z-10 mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] sm:text-[10px] font-semibold tracking-[0.06em] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md"
              style={{
                color: '#94A3B8',
                background: 'rgba(148,163,184,0.06)',
                border: '1px solid rgba(148,163,184,0.08)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => handleServiceInquiry(title)}
          className="relative z-10 mt-5 sm:mt-6 flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold tracking-[0.04em] transition-all duration-300 cursor-pointer group/btn w-fit"
          style={{
            background: `${accent}12`,
            border: `1px solid ${accent}25`,
            color: '#E2E8F0',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${accent}22`;
            e.currentTarget.style.borderColor = `${accent}45`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${accent}12`;
            e.currentTarget.style.borderColor = `${accent}25`;
          }}
        >
          <FaWhatsapp
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
            style={{ color: accent }}
          />
          <span>Inquire About Service</span>
          <FiArrowUpRight
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            style={{ color: accent }}
          />
        </button>
      </div>

      {/* Subtle corner accent glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
        style={{
          background: `radial-gradient(circle at top right, ${accent}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════ */
const Services = () => {
  return (
    <section
      id="services"
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
            — WHAT I OFFER
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
            <span style={{ color: '#F3F4F6' }}>My </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #6C5CE7 0%, #8B7CFF 45%, #5B6CFF 100%)',
              }}
            >
              Services
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
            Comprehensive digital solutions designed to turn ideas into
            scalable, high-performing, and meaningful digital products.
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

        {/* ── Bento Service Grid ──
             Desktop (lg): 12-col bento
             Row 1: 3 cards — 4 + 4 + 4
             Row 2: 2 cards — 5 + 7
             Row 3: 2 cards — 7 + 5
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Row 1 — three equal cards */}
          <div className="sm:col-span-1 lg:col-span-4">
            <ServiceCard service={SERVICES[0]} index={0} />
          </div>
          <div className="sm:col-span-1 lg:col-span-4">
            <ServiceCard service={SERVICES[1]} index={1} />
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <ServiceCard service={SERVICES[2]} index={2} />
          </div>

          {/* Row 2 — asymmetric: narrow + wide */}
          <div className="sm:col-span-1 lg:col-span-5">
            <ServiceCard service={SERVICES[3]} index={3} />
          </div>
          <div className="sm:col-span-1 lg:col-span-7">
            <ServiceCard service={SERVICES[4]} index={4} />
          </div>

          {/* Row 3 — asymmetric: wide + narrow */}
          <div className="sm:col-span-1 lg:col-span-7">
            <ServiceCard service={SERVICES[5]} index={5} />
          </div>
          <div className="sm:col-span-1 lg:col-span-5">
            <ServiceCard service={SERVICES[6]} index={6} />
          </div>
        </div>
      </div>

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #5B6CFF 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[350px] h-[350px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[45%] right-[15%] w-[250px] h-[250px] rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #8B7CFF 0%, transparent 70%)' }}
        />
      </div>
    </section>
  );
};

export default Services;
