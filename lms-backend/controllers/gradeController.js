const { Grade } = require('../models');

// Create a new grade
const createGrade = async (req, res) => {
  try {
    const { name, level, schoolId } = req.body;

    const grade = await Grade.create({
      name,
      level,
      schoolId
    });

    res.status(201).json({
      message: 'Grade created successfully',
      grade
    });
  } catch (error) {
    console.error('Create grade error:', error);
    res.status(500).json({ message: 'Error creating grade' });
  }
};

// Get all grades
const getGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll({
      where: { isActive: true }
    });
    res.json(grades);
  } catch (error) {
    console.error('Get grades error:', error);
    res.status(500).json({ message: 'Error getting grades' });
  }
};

// Get a single grade
const getGrade = async (req, res) => {
  try {
    const grade = await Grade.findOne({
      where: { 
        id: req.params.id,
        isActive: true
      }
    });

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.json(grade);
  } catch (error) {
    console.error('Get grade error:', error);
    res.status(500).json({ message: 'Error getting grade' });
  }
};

// Update a grade
const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    await grade.update(req.body);
    res.json({
      message: 'Grade updated successfully',
      grade
    });
  } catch (error) {
    console.error('Update grade error:', error);
    res.status(500).json({ message: 'Error updating grade' });
  }
};

// Delete a grade (soft delete)
const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    await grade.update({ isActive: false });
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    console.error('Delete grade error:', error);
    res.status(500).json({ message: 'Error deleting grade' });
  }
};

module.exports = {
  createGrade,
  getGrades,
  getGrade,
  updateGrade,
  deleteGrade
}; 