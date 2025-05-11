const { User, UserProfile } = require('../models');
const { ValidationError } = require('sequelize');

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: UserProfile,
        as: 'profile'
      },
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: UserProfile,
        as: 'profile'
      }],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only allow admins or the user themselves to view the profile
    if (req.user.role !== 'admin' && req.user.id !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

// Get current user's profile
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        model: UserProfile,
        as: 'profile'
      }],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Error retrieving current user' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;

    // Only allow admins or the user themselves to update the profile
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [profile] = await UserProfile.upsert({
      userId,
      ...req.body
    });

    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: 'Invalid data provided', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Error updating profile' });
    }
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isValid = await user.validatePassword(currentPassword);
    if (!isValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    await user.update({ password: newPassword });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: 'Invalid password', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Error changing password' });
    }
  }
};

// Update last login
const updateLastLogin = async (userId) => {
  try {
    await UserProfile.update(
      { lastLoginAt: new Date() },
      { where: { userId } }
    );
  } catch (error) {
    console.error('Update last login error:', error);
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: UserProfile,
        as: 'profile'
      }],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  changePassword,
  updateLastLogin,
  deleteUser
}; 