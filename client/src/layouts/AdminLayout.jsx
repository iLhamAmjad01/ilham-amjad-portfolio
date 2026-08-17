/**
 * Admin layout — for future admin dashboard.
 * Placeholder — will be implemented when admin features are added.
 */
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside>Admin Sidebar — Placeholder</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
