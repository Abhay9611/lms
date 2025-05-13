const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { isAuthenticated, isTeacher } = require('../middleware/auth');
const {
  getMonthlyPlanners,
  getMonthlyPlanner,
  createMonthlyPlanner,
  updateMonthlyPlanner,
  deleteMonthlyPlanner
} = require('../controllers/monthlyPlannerController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all monthly planners with optional filters
router.get('/', isAuthenticated, getMonthlyPlanners);

// Get a single monthly planner
router.get('/:id', isAuthenticated, getMonthlyPlanner);

// Create a new monthly planner (with optional PDF upload)
router.post('/', 
  isAuthenticated, 
  isTeacher,
  upload.single('pdf'),
  (req, res, next) => {
    console.log('File upload middleware:', {
      file: req.file,
      body: req.body
    });

    // Only require file if content is not provided
    if (!req.file && !req.body.content) {
      return res.status(400).json({
        status: 'error',
        message: 'Either a PDF file or text content is required'
      });
    }

    // Set the pdfUrl if a file was uploaded
    if (req.file) {
      req.body.pdfUrl = req.file.filename;
    }
    
    // Log the modified request body
    console.log('Modified request body:', req.body);
    
    next();
  },
  createMonthlyPlanner
);

// Update a monthly planner (with optional PDF upload)
router.put('/:id',
  isAuthenticated,
  isTeacher,
  upload.single('pdf'),
  (req, res, next) => {
    if (req.file) {
      req.body.pdfUrl = req.file.filename;
    }
    next();
  },
  updateMonthlyPlanner
);

// Delete a monthly planner
router.delete('/:id', isAuthenticated, isTeacher, deleteMonthlyPlanner);

// Test endpoint for debugging
router.post('/test-upload', 
  isAuthenticated,
  isTeacher,
  upload.single('pdf'),
  (req, res) => {
    try {
      console.log('Test upload request details:', {
        user: req.user,
        file: req.file,
        body: req.body,
        headers: req.headers
      });
      
      res.json({
        status: 'success',
        message: 'Test upload successful',
        details: {
          user: {
            id: req.user.id,
            role: req.user.role
          },
          file: req.file ? {
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size
          } : null,
          body: req.body
        }
      });
    } catch (error) {
      console.error('Test upload error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message,
        stack: error.stack
      });
    }
  }
);

module.exports = router;
