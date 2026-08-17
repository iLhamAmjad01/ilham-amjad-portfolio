/**
 * Main layout — wraps pages with Navbar and Footer.
 * Used for the public-facing portfolio.
 */
import { Outlet } from 'react-router-dom';
import { Navbar, Footer, ScrollToTop } from '../components';

const MainLayout = () => {
  return (
    <div className="main-layout min-h-screen bg-[#070B12]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
