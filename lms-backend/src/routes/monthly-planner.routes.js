const express = require('express');
const router = express.Router();
const monthlyPlannerController = require('../controllers/monthly-planner.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Monthly planner routes
router.get('/', monthlyPlannerController.getMonthlyPlanners);
router.post('/', monthlyPlannerController.create);
router.put('/:id', monthlyPlannerController.update);
router.delete('/:id', monthlyPlannerController.delete);

module.exports = router; 