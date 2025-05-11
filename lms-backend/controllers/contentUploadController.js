const { ContentUpload } = require('../models');
const path = require('path');
const fs = require('fs');

// Upload content
const uploadContent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description, type } = req.body;
    const file = req.file;

    const content = await ContentUpload.create({
      title,
      description,
      type,
      url: `/uploads/${file.filename}`,
      mimeType: file.mimetype,
      fileSize: file.size,
      uploadedById: req.user.id,
      topicId: req.body.topicId
    });

    res.status(201).json({
      message: 'Content uploaded successfully',
      content
    });
  } catch (error) {
    console.error('Upload content error:', error);
    // Clean up uploaded file if there was an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Error uploading content' });
  }
};

// Get all contents
const getContents = async (req, res) => {
  try {
    const contents = await ContentUpload.findAll({
      where: { isActive: true }
    });
    res.json(contents);
  } catch (error) {
    console.error('Get contents error:', error);
    res.status(500).json({ message: 'Error getting contents' });
  }
};

// Get a single content
const getContent = async (req, res) => {
  try {
    const content = await ContentUpload.findOne({
      where: { 
        id: req.params.id,
        isActive: true
      }
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Error getting content' });
  }
};

// Update content
const updateContent = async (req, res) => {
  try {
    const content = await ContentUpload.findByPk(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    await content.update(req.body);
    res.json({
      message: 'Content updated successfully',
      content
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ message: 'Error updating content' });
  }
};

// Delete content (soft delete)
const deleteContent = async (req, res) => {
  try {
    const content = await ContentUpload.findByPk(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Get the file path
    const filePath = path.join(__dirname, '..', content.url);

    // Delete file from storage
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await content.update({ isActive: false });
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ message: 'Error deleting content' });
  }
};

module.exports = {
  uploadContent,
  getContents,
  getContent,
  updateContent,
  deleteContent
}; 