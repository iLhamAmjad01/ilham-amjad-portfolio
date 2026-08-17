/**
 * Central route configuration.
 * All routes are defined here for easy management.
 */
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Home, NotFound } from '../pages';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* Future public routes: */}
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
      </Route>

      {/* Future admin routes: */}
      {/* <Route path="/admin" element={<AdminLayout />}> */}
      {/*   <Route index element={<Dashboard />} /> */}
      {/*   <Route path="projects" element={<ManageProjects />} /> */}
      {/* </Route> */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
