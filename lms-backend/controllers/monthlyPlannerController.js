const { MonthlyPlanner, Grade } = require('../models');
const { Op } = require('sequelize');

// Get all monthly planners with optional filters
const getMonthlyPlanners = async (req, res) => {
  try {
    const { gradeId, date } = req.query;

    console.log('Raw request params:', req.query);
    console.log('Parsed params:', { gradeId, date });

    // Build where clause
    const where = {};
    if (gradeId) where.gradeId = gradeId;
    
    // Handle date filtering
    if (date) {
      console.log('Processing date:', date);
      const targetDate = new Date(date);
      
      // Ensure date is valid
      if (isNaN(targetDate.getTime())) {
        console.error('Invalid date format:', date);
        return res.status(400).json({
          status: 'error',
          message: 'Invalid date format provided'
        });
      }

      // Set time to start of day
      const start = new Date(targetDate);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date(targetDate);
      end.setHours(23, 59, 59, 999);

      console.log('Date range:', {
        start: start.toISOString(),
        end: end.toISOString()
      });

      where.date = {
        [Op.between]: [start, end]
      };
    } else {
      console.log('No date provided in request');
    }

    console.log('Final where clause:', JSON.stringify(where, null, 2));

    const planners = await MonthlyPlanner.findAll({
      where,
      include: [{
        model: Grade,
        as: 'grade',
        attributes: ['id', 'name']
      }],
      order: [['date', 'DESC']]
    });

    console.log('Query successful:', {
      plannersFound: planners.length,
      planners: planners.map(p => ({
        id: p.id,
        date: p.date,
        gradeId: p.gradeId
      }))
    });

    res.json({
      status: 'success',
      data: planners
    });
  } catch (error) {
    console.error('Error fetching monthly planners:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch monthly planners',
      error: error.message 
    });
  }
};

// Get a single monthly planner by ID
const getMonthlyPlanner = async (req, res) => {
  try {
    const { id } = req.params;
    const planner = await MonthlyPlanner.findByPk(id, {
      include: [{
        model: Grade,
        attributes: ['id', 'name']
      }],
      as: 'grade'
    });

    if (!planner) {
      return res.status(404).json({
        status: 'error',
        message: 'Monthly planner not found'
      });
    }

    res.json({
      status: 'success',
      data: planner
    });
  } catch (error) {
    console.error('Error fetching monthly planner:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch monthly planner',
      error: error.message
    });
  }
};

