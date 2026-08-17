/**
 * Social links component.
 * Placeholder — will be fully implemented in the UI phase.
 */
import { SOCIAL_LINKS } from '../../constants';

const SocialLinks = ({ className = '' }) => {
  return (
    <div className={`social-links ${className}`}>
      {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform}
        >
          {platform}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
