const { Topic, StudentProgress } = require('../models');

// Create a new topic
const createTopic = async (req, res) => {
  try {
    const { title, description, subjectId, month, order } = req.body;

    const topic = await Topic.create({
      title,
      description,
      subjectId,
      month,
      order
    });

    res.status(201).json({
      message: 'Topic created successfully',
      topic
    });
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({ message: 'Error creating topic' });
  }
};

// Get all topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll({
      where: { isActive: true }
    });
    res.json(topics);
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ message: 'Error getting topics' });
  }
};

// Get a single topic
const getTopic = async (req, res) => {
  try {
    const topic = await Topic.findOne({
      where: { 
        id: req.params.id,
        isActive: true
      }
    });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({ message: 'Error getting topic' });
  }
};

// Update a topic
const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    await topic.update(req.body);
    res.json({
      message: 'Topic updated successfully',
      topic
    });
  } catch (error) {
    console.error('Update topic error:', error);
    res.status(500).json({ message: 'Error updating topic' });
  }
};

// Delete a topic (soft delete)
const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    await topic.update({ isActive: false });
    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Delete topic error:', error);
    res.status(500).json({ message: 'Error deleting topic' });
  }
};

const updateTopicProgress = async (req, res) => {
  try {
    const { completedItem } = req.body;

    const existingProgress = await StudentProgress.findOne({
      where: {
        userId: req.user.id,
        topicId: req.params.id
      }
    });
    if(!existingProgress){
      await StudentProgress.create({
        userId: req.user.id,
        topicId: req.params.id,
        videoCompleted: false,
        quizCompleted: false
      });
    }
    const studentProgress = await StudentProgress.findOne({
      where: {
        userId: req.user.id,
        topicId: req.params.id
      }
    });

    if(completedItem == "video"){
      studentProgress.videoCompleted = true;
    }
    if(completedItem == "quiz"){
      studentProgress.quizCompleted = true;
    }

    await studentProgress.save();
    res.json({ message: 'Topic progress updated successfully' });
  } catch (error) {
    console.error('Update topic progress error:', error);
    res.status(500).json({ message: 'Error updating topic progress' });
  }
};


module.exports = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
  updateTopicProgress
}; 