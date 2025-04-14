const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grade.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Grade routes
router.post('/', gradeController.create);
router.get('/', gradeController.getAll);
router.get('/school/:schoolId', gradeController.getBySchool);
router.get('/:id', gradeController.getById);
router.put('/:id', gradeController.update);
router.delete('/:id', gradeController.delete);

module.exports = router; 