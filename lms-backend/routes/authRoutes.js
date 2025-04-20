// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Grade, ActivationCode, School } = require("../models");

// Public routes
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, grade, activationCode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    let grade_identifier = null;
    let school = null;

    if (role.toLowerCase() === "student") {
      const existingActivationCode = await ActivationCode.findOne({ where: { code: activationCode } });
      if (!existingActivationCode) {
        return res.status(400).json({ message: "Invalid activation code" });
      }

      let activationCategory = grade;
      if (activationCategory === 'Pre-nursery') {
        activationCategory = 'Nursery';
      } else if (activationCategory === 'Play Home') {
        activationCategory = 'Play Group';
      }

      if (existingActivationCode.category.toLowerCase() !== activationCategory.toLowerCase()) {
        return res.status(400).json({ message: "Invalid activation code" });
      }

      await ActivationCode.destroy({ where: { code: activationCode } });

      grade_identifier = await Grade.findOne({ where: { name: grade } });
    } else if (role.toLowerCase() === "teacher") {
      
      school = await School.findOne({ where: { id: activationCode } });
      if (!school) {
        return res.status(400).json({ message: "Invalid school for activation code" });
      }
    }

    // Create user (password will be hashed by the beforeSave hook)
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: (role || "student").toLowerCase(),
      gradeId: grade_identifier ? grade_identifier.id : null,
      schoolId: school ? school.id : null,
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log(res.data);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password using the model's validatePassword method
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Update last login
    await user.update({ lastLogin: new Date() });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        gradeId: user.gradeId,
      },
      // grade: [id: user.gradeId, name: ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
router.put("/change-password", isAuthenticated, changePassword);

module.exports = router;
