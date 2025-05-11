const { Grade, School, User } = require('../../models');

const gradeController = {
  // Create a new grade
  create: async (req, res) => {
    try {
      const { name, description, schoolId } = req.body;
      
      const grade = await Grade.create({
        name,
        description,
        schoolId
      });

      res.status(201).json({
        status: 'success',
        data: grade
      });
    } catch (error) {
      console.error('Grade creation error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get all grades
  getAll: async (req, res) => {
    try {
      const grades = await Grade.findAll({
        include: [
          {
            model: School,
            as: 'school',
            attributes: ['id', 'name']
          },
          {
            model: User,
            as: 'students',
            attributes: ['id', 'name', 'email']
          }
        ]
      });

      res.json({
        status: 'success',
        data: grades
      });
    } catch (error) {
      console.error('Get grades error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get grades by school ID
  getBySchool: async (req, res) => {
    try {
      const { schoolId } = req.params;
      
      const grades = await Grade.findAll({
        where: { schoolId },
        include: [
          {
            model: User,
            as: 'students',
            attributes: ['id', 'name', 'email']
          }
        ]
      });

      res.json({
        status: 'success',
        data: grades
      });
    } catch (error) {
      console.error('Get grades by school error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get a single grade by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const grade = await Grade.findByPk(id, {
        include: [
          {
            model: School,
            as: 'school',
            attributes: ['id', 'name']
          },
          {
            model: User,
            as: 'students',
            attributes: ['id', 'name', 'email']
          }
        ]
      });

      if (!grade) {
        return res.status(404).json({
          status: 'error',
          message: 'Grade not found'
        });
      }

      res.json({
        status: 'success',
        data: grade
      });
    } catch (error) {
      console.error('Get grade error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Update a grade
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, schoolId, status } = req.body;

      const grade = await Grade.findByPk(id);
      if (!grade) {
        return res.status(404).json({
          status: 'error',
          message: 'Grade not found'
        });
      }

      await grade.update({
        name,
        description,
        schoolId,
        status
      });

      res.json({
        status: 'success',
        data: grade
      });
    } catch (error) {
      console.error('Update grade error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Delete a grade
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const grade = await Grade.findByPk(id);
      if (!grade) {
        return res.status(404).json({
          status: 'error',
          message: 'Grade not found'
        });
      }

      await grade.destroy();

      res.json({
        status: 'success',
        message: 'Grade deleted successfully'
      });
    } catch (error) {
      console.error('Delete grade error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
};

module.exports = gradeController; 