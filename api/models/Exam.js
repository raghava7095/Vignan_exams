const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  testName: { type: String, required: true, unique: true },
  categories: [{ type: String, required: true }], // ['Math', 'Coding', 'Behavioral', 'Aptitude']
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  examLive: { type: Boolean, default: false },
  duration: { type: Number, required: true }, // Duration in minutes
});

module.exports = mongoose.model("Exam", examSchema);
