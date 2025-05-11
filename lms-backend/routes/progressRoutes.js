const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { getProgress } = require('../controllers/progressController');
router.use(isAuthenticated);

router.get('/', getProgress);

module.exports = router;