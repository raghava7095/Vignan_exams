const { Test } = require('../models/testModel');

// Create Test API
const createTest = async (req, res) => {
  const { testName, categories, questionsText } = req.body;

  if (!testName || !questionsText) {
    return res.status(400).json({ message: "Test name and questions are required" });
  }

  // Parse questions from textarea input
  const parsedQuestions = questionsText.split('\n\n').map(block => {
    const [questionLine, ...rest] = block.split('\n');
    const question = questionLine.trim();
    const options = rest.filter(line => line.startsWith('(')).map(opt => opt.slice(1, -1));
    const correct = rest.find(line => line.startsWith('['))?.slice(1, -1);

    return { question, options, correctAnswer: correct };
  });

  try {
    const newTest = await Test.create({ testName, categories, questions: parsedQuestions });
    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get Test API
const getTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json({ questions: test.questions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = { createTest, getTestById };
