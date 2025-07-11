const lesson = new Lesson({
  title: "Addition Basics",
  gradeLevel: "Grade 1",
  subject: "Math",
  content: [
    "Addition means putting things together.",
    "2 + 3 is five because you count two, then add three more."
  ],
  questions: [
    {
      prompt: "What is 2 + 3?",
      options: ["4", "5", "6"],
      correctAnswer: "5"
    }
  ]
});

await lesson.save();