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
const multer = require('multer');

// All routes require authentication
router.use(isAuthenticated);

// Teacher and admin routes
router.post('/', isTeacher, createTeachingGuide);
router.put('/:id', isTeacher, updateTeachingGuide);
router.delete('/:id', isTeacher, deleteTeachingGuide);

// Routes accessible by all authenticated users
router.get('/', getTeachingGuides);
router.get('/:id', getTeachingGuide);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Route for uploading PDF files
router.post('/upload', isTeacher, upload.single('pdf'), (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

module.exports = router; 