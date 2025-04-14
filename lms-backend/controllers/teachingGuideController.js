const { TeachingGuide, Topic, Subject } = require('../models');
const { Op } = require('sequelize');

// Create a new teaching guide
const createTeachingGuide = async (req, res) => {
  try {
    const { topicId, pdfUrl } = req.body;

    // Check if topic exists
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Check if teaching guide already exists for this topic
    const existingGuide = await TeachingGuide.findOne({ where: { topicId } });
    if (existingGuide) {
      return res.status(400).json({ message: 'Teaching guide already exists for this topic' });
    }

    const teachingGuide = await TeachingGuide.create({
      topicId,
      pdfUrl
    });

    res.status(201).json({
      message: 'Teaching guide created successfully',
      teachingGuide
    });
  } catch (error) {
    console.error('Create teaching guide error:', error);
    res.status(500).json({ message: 'Error creating teaching guide' });
  }
};

// Get all teaching guides
const getTeachingGuides = async (req, res) => {
  try {
    const teachingGuides = await TeachingGuide.findAll({
      include: [{
        model: Topic,
        as: 'Topic',
        attributes: ['id', 'title', 'description']
      }]
    });
    res.json(teachingGuides);
  } catch (error) {
    console.error('Get teaching guides error:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Error getting teaching guides', error: error.message });
  }
};

// Get a single teaching guide
const getTeachingGuide = async (req, res) => {
  try {
    const teachingGuide = await TeachingGuide.findOne({
      where: { id: req.params.id },
      include: [{
        model: Topic,
        as: 'Topic',
        attributes: ['id', 'title', 'description']
      }]
    });

    if (!teachingGuide) {
      return res.status(404).json({ message: 'Teaching guide not found' });
    }

    res.json(teachingGuide);
  } catch (error) {
    console.error('Get teaching guide error:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Get teaching guide error:', error);
    res.status(500).json({ message: 'Error getting teaching guide' });
  }
};

// Update a teaching guide
const updateTeachingGuide = async (req, res) => {
  try {
    const teachingGuide = await TeachingGuide.findByPk(req.params.id);

    if (!teachingGuide) {
      return res.status(404).json({ message: 'Teaching guide not found' });
    }

    // If topicId is being updated, check if the new topic exists
    if (req.body.topicId) {
      const topic = await Topic.findByPk(req.body.topicId);
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      // Check if another teaching guide exists for the new topic
      const existingGuide = await TeachingGuide.findOne({
        where: { 
          topicId: req.body.topicId,
          id: { [Op.ne]: req.params.id } // Exclude current guide
        }
      });
      if (existingGuide) {
        return res.status(400).json({ message: 'Teaching guide already exists for this topic' });
      }
    }

    await teachingGuide.update(req.body);
    res.json({
      message: 'Teaching guide updated successfully',
      teachingGuide
    });
  } catch (error) {
    console.error('Update teaching guide error:', error);
    res.status(500).json({ message: 'Error updating teaching guide' });
  }
};

// Delete a teaching guide
const deleteTeachingGuide = async (req, res) => {
  try {
    const teachingGuide = await TeachingGuide.findByPk(req.params.id);

    if (!teachingGuide) {
      return res.status(404).json({ message: 'Teaching guide not found' });
    }

    await teachingGuide.destroy();
    res.json({ message: 'Teaching guide deleted successfully' });
  } catch (error) {
    console.error('Delete teaching guide error:', error);
    res.status(500).json({ message: 'Error deleting teaching guide' });
  }
};

module.exports = {
  createTeachingGuide,
  getTeachingGuides,
  getTeachingGuide,
  updateTeachingGuide,
  deleteTeachingGuide
}; 