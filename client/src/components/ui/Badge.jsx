/**
 * Reusable Badge component.
 * Placeholder — will be styled in the UI implementation phase.
 */
const Badge = ({ children, className = '', ...props }) => {
  return (
    <span className={`badge ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
