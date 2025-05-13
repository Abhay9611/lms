const express = require('express');
const router = express.Router();
const { Content } = require('../models');
const { isAuthenticated, isTeacher, isAdmin } = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

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
    console.error('Error creating content:', error);
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

// Add download route for content PDFs
router.get('/download/:filename', isAuthenticated, async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('Content PDF not found:', filePath);
      return res.status(404).json({
        status: 'error',
        message: 'PDF file not found'
      });
    }

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading content PDF:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to download PDF'
    });
  }
});

module.exports = router; 