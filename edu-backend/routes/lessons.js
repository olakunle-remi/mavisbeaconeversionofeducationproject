const express = require("express");
const Lesson = require("../models/Lesson");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new lesson (admin only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json({ message: "Lesson created", lesson });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all lessons
router.get("/", async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

// Get lessons by grade
router.get("/:gradeLevel", async (req, res) => {
  const lessons = await Lesson.find({ gradeLevel: req.params.gradeLevel });
  res.json(lessons);
});

module.exports = router;