const express = require('express');
const router = express.Router();
const { Flashcard, StudentFlashcardProgress } = require('../models');
const { isAuthenticated, isTeacher, isAdmin } = require('../middleware/auth');

// Get all flashcards
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get flashcard by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get flashcards by topic
router.get('/topic/:topicId', isAuthenticated, async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll({
      where: { topicId: req.params.topicId }
    });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student's flashcard progress
router.get('/progress', isAuthenticated, async (req, res) => {
  try {
    const progress = await StudentFlashcardProgress.findAll({
      where: { studentId: req.user.id },
      include: [{ model: Flashcard, as: 'flashcard' }]
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create flashcard (admin/teacher only)
router.post('/', isTeacher, async (req, res) => {
  try {
    const flashcard = await Flashcard.create(req.body);
    res.status(201).json({ flashcard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update flashcard progress
router.post('/:id/progress', isAuthenticated, async (req, res) => {
  try {
    const { confidenceLevel, status } = req.body;

    let progress = await StudentFlashcardProgress.findOne({
      where: {
        flashcardId: req.params.id,
        studentId: req.user.id
      }
    });

    if (!progress) {
      progress = await StudentFlashcardProgress.create({
        flashcardId: req.params.id,
        studentId: req.user.id,
        confidenceLevel: confidenceLevel || 0,
        status: status || 'NOT_STARTED'
      });
    } else {
      await progress.update({
        confidenceLevel: confidenceLevel || progress.confidenceLevel,
        status: status || progress.status,
        lastReviewedAt: new Date(),
        reviewCount: progress.reviewCount + 1
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update flashcard (admin/teacher only)
router.put('/:id', isTeacher, async (req, res) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    await flashcard.update(req.body);
    res.json({ message: 'Flashcard updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete flashcard (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    await flashcard.destroy();
    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 