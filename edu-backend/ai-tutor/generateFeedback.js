function generateFeedback(progress) {
  if (progress.score >= 80 && progress.timeTaken < 60) {
    return "Outstanding! You're mastering this quickly.";
  } else if (progress.score < 50) {
    return "Let’s review the basics — don’t worry, improvement is coming!";
  } else if (progress.timeTaken > 120) {
    return "Great effort! Try to pick up the pace a bit next time.";
  } else {
    return "Nice work! Keep up the steady learning.";
  }
}

module.exports = generateFeedback;