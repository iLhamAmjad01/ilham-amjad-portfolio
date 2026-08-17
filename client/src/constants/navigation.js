/**
 * Navigation configuration.
 * Used by Navbar and scroll navigation.
 *
 * `id` must match the section's DOM id attribute.
 * `label` is the display text in the navbar.
 */
export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
];

/**
 * Section IDs that the IntersectionObserver should track.
 * Includes all navigable sections + contact.
 */
export const SECTION_IDS = [
  'home',
  'experience',
  'about',
  'services',
  'projects',
  'contact',
];
