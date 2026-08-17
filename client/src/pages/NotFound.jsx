/**
 * 404 Not Found page.
 */
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div id="not-found" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
