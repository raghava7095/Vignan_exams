const { Test } = require('../models/testModel');

// Admin API: Create Test (with questions)
exports.createTest = async (req, res) => {
  const { testName, categoryName, questionsText } = req.body;

  if (!testName || !categoryName || !questionsText) {
    return res.status(400).json({ message: "Test name, category, and questions are required" });
  }

  // Parse questionsText (textarea format)
  const parsedQuestions = questionsText.split('\n\n').map(block => {
    const [questionLine, ...rest] = block.split('\n');
    const question = questionLine.trim();
    const options = rest.filter(line => line.startsWith('(')).map(opt => opt.slice(1, -1));
    const correct = rest.find(line => line.startsWith('['))?.slice(1, -1);

    return { question, options, correctAnswer: correct };
  });

  try {
    const newTest = await Test.create({ testName, categoryName, questions: parsedQuestions });
    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Student API: Get 20 Random Questions from a category inside a test
exports.getRandomQuestions = async (req, res) => {
  const { categoryName, testName } = req.params;

  try {
    const test = await Test.findOne({ categoryName, testName });
    if (!test || !test.questions.length) {
      return res.status(404).json({ message: "Test not found or has no questions." });
    }
    

    const shuffled = test.questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 20);

    res.json({ questions: selectedQuestions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
