const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  changePassword
} = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes require authentication
router.use(isAuthenticated);

// Routes accessible by admin only
router.get('/', isAdmin, getAllUsers);

// Routes accessible by all authenticated users
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);
router.put('/me', upload.single('avatar'), updateProfile);
router.put('/:id', isAdmin, upload.single('avatar'), updateProfile);
router.put('/me/password', changePassword);

module.exports = router; 