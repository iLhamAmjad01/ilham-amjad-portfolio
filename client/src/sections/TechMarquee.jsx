/**
 * TechMarquee — continuous horizontal technology ticker.
 * Sits directly below the Hero section.
 * Pure CSS keyframe animation for performance; no JS timers.
 */

const TECHNOLOGIES = [
  'JAVASCRIPT',
  'RESPONSIVE DESIGN',
  'FULL STACK DEVELOPMENT',
  'REACT.JS',
  'NODE.JS',
  'UI/UX DESIGN',
  'MONGODB',
  'EXPRESS.JS',
  'REST APIS',
  'MOBILE DEVELOPMENT',
  'MERN STACK',
  'TAILWIND CSS',
];

/* Decorative separator between items */
const Separator = () => (
  <span
    className="mx-3 sm:mx-5 md:mx-6 text-[10px] sm:text-xs md:text-sm select-none flex-shrink-0"
    style={{ color: '#5B6CFF' }}
    aria-hidden="true"
  >
    ✦
  </span>
);

/* Single row of all technologies (used twice for seamless loop) */
const TechRow = () => (
  <div className="flex items-center flex-shrink-0" aria-hidden="true">
    {TECHNOLOGIES.map((tech, i) => (
      <div key={`${tech}-${i}`} className="flex items-center flex-shrink-0">
        {i > 0 && <Separator />}
        <span
          className="whitespace-nowrap text-[10px] sm:text-xs md:text-[13px] font-semibold tracking-[0.18em] sm:tracking-[0.22em] select-none flex-shrink-0"
          style={{ color: '#6B7280' }}
        >
          {tech}
        </span>
      </div>
    ))}
    {/* Trailing separator so the join between duplicates looks continuous */}
    <Separator />
  </div>
);

const TechMarquee = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: '#080D17',
        borderTop: '1px solid rgba(91, 108, 255, 0.12)',
        borderBottom: '1px solid rgba(91, 108, 255, 0.12)',
      }}
      aria-label="Technology stack"
    >
      {/* Inline keyframe — avoids needing a separate CSS file or Tailwind config */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className="py-4 sm:py-5 md:py-6">
        {/* The track contains TWO identical copies → seamless wrap */}
        <div className="marquee-track">
          <TechRow />
          <TechRow />
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
