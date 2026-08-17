/**
 * Section heading component.
 * Reusable heading for each portfolio section.
 * Placeholder — will be styled in the UI implementation phase.
 */
const SectionHeading = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`section-heading ${className}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
