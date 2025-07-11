const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  score: Number,
  timeTaken: Number, // in seconds
  completedAt: { type: Date, default: Date.now },
  feedbackSummary: String
});

module.exports = mongoose.model("Progress", progressSchema);