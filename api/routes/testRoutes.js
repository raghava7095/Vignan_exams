const express = require("express");
const router = express.Router();
const Test = require("../models/Test");


// ✅ 1️⃣ Create a new test
router.post("/create", async (req, res) => {
  try {
    const { testName } = req.body;

    if (!testName) {
      return res.status(400).json({ message: "Test name is required" });
    }

    // Fixed categories
    const categories = ["Coding", "Math", "Behavioral", "Aptitude"];

    const newTest = new Test({
      testName,
      categories,
      status: "Pending",
    });

    await newTest.save();
    res.status(201).json({ message: "Test created successfully", newTest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 2️⃣ Get all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 3️⃣ Start a test (Make it live)
router.post("/start", async (req, res) => {
  try {
    const { testName } = req.body;

    const test = await Test.findOne({ testName });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    test.status = "Live";
    await test.save();

    res.status(200).json({ message: "Test started successfully", test });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 4️⃣ Stop a test
router.post("/stop", async (req, res) => {
  try {
    const { testName } = req.body;

    const test = await Test.findOne({ testName });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    test.status = "Stopped";
    await test.save();

    res.status(200).json({ message: "Test stopped successfully", test });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 5️⃣ Get all live tests
router.get("/live", async (req, res) => {
  try {
    const liveTests = await Test.find({ status: "Live" });
    res.status(200).json(liveTests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 6️⃣ Add a question to a test (Manually specify category)
router.post("/add-question", async (req, res) => {
  try {
    const { testName, category, question, options, correctAnswer } = req.body;

    if (!testName || !category || !question || !options || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const test = await Test.findOne({ testName });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Ensure category exists in the test
    if (!test.categories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Add question
    test.questions.push({ category, question, options, correctAnswer });
    await test.save();

    res.status(200).json({ message: "Question added successfully", test });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all tests
router.get("/all", async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
});

// Get questions of a test
router.get("/:testId/questions", async (req, res) => {
  try {
    const testId = req.params.testId;
    const test = await TestModel.findById(testId).populate("questions");
    if (!test) return res.status(404).json({ message: "Test not found" });

    res.json({ questions: test.questions });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
