const jwt = require('jsonwebtoken');
const { User } = require('../models');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    await isAuthenticated(req, res, () => {
      console.log('Admin middleware - User:', {
        id: req.user.id,
        role: req.user.role,
        email: req.user.email
      });
      
      if (req.user.role !== 'admin') {
        console.log('Admin middleware - Access denied:', {
          userRole: req.user.role,
          requiredRole: 'admin'
        });
        return res.status(403).json({ 
          status: 'error',
          message: 'Admin access required',
          userRole: req.user.role 
        });
      }
      console.log('Admin middleware - Access granted');
      next();
    });
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
};

const isTeacher = async (req, res, next) => {
  try {
    await isAuthenticated(req, res, () => {
      if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Teacher access required' });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isTeacher
}; 