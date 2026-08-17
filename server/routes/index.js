const express = require('express');
const router = express.Router();

// Import route modules
const contactRoutes = require('./contactRoutes');
const healthRoutes = require('./healthRoutes');

// Mount routes
router.use('/contact', contactRoutes);
router.use('/health', healthRoutes);

// Future route modules:
// router.use('/auth', authRoutes);
// router.use('/projects', projectRoutes);
// router.use('/skills', skillRoutes);
// router.use('/blog', blogRoutes);
// router.use('/analytics', analyticsRoutes);

module.exports = router;
