const express = require("express");
const multer = require("multer");
const Lesson = require("../models/Lesson");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// 🔸 Create a new lesson (with optional thumbnail)
router.post("/", verifyToken, upload.single("thumbnail"), async (req, res) => {
  try {
    const thumbnailPath = req.file ? req.file.path : null;

    const lesson = new Lesson({
      title: req.body.title,
      subject: req.body.subject,
      gradeLevel: req.body.gradeLevel,
      thumbnail: thumbnailPath,
      questions: JSON.parse(req.body.questions),
      createdBy: req.user.id
    });

    await lesson.save();
    res.status(201).json({ message: "Lesson created", lesson });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔸 Get all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔸 Get lessons by grade level
router.get("/:gradeLevel", async (req, res) => {
  try {
    const lessons = await Lesson.find({ gradeLevel: req.params.gradeLevel });
    res.status(200).json(lessons);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;