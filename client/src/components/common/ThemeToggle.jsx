/**
 * Theme toggle button component.
 * Placeholder — will be fully implemented in the UI phase.
 */
import { useThemeContext } from '../../context';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
