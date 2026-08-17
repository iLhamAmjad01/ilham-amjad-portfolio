import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track which section is currently in the viewport.
 * Uses IntersectionObserver for performant scroll-based active detection.
 *
 * @param {string[]} sectionIds - Array of section DOM IDs to observe
 * @param {object} options - IntersectionObserver options
 * @returns {string} activeSection - The ID of the currently active section
 */
const useActiveSection = (sectionIds, options = {}) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const observerRef = useRef(null);

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
      ...options,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe each section
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, options]);

  return activeSection;
};

export default useActiveSection;
