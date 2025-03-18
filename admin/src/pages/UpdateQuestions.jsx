import { useState } from "react";
import axios from "axios";

export default function UpdateQuestions() {
  const [testName, setTestName] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const categories = ["Coding", "Math", "Aptitude", "Behavioral"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/questions/add", {
        testName,
        category,
        question,
        options,
        correct_answer: correctAnswer,
      });
      console.log(response.data);
      alert("Question added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding question");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Test Name Input */}
        <input
          type="text"
          placeholder="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Question Input */}
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* Options Inputs */}
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        {/* Correct Answer Input */}
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}
