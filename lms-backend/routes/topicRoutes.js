const express = require('express');
const router = express.Router();
const {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
  updateTopicProgress
} = require('../controllers/topicController');
const { isAuthenticated, isTeacher } = require('../middleware/auth');

// All routes require authentication
router.use(isAuthenticated);

// Teacher and admin routes
router.post('/', isTeacher, createTopic);
router.put('/:id', isTeacher, updateTopic);
router.delete('/:id', isTeacher, deleteTopic);

// Routes accessible by all authenticated users
router.get('/', getTopics);
router.get('/:id', getTopic);

router.post('/progress/:id', updateTopicProgress);

module.exports = router; 