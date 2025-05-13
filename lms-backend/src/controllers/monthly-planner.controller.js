const { MonthlyPlanner, Grade } = require('../../models');
const { Op } = require('sequelize');
const { startOfDay, endOfDay } = require('date-fns');

const monthlyPlannerController = {
  // Get monthly planners with filters
  getMonthlyPlanners: async (req, res) => {
    try {
      const { gradeId, startDate, endDate, date } = req.query;
      console.log('Received request params:', { gradeId, startDate, endDate, date });

      // Input validation
      if (!gradeId) {
        return res.status(400).json({
          status: 'error',
          message: 'Grade ID is required'
        });
      }

      let start, end;

      // Handle both date formats
      if (date) {
        const selectedDate = new Date(date);
        if (isNaN(selectedDate.getTime())) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid date format'
          });
        }
        start = startOfDay(selectedDate);
        end = endOfDay(selectedDate);
      } else if (startDate && endDate) {
        start = new Date(startDate);
        end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid date format'
          });
        }
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'Either date or startDate and endDate are required'
        });
      }

      console.log('Query date range:', { start, end });

      // Check if grade exists
      const grade = await Grade.findByPk(gradeId);
      if (!grade) {
        console.log('Grade not found:', gradeId);
        return res.status(404).json({
          status: 'error',
          message: 'Grade not found'
        });
      }

      console.log('Querying planners with conditions:', {
        gradeId,
        dateRange: { start, end }
      });

      // Query planners
      const planners = await MonthlyPlanner.findAll({
        where: {
          gradeId,
          date: {
            [Op.between]: [start, end]
          }
        },
        include: [
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name']
          }
        ],
        order: [['date', 'ASC']]
      });

      console.log('Found planners:', planners.length);

      res.json({
        status: 'success',
        data: planners
      });
    } catch (error) {
      console.error('Get monthly planners error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        original: error.original
      });

      // Handle specific database errors
      if (error.name === 'SequelizeDatabaseError') {
        console.error('Database error details:', {
          code: error.original?.code,
          errno: error.original?.errno,
          sqlMessage: error.original?.sqlMessage,
          sql: error.original?.sql
        });
        return res.status(500).json({
          status: 'error',
          message: 'Database error occurred'
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'An error occurred while fetching monthly planners'
      });
    }
  },

  // Create a new monthly planner
  create: async (req, res) => {
    try {
      const { title, content, date, gradeId, pdfUrl } = req.body;
      const createdBy = req.user.id;

      const planner = await MonthlyPlanner.create({
        title,
        content,
        date,
        gradeId,
        pdfUrl,
        createdBy
      });

      const createdPlanner = await MonthlyPlanner.findByPk(planner.id, {
        include: [
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name']
          }
        ]
      });

      res.status(201).json({
        status: 'success',
        data: createdPlanner
      });
    } catch (error) {
      console.error('Create monthly planner error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Update a monthly planner
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, date, gradeId, pdfUrl } = req.body;

      const planner = await MonthlyPlanner.findByPk(id);
      if (!planner) {
        return res.status(404).json({
          status: 'error',
          message: 'Monthly planner not found'
        });
      }

      await planner.update({
        title,
        content,
        date,
        gradeId,
        pdfUrl
      });

      const updatedPlanner = await MonthlyPlanner.findByPk(id, {
        include: [
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name']
          }
        ]
      });

      res.json({
        status: 'success',
        data: updatedPlanner
      });
    } catch (error) {
      console.error('Update monthly planner error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Delete a monthly planner
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const planner = await MonthlyPlanner.findByPk(id);
      if (!planner) {
        return res.status(404).json({
          status: 'error',
          message: 'Monthly planner not found'
        });
      }

      await planner.destroy();

      res.json({
        status: 'success',
        message: 'Monthly planner deleted successfully'
      });
    } catch (error) {
      console.error('Delete monthly planner error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
};

module.exports = monthlyPlannerController; 