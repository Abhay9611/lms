const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const School = require('../models/School');

// Apply auth middleware to all routes
router.use(verifyToken);

// School routes
router.get('/', async (req, res) => {
  try {
    const schools = await School.findAll();
    res.json({
      success: true,
      data: { schools }
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching schools',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }
    res.json({
      success: true,
      data: { school }
    });
  } catch (error) {
    console.error('Error fetching school:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching school',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Admin only routes
router.post('/', isAdmin, async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json({
      success: true,
      message: 'School created successfully',
      data: { school }
    });
  } catch (error) {
    console.error('Error creating school:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating school',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.put('/:id', isAdmin, async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }
    await school.update(req.body);
    res.json({
      success: true,
      message: 'School updated successfully',
      data: { school }
    });
  } catch (error) {
    console.error('Error updating school:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating school',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }
    await school.destroy();
    res.json({
      success: true,
      message: 'School deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting school',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 