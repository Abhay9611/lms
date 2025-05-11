const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, School, Grade } = require('../../models');

const authController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, role, grade, schoolCode } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User already exists'
        });
      }

      // Validate school code for students and teachers
      let schoolId = null;
      let gradeId = null;

      if (role === 'student' || role === 'teacher') {
        if (!schoolCode) {
          return res.status(400).json({
            status: 'error',
            message: 'School code is required'
          });
        }

        const school = await School.findOne({ 
          where: { 
            code: schoolCode,
            isActive: true 
          } 
        });
        
        if (!school) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid school code or school is inactive'
          });
        }
        schoolId = school.id;

        // For students, validate and get grade
        if (role === 'student') {
          if (!grade) {
            return res.status(400).json({
              status: 'error',
              message: 'Grade level is required for students'
            });
          }

          // Map grade name to enum value
          const gradeMap = {
            'Pre-Nursery': 'Pre-nursery',
            'Nursery': 'LKG',
            'Kindergarten': 'UKG'
          };

          const gradeName = gradeMap[grade] || grade;
          const gradeRecord = await Grade.findOne({
            where: {
              name: gradeName,
              schoolId: schoolId,
              isActive: true
            }
          });

          if (!gradeRecord) {
            return res.status(400).json({
              status: 'error',
              message: 'Invalid grade level for this school'
            });
          }
          gradeId = gradeRecord.id;
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        schoolId,
        gradeId,
        isActive: true
      });

      // Generate tokens
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
      );

      let gradeObj = null;
      if (gradeId) {
        const gradeRecord = await Grade.findByPk(gradeId, { attributes: ['id', 'name'] });
        if (gradeRecord) gradeObj = gradeRecord;
      }

      res.status(201).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            schoolId: user.schoolId,
            gradeId: user.gradeId,
            grade: gradeObj
          },
          token,
          refreshToken
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      console.log('Login attempt:', { email: req.body.email });
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        console.log('Login failed: Missing email or password');
        return res.status(400).json({
          status: 'error',
          message: 'Email and password are required'
        });
      }

      // Find user
      const user = await User.findOne({ 
        where: { 
          email,
          isActive: true 
        },
        include: [
          {
            model: School,
            attributes: ['id', 'name', 'code']
          },
          {
            model: Grade,
            attributes: ['id', 'name']
          }
        ]
      });

      if (!user) {
        console.log('Login failed: User not found');
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        console.log('Login failed: Invalid password');
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        school: user.School,
        grade: user.Grade,
        gradeId: user.gradeId
      };

      console.log('Login successful:', { userId: user.id, role: user.role });

      // Return success response with user data
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred during login'
      });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          status: 'error',
          message: 'Refresh token is required'
        });
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid refresh token'
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const newRefreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
      );

      res.json({
        status: 'success',
        data: {
          token,
          refreshToken: newRefreshToken
        }
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token'
      });
    }
  },

  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'Token is required'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid token'
        });
      }

      res.json({
        status: 'success',
        data: {
          valid: true
        }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
  }
};

module.exports = authController; 