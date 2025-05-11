const express = require('express');
const router = express.Router();
const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/subjectController');
const { isAuthenticated, isTeacher } = require('../middleware/auth');

// All routes require authentication
router.use(isAuthenticated);

// Teacher and admin routes
router.post('/', isTeacher, createSubject);
router.put('/:id', isTeacher, updateSubject);
router.delete('/:id', isTeacher, deleteSubject);

// Routes accessible by all authenticated users
router.get('/', getSubjects);
router.get('/:id', getSubject);

module.exports = router; 