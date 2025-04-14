const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { isAuthenticated, isTeacher } = require('../middleware/auth');

// Public routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);

// Protected routes
router.post('/', isTeacher, courseController.createCourse);
router.put('/:id', isTeacher, courseController.updateCourse);
router.delete('/:id', isTeacher, courseController.deleteCourse);

// Enrollment routes
router.post('/:id/enroll', isAuthenticated, courseController.enrollStudent);
router.get('/:id/students', isTeacher, courseController.getEnrolledStudents);

module.exports = router; 