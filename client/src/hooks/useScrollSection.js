import { useCallback } from 'react';

/**
 * Hook to scroll to a specific section by ID.
 * @returns {function} scrollToSection - Pass a section ID to scroll to it.
 */
const useScrollSection = () => {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  return scrollToSection;
};

export default useScrollSection;
