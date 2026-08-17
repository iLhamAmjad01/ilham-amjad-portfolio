/**
 * Reusable Input component.
 * Placeholder — will be styled in the UI implementation phase.
 */
const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
