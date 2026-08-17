/**
 * Navbar — Premium dark portfolio header component.
 *
 * Features:
 * - Fixed header with scroll-aware background transition
 * - Centered desktop navigation with active section tracking (IntersectionObserver)
 * - Responsive mobile hamburger menu with Framer Motion animations
 * - Smooth scroll navigation to section anchors
 * - Accessible with proper ARIA attributes and semantic HTML
 */
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SECTION_IDS } from '../../constants';
import { useActiveSection } from '../../hooks';

// ============================================================
// Header height offset for scroll calculations
// ============================================================
const HEADER_OFFSET = 72;

// ============================================================
// Smooth scroll helper (accounts for fixed header)
// ============================================================
const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
};

// ============================================================
// Mobile menu animation variants
// ============================================================
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: -8 },
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.25, ease: 'easeOut' },
  }),
};

// ============================================================
// Navbar Component
// ============================================================
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  // ---- Scroll listener for header background transition ----
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // check initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---- Lock body scroll when mobile menu is open ----
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ---- Handle nav link click ----
  const handleNavClick = useCallback((sectionId) => {
    setIsOpen(false);
    scrollToSection(sectionId);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${scrolled
          ? 'bg-[#090E17]/95 backdrop-blur-sm border-b border-[#1a2235]/60'
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        {/* ============== BRAND ============== */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 z-10 cursor-pointer bg-transparent border-none"
          aria-label="Scroll to top"
        >
          {/* Blue accent dot */}
          <span className="block h-2.5 w-2.5 rounded-full bg-[#5B6CFF] shadow-[0_0_8px_rgba(91,108,255,0.5)] transition-shadow duration-300 group-hover:shadow-[0_0_14px_rgba(91,108,255,0.7)]" />
          <span className="text-[1.15rem] font-semibold tracking-tight text-[#F5F7FA] transition-colors duration-300 group-hover:text-white">
            Ilham Amjad
          </span>
        </button>

        {/* ============== DESKTOP NAV ============== */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`
                    relative px-4 py-2 rounded-md text-[0.8rem] font-medium uppercase tracking-[0.08em]
                    transition-all duration-200 ease-out cursor-pointer
                    bg-transparent border-none
                    ${isActive
                      ? 'text-[#F5F7FA]'
                      : 'text-[#8B92A0] hover:text-[#cdd1da] hover:bg-[#000000]/40'
                    }
                  `}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#5B6CFF]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* ============== RIGHT SIDE (HIRE ME + HAMBURGER) ============== */}
        <div className="flex items-center gap-3 z-10">
          {/* Hire Me — Desktop only */}
          <a
            href="mailto:ilhamamjad4050@gmail.com?subject=Project%20Inquiry"
            className="
              hidden lg:inline-flex items-center
              px-5 py-2 rounded-lg
              text-[0.8rem] font-medium uppercase tracking-[0.08em]
              text-[#c8cdd6] bg-[#0D1524] border border-[#1e2d45]
              transition-all duration-250 ease-out cursor-pointer
              hover:bg-[#000000] hover:border-[#5B6CFF]/50 hover:text-white
              no-underline
            "
          >
            Hire Me
          </a>

          {/* Hamburger — Mobile / Tablet only */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="
              relative flex lg:hidden items-center justify-center
              w-10 h-10 rounded-md cursor-pointer
              bg-transparent border-none
              transition-colors duration-200
              hover:bg-[#000000]/40
            "
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`
                  block h-[1.5px] w-full rounded-full bg-[#F5F7FA]
                  transition-all duration-300 ease-out origin-center
                  ${isOpen ? 'translate-y-[7.25px] rotate-45' : ''}
                `}
              />
              <span
                className={`
                  block h-[1.5px] w-full rounded-full bg-[#F5F7FA]
                  transition-all duration-200 ease-out
                  ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}
                `}
              />
              <span
                className={`
                  block h-[1.5px] w-full rounded-full bg-[#F5F7FA]
                  transition-all duration-300 ease-out origin-center
                  ${isOpen ? '-translate-y-[7.25px] -rotate-45' : ''}
                `}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ============== MOBILE MENU ============== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            role="menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="
              lg:hidden overflow-hidden
              bg-[#090E17]/98 backdrop-blur-sm
              border-t border-[#1a2235]/50
            "
          >
            <ul className="flex flex-col px-5 py-4 gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.li
                    key={link.id}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    role="menuitem"
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg
                        text-[0.85rem] font-medium uppercase tracking-[0.08em]
                        transition-all duration-200 ease-out cursor-pointer
                        bg-transparent border-none
                        ${isActive
                          ? 'text-[#F5F7FA] bg-[#5B6CFF]/10'
                          : 'text-[#8B92A0] hover:text-[#cdd1da] hover:bg-[#000000]/30'
                        }
                      `}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span className="block h-1.5 w-1.5 rounded-full bg-[#5B6CFF]" />
                        )}
                        {link.label}
                      </span>
                    </button>
                  </motion.li>
                );
              })}

              {/* Hire Me — inside mobile menu */}
              <motion.li
                custom={NAV_LINKS.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="mt-3 pt-3 border-t border-[#1a2235]/50"
                role="menuitem"
              >
                <a
                  href="mailto:ilhamamjad4050@gmail.com?subject=Project%20Inquiry"
                  className="
                    w-full px-4 py-3 rounded-lg
                    text-[0.85rem] font-medium uppercase tracking-[0.08em]
                    text-center text-[#c8cdd6] bg-[#0D1524] border border-[#1e2d45]
                    transition-all duration-200 ease-out cursor-pointer
                    hover:bg-[#000000] hover:border-[#5B6CFF]/50 hover:text-white
                    block no-underline
                  "
                  onClick={() => setIsOpen(false)}
                >
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
