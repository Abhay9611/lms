const express = require('express');
const router = express.Router();
const { Content } = require('../models');
const { isAuthenticated, isTeacher, isAdmin } = require('../middleware/auth');

// Get all content
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get content by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get content by topic
router.get('/topic/:topicId', isAuthenticated, async (req, res) => {
  try {
    const contents = await Content.findAll({
      where: { topicId: req.params.topicId }
    });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create content (admin/teacher only)
router.post('/', isTeacher, async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json({ content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update content (admin/teacher only)
router.put('/:id', isTeacher, async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    await content.update(req.body);
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete content (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    await content.destroy();
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 