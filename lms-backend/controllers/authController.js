const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student, Teacher, Admin, School, User } = require('../models');
const generateToken = require('../utils/token');

// Register Student
exports.registerStudent = async (req, res) => {
  const { email, password, schoolCode, grade } = req.body;

  try {
    const school = await School.findOne({ where: { code: schoolCode } });
    if (!school) return res.status(404).json({ message: 'Invalid school code' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      email,
      password: hashedPassword,
      schoolId: school.id,
      grade,
    });

    const token = generateToken({ id: student.id, role: 'student' });
    res.status(201).json({ student, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register Teacher
exports.registerTeacher = async (req, res) => {
  const { email, password, schoolCode } = req.body;

  try {
    const school = await School.findOne({ where: { code: schoolCode } });
    if (!school) return res.status(404).json({ message: 'Invalid school code' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      email,
      password: hashedPassword,
      schoolId: school.id,
    });

    const token = generateToken({ id: teacher.id, role: 'teacher' });
    res.status(201).json({ teacher, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashedPassword });

    const token = generateToken({ id: admin.id, role: 'admin' });
    res.status(201).json({ admin, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login (any user)
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let userModel;
    if (role === 'student') userModel = Student;
    else if (role === 'teacher') userModel = Teacher;
    else if (role === 'admin') userModel = Admin;
    else return res.status(400).json({ message: 'Invalid role' });

    const user = await userModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = generateToken({ id: user.id, role });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error getting profile' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByPk(req.user.id);

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    await user.update(req.body);
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await user.update({ password: hashedPassword });
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // TODO: Implement email sending with reset token
    res.json({ message: 'Password reset instructions sent to email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // TODO: Verify reset token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findByPk(decoded.id);
    
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    // await user.update({ password: hashedPassword });
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

exports.register = register;
exports.login = login;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
