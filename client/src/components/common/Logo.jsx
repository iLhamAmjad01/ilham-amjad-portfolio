/**
 * Logo component.
 * Placeholder — will be fully implemented in the UI phase.
 */
import { PERSONAL_INFO } from '../../constants';

const Logo = ({ className = '' }) => {
  return (
    <div className={`logo ${className}`}>
      <span>{PERSONAL_INFO.name}</span>
    </div>
  );
};

export default Logo;
