const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student: {
        fullName: student.fullName,
        email: student.email,
        gradeLevel: student.gradeLevel
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;