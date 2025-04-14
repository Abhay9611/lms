const express = require('express');
const router = express.Router();
const {
  createGrade,
  getGrades,
  getGrade,
  updateGrade,
  deleteGrade
} = require('../controllers/gradeController');
const { isAuthenticated, isTeacher } = require('../middleware/auth');

// All routes require authentication
router.use(isAuthenticated);

// Teacher and admin routes
router.post('/', isTeacher, createGrade);
router.put('/:id', isTeacher, updateGrade);
router.delete('/:id', isTeacher, deleteGrade);

// Routes accessible by all authenticated users
router.get('/', getGrades);
router.get('/:id', getGrade);

module.exports = router; 