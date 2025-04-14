const express = require('express');
const router = express.Router();
const {
  createTeachingGuide,
  getTeachingGuides,
  getTeachingGuide,
  updateTeachingGuide,
  deleteTeachingGuide
} = require('../controllers/teachingGuideController');
const { isAuthenticated, isTeacher } = require('../middleware/auth');

// All routes require authentication
router.use(isAuthenticated);

// Teacher and admin routes
router.post('/', isTeacher, createTeachingGuide);
router.put('/:id', isTeacher, updateTeachingGuide);
router.delete('/:id', isTeacher, deleteTeachingGuide);

// Routes accessible by all authenticated users
router.get('/', getTeachingGuides);
router.get('/:id', getTeachingGuide);

module.exports = router; 