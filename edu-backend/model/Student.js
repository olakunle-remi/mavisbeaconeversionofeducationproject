const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  gradeLevel: String,
  progress: {
    math: Number,
    english: Number,
    science: Number
  },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);