const { Course, User, Lesson, Assignment } = require('../models');

const courseController = {
  // Create a new course
  createCourse: async (req, res) => {
    try {
      const {
        title,
        description,
        thumbnail,
        price,
        duration,
        level,
        startDate,
        endDate,
        maxStudents
      } = req.body;

      const course = await Course.create({
        title,
        description,
        thumbnail,
        price,
        duration,
        level,
        startDate,
        endDate,
        maxStudents,
        teacherId: req.user.id
      });

      res.status(201).json({
        message: 'Course created successfully',
        course
      });
    } catch (error) {
      console.error('Create course error:', error);
      res.status(500).json({ message: 'Error creating course', error: error.message });
    }
  },

  // Get all courses with optional filters
  getCourses: async (req, res) => {
    try {
      const {
        level,
        status,
        teacherId,
        page = 1,
        limit = 10
      } = req.query;

      const where = {};
      if (level) where.level = level;
      if (status) where.status = status;
      if (teacherId) where.teacherId = teacherId;

      const offset = (page - 1) * limit;

      const { count, rows: courses } = await Course.findAndCountAll({
        where,
        include: [
          {
            model: User,
            as: 'teacher',
            attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture']
          }
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        courses,
        total: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit)
      });
    } catch (error) {
      console.error('Get courses error:', error);
      res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
  },

  // Get a single course by ID
  getCourse: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'teacher',
            attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture']
          },
          {
            model: Lesson,
            as: 'lessons',
            attributes: ['id', 'title', 'description', 'duration', 'order']
          },
          {
            model: Assignment,
            as: 'assignments',
            attributes: ['id', 'title', 'dueDate', 'totalPoints']
          }
        ]
      });

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      res.json({ course });
    } catch (error) {
      console.error('Get course error:', error);
      res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
  },

  // Update a course
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Check if user is the course teacher
      if (course.teacherId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this course' });
      }

      const updatedCourse = await course.update(req.body);

      res.json({
        message: 'Course updated successfully',
        course: updatedCourse
      });
    } catch (error) {
      console.error('Update course error:', error);
      res.status(500).json({ message: 'Error updating course', error: error.message });
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Check if user is the course teacher
      if (course.teacherId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this course' });
      }

      await course.destroy();

      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
  },

  // Enroll a student in a course
  enrollStudent: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Check if course is published
      if (course.status !== 'published') {
        return res.status(400).json({ message: 'Course is not available for enrollment' });
      }

      // Check if student is already enrolled
      const existingEnrollment = await course.hasStudent(req.user.id);
      if (existingEnrollment) {
        return res.status(400).json({ message: 'Student is already enrolled in this course' });
      }

      // Add student to course
      await course.addStudent(req.user.id);

      res.json({ message: 'Successfully enrolled in the course' });
    } catch (error) {
      console.error('Enroll student error:', error);
      res.status(500).json({ message: 'Error enrolling in course', error: error.message });
    }
  },

  // Get enrolled students for a course
  getEnrolledStudents: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Check if user is the course teacher
      if (course.teacherId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to view enrolled students' });
      }

      const students = await course.getStudents({
        attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture']
      });

      res.json({ students });
    } catch (error) {
      console.error('Get enrolled students error:', error);
      res.status(500).json({ message: 'Error fetching enrolled students', error: error.message });
    }
  }
};

module.exports = courseController; 