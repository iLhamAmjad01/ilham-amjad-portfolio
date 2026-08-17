/**
 * Reusable Card component.
 * Placeholder — will be styled in the UI implementation phase.
 */
const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
