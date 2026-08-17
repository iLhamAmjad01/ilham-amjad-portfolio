/**
 * Reusable Button component.
 * Placeholder — will be styled in the UI implementation phase.
 */
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
