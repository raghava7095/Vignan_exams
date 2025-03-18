const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Coding", "Math", "Aptitude", "Behavioral"],
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [(val) => val.length === 4, "Must have exactly 4 options"],
  },
  correct_answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
