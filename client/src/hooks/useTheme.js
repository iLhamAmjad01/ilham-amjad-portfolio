import { useState, useEffect } from 'react';

/**
 * Hook to detect dark/light theme based on class on <html>.
 * @returns {{ theme: string, isDark: boolean }}
 */
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return { theme, isDark: theme === 'dark' };
};

export default useTheme;
