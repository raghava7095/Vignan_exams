const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const testSchema = new mongoose.Schema({
  testName: { type: String, required: true }, // e.g., "Mock Test"
  categoryName: { type: String, required: true }, // e.g., "Math"
  questions: [questionSchema]
});

const Test = mongoose.model('Test', testSchema);

module.exports = { Test };
