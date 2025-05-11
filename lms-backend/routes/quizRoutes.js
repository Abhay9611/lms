const express = require('express');
const router = express.Router();
const { isAuthenticated, isTeacher } = require('../middleware/auth');
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');

// Create a new quiz (teacher only)
router.post('/', isTeacher, createQuiz);

// Get all quizzes (authenticated users)
router.get('/', isAuthenticated, getQuizzes);

// Get a single quiz (authenticated users)
router.get('/:id', isAuthenticated, getQuiz);

// Update a quiz (teacher only)
router.put('/:id', isTeacher, updateQuiz);

// Delete a quiz (teacher only)
router.delete('/:id', isTeacher, deleteQuiz);

module.exports = router; 