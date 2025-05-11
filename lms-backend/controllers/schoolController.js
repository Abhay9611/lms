const { School } = require('../models');

// Create a new school
const createSchool = async (req, res) => {
  try {
    const { schoolName, address } = req.body;


    const school = await School.create({
      name: schoolName,
      address
    });

    res.status(201).json({
      message: 'School created successfully',
      school
    });
  } catch (error) {
    console.error('Create school error:', error);
    res.status(500).json({ message: 'Error creating school' });
  }
};

// Get all schools
const getSchools = async (req, res) => {
  try {
    const schools = await School.findAll({
      where: { isActive: true }
    });
    res.json(schools);
  } catch (error) {
    console.error('Get schools error:', error);
    res.status(500).json({ message: 'Error getting schools' });
  }
};

// Get a single school
const getSchool = async (req, res) => {
  try {
    const school = await School.findOne({
      where: { 
        id: req.params.id,
        isActive: true
      }
    });

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.json(school);
  } catch (error) {
    console.error('Get school error:', error);
    res.status(500).json({ message: 'Error getting school' });
  }
};

// Update a school
const updateSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    if (req.body.code && req.body.code !== school.code) {
      const existingSchool = await School.findOne({ 
        where: { code: req.body.code }
      });
      if (existingSchool) {
        return res.status(400).json({ message: 'School code already exists' });
      }
    }

    await school.update(req.body);
    res.json({
      message: 'School updated successfully',
      school
    });
  } catch (error) {
    console.error('Update school error:', error);
    res.status(500).json({ message: 'Error updating school' });
  }
};

// Delete a school (soft delete)
const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    await school.update({ isActive: false });
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Delete school error:', error);
    res.status(500).json({ message: 'Error deleting school' });
  }
};

module.exports = {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool
}; 