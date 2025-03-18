const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// Add a question to an exam
router.post("/add", async (req, res) => {
  try {
    const { testName, category, question, options, correct_answer } = req.body;

    if (!testName || !category || !question || !options || !correct_answer) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newQuestion = new Question({
      testName,
      category,
      question,
      options,
      correct_answer,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding question" });
  }
});

module.exports = router;