// Create a new monthly planner
const createMonthlyPlanner = async (req, res) => {
  try {
    // Log all incoming fields and file info
    console.log('Create Monthly Planner - Incoming request details:', {
      body: req.body,
      file: req.file,
      user: req.user,
      headers: req.headers,
      rawBody: req.rawBody
    });

    const { gradeId, title, content, pdfUrl, date } = req.body;

    // Log parsed fields
    console.log('Parsed fields:', {
      gradeId,
      title,
      content: content ? 'content present' : 'no content',
      pdfUrl,
      date,
      hasFile: !!req.file
    });

    // Validate required fields
    if (!gradeId || !title || !date) {
      console.log('Missing required fields:', { 
        gradeId: !!gradeId, 
        title: !!title, 
        pdfUrl: !!pdfUrl, 
        date: !!date 
      });
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: gradeId, title, and date are required'
      });
    }

    // Validate date format
    const plannerDate = new Date(date);
    if (isNaN(plannerDate.getTime())) {
      console.log('Invalid date format:', date);
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format'
      });
    }

    // Check if grade exists
    try {
      console.log('Checking if grade exists:', gradeId);
      const grade = await Grade.findByPk(gradeId);
      if (!grade) {
        console.log('Invalid grade ID:', gradeId);
        return res.status(400).json({
          status: 'error',
          message: 'Invalid grade ID'
        });
      }
      console.log('Grade found:', grade.name);
    } catch (gradeError) {
      console.error('Error checking grade:', {
        error: gradeError,
        message: gradeError.message,
        stack: gradeError.stack
      });
      throw gradeError;
    }

    try {
      console.log('Creating planner with data:', {
        gradeId,
        title,
        content: content ? 'content present' : 'no content',
        pdfUrl: pdfUrl || req.file?.filename,
        date: plannerDate
      });

      const planner = await MonthlyPlanner.create({
        gradeId,
        title,
        content,
        pdfUrl: pdfUrl || req.file?.filename,
        date: plannerDate
      });

      console.log('Database create operation successful, planner ID:', planner.id);

      // Fetch the created planner with grade information
      try {
        const createdPlanner = await MonthlyPlanner.findByPk(planner.id, {
          include: [{
            model: Grade,
            attributes: ['id', 'name']
          }]
        });

        console.log('Successfully fetched created planner with grade info:', createdPlanner.toJSON());

        res.status(201).json({
          status: 'success',
          data: createdPlanner
        });
      } catch (fetchError) {
        console.error('Error fetching created planner after successful creation:', {
          error: fetchError,
          message: fetchError.message,
          stack: fetchError.stack,
          plannerId: planner.id
        });
        // Even if fetching fails, we should return success since the data was created
        res.status(201).json({
          status: 'success',
          message: 'Monthly planner created successfully but could not fetch complete details',
          data: planner
        });
        return;
      }
    } catch (dbError) {
      console.error('Database error creating planner:', {
        error: dbError,
        message: dbError.message,
        stack: dbError.stack,
        sql: dbError.sql,
        name: dbError.name
      });
      throw dbError;
    }
  } catch (error) {
    console.error('Error creating monthly planner:', {
      error,
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({
      status: 'error',
      message: 'Failed to create monthly planner',
      error: error.message
    });
  }
};

// Update a monthly planner
const updateMonthlyPlanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { gradeId, title, content, pdfUrl, date } = req.body;

    const planner = await MonthlyPlanner.findByPk(id);
    if (!planner) {
      return res.status(404).json({
        status: 'error',
        message: 'Monthly planner not found'
      });
    }

    // If gradeId is provided, validate it
    if (gradeId) {
      const grade = await Grade.findByPk(gradeId);
      if (!grade) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid grade ID'
        });
      }
    }

    // If date is provided, validate it
    if (date) {
      const plannerDate = new Date(date);
      if (isNaN(plannerDate.getTime())) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid date format'
        });
      }
    }

    // Update the planner
    await planner.update({
      gradeId: gradeId || planner.gradeId,
      title: title || planner.title,
      content: content !== undefined ? content : planner.content,
      pdfUrl: pdfUrl || planner.pdfUrl,
      date: date ? new Date(date) : planner.date
    });

    // Fetch the updated planner with grade information
    const updatedPlanner = await MonthlyPlanner.findByPk(id, {
      include: [{
        model: Grade,
        attributes: ['id', 'name']
      }]
    });

    res.json({
      status: 'success',
      data: updatedPlanner
    });
  } catch (error) {
    console.error('Error updating monthly planner:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update monthly planner',
      error: error.message
    });
  }
};

// Delete a monthly planner
const deleteMonthlyPlanner = async (req, res) => {
  try {
    const { id } = req.params;
    const planner = await MonthlyPlanner.findByPk(id);

    if (!planner) {
      return res.status(404).json({
        status: 'error',
        message: 'Monthly planner not found'
      });
    }

    // Delete the PDF file if it exists
    if (planner.pdfUrl) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '..', 'uploads', planner.pdfUrl);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await planner.destroy();

    res.json({
      status: 'success',
      message: 'Monthly planner deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting monthly planner:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete monthly planner',
      error: error.message
    });
  }
};

module.exports = {
  getMonthlyPlanners,
  getMonthlyPlanner,
  createMonthlyPlanner,
  updateMonthlyPlanner,
  deleteMonthlyPlanner
};