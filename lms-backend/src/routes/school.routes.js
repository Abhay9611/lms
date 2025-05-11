const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// School routes
router.post('/', schoolController.create);
router.get('/', schoolController.getAll);
router.get('/:id', schoolController.getById);
router.put('/:id', schoolController.update);
router.delete('/:id', schoolController.delete);

module.exports = router; 