const { Quiz, Topic, QuizQuestion, QuizOption } = require('../models');

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { topicId, title, description, timeLimit, passingScore, question, points, order, option1_text, option1_iscorrect, option1_explanation, option2_text, option2_iscorrect, option2_explanation, option3_text, option3_iscorrect, option3_explanation, option4_text, option4_iscorrect, option4_explanation } = req.body;

    // Check if topic exists
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const quiz = await Quiz.create({
      topicId,
      title,
      description,
      timeLimit,
      passingScore,
      isActive: true,
      question,
      points,
      order,
      option1_text,
      option1_iscorrect,
      option1_explanation,
      option2_text,
      option2_iscorrect,
      option2_explanation,
      option3_text,
      option3_iscorrect,
      option3_explanation,
      option4_text,
      option4_iscorrect,
      option4_explanation
    });

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz
    });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
};

// Get all quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [{
        model: Topic,
        as: 'topic',
        attributes: ['id', 'title']
      }]
    });
    res.json(quizzes);
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ message: 'Error getting quizzes' });
  }
};

// Get a single quiz
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Topic,
          as: 'topic',
          attributes: ['id', 'title']
        },
        {
          model: QuizQuestion,
          as: 'questions',
          include: [{
            model: QuizOption,
            as: 'options'
          }]
        }
      ]
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ message: 'Error getting quiz' });
  }
};

// Update a quiz
const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // If topicId is being updated, check if the new topic exists
    if (req.body.topicId) {
      const topic = await Topic.findByPk(req.body.topicId);
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }
    }

    await quiz.update(req.body);
    res.json({
      message: 'Quiz updated successfully',
      quiz
    });
  } catch (error) {
    console.error('Update quiz error:', error);
    res.status(500).json({ message: 'Error updating quiz' });
  }
};

// Delete a quiz
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    await quiz.destroy();
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz
}; 