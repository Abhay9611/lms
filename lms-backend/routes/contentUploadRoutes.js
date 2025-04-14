const express = require('express');
const router = express.Router();
const {
  uploadContent,
  getContents,
  getContent,
  updateContent,
  deleteContent
} = require('../controllers/contentUploadController');
const { isAuthenticated, isTeacher } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes require authentication
router.use(isAuthenticated);

// Teacher and admin routes
router.post('/', 
  isTeacher, 
  upload.single('file'), 
  uploadContent
);
router.put('/:id', isTeacher, updateContent);
router.delete('/:id', isTeacher, deleteContent);

// Routes accessible by all authenticated users
router.get('/', getContents);
router.get('/:id', getContent);

module.exports = router; 