const express = require('express');
const router = express.Router();
const { MonthlyPlanner } = require('../models');
const { isAuthenticated, isTeacher } = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs');
router.post('/', isTeacher, async (req, res) => {
  const { gradeId, pdfUrl } = req.body;
  try {
    const monthlyPlanner = await MonthlyPlanner.create({ gradeId, pdfUrl });
    res.status(201).json(monthlyPlanner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', isTeacher, async (req, res) => {
  try {
    const monthlyPlanner = await MonthlyPlanner.findAll();
    res.status(200).json(monthlyPlanner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', isTeacher, async (req, res) => {
  const { id } = req.params;
  try {
    const pdf = await MonthlyPlanner.findOne({ where: { id } });
    fs.unlink(`uploads/${pdf.pdfUrl}`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });
    await MonthlyPlanner.destroy({ where: { id } });
    res.status(200).json({ message: 'Planner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });
const upload = multer({ storage: storage });
router.post('/upload', isTeacher, upload.single('pdf'), (req, res) => {
    try {
      res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
  });

module.exports = router;
