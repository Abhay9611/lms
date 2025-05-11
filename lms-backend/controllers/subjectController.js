const { Subject } = require("../models");

// Create a new subject
const createSubject = async (req, res) => {
  try {
    const { name, code, description, gradeId } = req.body;

    // Check if subject code already exists
    const existingSubject = await Subject.findOne({ where: { code } });
    if (existingSubject) {
      return res.status(400).json({ message: "Subject code already exists" });
    }

    const subject = await Subject.create({
      name,
      code,
      description,
      gradeId,
    });

    res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    console.error("Create subject error:", error);
    res.status(500).json({ message: "Error creating subject" });
  }
};

// Get all subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      where: { isActive: true },
    });
    res.json(subjects);
  } catch (error) {
    console.error("Get subjects error:", error);
    res.status(500).json({ message: "Error getting subjects" });
  }
};

// Get a single subject
const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      where: {
        id: req.params.id,
        isActive: true,
      },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(subject);
  } catch (error) {
    console.error("Get subject error:", error);
    res.status(500).json({ message: "Error getting subject" });
  }
};

// Update a subject
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    if (req.body.code && req.body.code !== subject.code) {
      const existingSubject = await Subject.findOne({
        where: { code: req.body.code },
      });
      if (existingSubject) {
        return res.status(400).json({ message: "Subject code already exists" });
      }
    }

    await subject.update(req.body);
    res.json({
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    console.error("Update subject error:", error);
    res.status(500).json({ message: "Error updating subject" });
  }
};

// Delete a subject (soft delete)
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.update({ isActive: false });
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Delete subject error:", error);
    res.status(500).json({ message: "Error deleting subject" });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
};
