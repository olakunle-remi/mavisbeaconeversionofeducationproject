const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  subject: { type: String, required: true },
  content: [{ type: String }], // paragraphs, prompts, etc.
  questions: [
    {
      prompt: String,
      options: [String],
      correctAnswer: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lesson", lessonSchema);