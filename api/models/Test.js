const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  examLive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Test", TestSchema);
