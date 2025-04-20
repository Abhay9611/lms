const express = require('express');
const router = express.Router();
const {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool
} = require('../controllers/schoolController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// All routes require authentication
// router.use(isAuthenticated);

// Admin only routes
router.post('/', isAdmin, createSchool);
router.put('/:id', isAdmin, updateSchool);
router.delete('/:id', isAdmin, deleteSchool);

// Routes accessible by admin and school staff
// router.get('/', isAuthenticated, getSchools);
router.get('/', getSchools);
router.get('/:id', isAuthenticated, getSchool);

module.exports = router; 