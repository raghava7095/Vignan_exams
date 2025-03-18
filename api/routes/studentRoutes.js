const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Student submits exam
router.post("/submit", async (req, res) => {
  try {
    const { rollNumber, year, section, branch, examId, answers } = req.body;

    let score = 0;
    for (let answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        score += 1;
      }
    }

    const student = new Student({ rollNumber, year, section, branch, examId, score, answers });
    await student.save();

    res.status(201).json({ message: "Exam submitted", score });
  } catch (error) {
    res.status(500).json({ error: "Error submitting exam" });
  }
});

module.exports = router;
