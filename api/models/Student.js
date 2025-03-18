const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  year: { type: String, required: true },
  section: { type: String, required: true },
  branch: { type: String, required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  score: { type: Number, default: 0 },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
});

module.exports = mongoose.model("Student", studentSchema);
