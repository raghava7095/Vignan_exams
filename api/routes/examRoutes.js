const express = require("express");
const Exam = require("../models/Exam");

const router = express.Router();

// Create a new exam
router.post("/create", async (req, res) => {
  try {
    const { testName, categories, duration } = req.body;

    const newExam = new Exam({ testName, categories, duration });
    await newExam.save();

    res.status(201).json({ message: "Exam created successfully", newExam });
  } catch (error) {
    res.status(500).json({ error: "Error creating exam" });
  }
});

// Start/Stop Exam
router.post("/toggle-exam", async (req, res) => {
  try {
    const { testName, status } = req.body;

    await Exam.findOneAndUpdate({ testName }, { examLive: status });

    res.json({ message: `Exam ${testName} is now ${status ? "live" : "stopped"}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to update exam status" });
  }
});

// Get Live Exams
router.get("/live", async (req, res) => {
  try {
    const liveExams = await Exam.find({ examLive: true }).select("testName categories duration");
    res.json({ liveExams });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch live exams" });
  }
});

module.exports = router;
