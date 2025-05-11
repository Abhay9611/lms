const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication token is required'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Verify user exists and is active
      const user = await User.findOne({
        where: {
          id: decoded.id,
          isActive: true
        }
      });

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found or account is inactive'
        });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          message: 'Token has expired'
        });
      }
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
  },

  checkRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication required'
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'error',
          message: 'Insufficient permissions'
        });
      }

      next();
    };
  }
};

module.exports = authMiddleware; 