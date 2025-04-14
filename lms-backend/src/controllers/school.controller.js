const { School, User, Grade } = require('../../models');

const schoolController = {
  // Create a new school
  create: async (req, res) => {
    try {
      const { name, address, phone, email, website, description } = req.body;
      
      const school = await School.create({
        name,
        address,
        phone,
        email,
        website,
        description
      });

      res.status(201).json({
        status: 'success',
        data: school
      });
    } catch (error) {
      console.error('School creation error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get all schools
  getAll: async (req, res) => {
    try {
      const schools = await School.findAll({
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['id', 'name', 'email', 'role']
          },
          {
            model: Grade,
            as: 'grades',
            attributes: ['id', 'name']
          }
        ]
      });

      res.json({
        status: 'success',
        data: schools
      });
    } catch (error) {
      console.error('Get schools error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get a single school by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const school = await School.findByPk(id, {
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['id', 'name', 'email', 'role']
          },
          {
            model: Grade,
            as: 'grades',
            attributes: ['id', 'name']
          }
        ]
      });

      if (!school) {
        return res.status(404).json({
          status: 'error',
          message: 'School not found'
        });
      }

      res.json({
        status: 'success',
        data: school
      });
    } catch (error) {
      console.error('Get school error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Update a school
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, phone, email, website, description, status } = req.body;

      const school = await School.findByPk(id);
      if (!school) {
        return res.status(404).json({
          status: 'error',
          message: 'School not found'
        });
      }

      await school.update({
        name,
        address,
        phone,
        email,
        website,
        description,
        status
      });

      res.json({
        status: 'success',
        data: school
      });
    } catch (error) {
      console.error('Update school error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Delete a school
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const school = await School.findByPk(id);
      if (!school) {
        return res.status(404).json({
          status: 'error',
          message: 'School not found'
        });
      }

      await school.destroy();

      res.json({
        status: 'success',
        message: 'School deleted successfully'
      });
    } catch (error) {
      console.error('Delete school error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
};

module.exports = schoolController; 