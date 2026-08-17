/**
 * Loading spinner component.
 * Placeholder — will be styled in the UI implementation phase.
 */
const Loader = ({ size = 'md', className = '' }) => {
  return (
    <div className={`loader loader-${size} ${className}`}>
      <div className="spinner" />
    </div>
  );
};

export default Loader;
