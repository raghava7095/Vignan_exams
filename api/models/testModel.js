const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const testSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  questions: [questionSchema],
  categories: [String],
});

const Test = mongoose.model('Test', testSchema);

module.exports = { Test };
