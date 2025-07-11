const express = require("express");
const Progress = require("../models/Progress");
const verifyToken = require("../middleware/authMiddleware");
const generateFeedback = require("../ai-tutor/generateFeedback");
const router = express.Router();

// Log progress with AI Tutor feedback
router.post("/", verifyToken, async (req, res) => {
  try {
    const feedback = generateFeedback(req.body);
    const progress = new Progress({
      ...req.body,
      studentId: req.user.id,
      feedbackSummary: feedback
    });
    await progress.save();
    res.status(201).json({ message: "Progress recorded", progress });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get progress by student ID
router.get("/:studentId", async (req, res) => {
  try {
    const progress = await Progress.find({ studentId: req.params.studentId })
      .populate("lessonId", "title gradeLevel subject");
    res.status(200).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;