import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTest } from "../api/testApi";

export default function CreateTest() {
  const [testName, setTestName] = useState("");
  const [questionsText, setQuestionsText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const categoriesOptions = ["Coding", "Math", "Behavioral", "Aptitude"];

  const handleCreateTest = async () => {
    if (!testName.trim() || !questionsText.trim() || !selectedCategory) {
      alert("Please fill all fields including category!");
      return;
    }

    try {
      const response = await createTest({
        testName,
        categoryName: selectedCategory,
        questionsText,
      });

      alert(response.message || "Test created successfully!");
      setTestName("");
      setQuestionsText("");
      setSelectedCategory("");
      navigate("/start-test");
    } catch (error) {
      alert("Error creating test");
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Test</h2>

      {/* Test Name */}
      <input
        type="text"
        placeholder="Enter test name"
        className="border p-2 rounded w-full mb-4"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
      />

      {/* Single Category */}
      <div className="mb-4">
        <p className="mb-2 font-semibold">Select Category:</p>
        <div className="flex flex-wrap gap-2">
          {categoriesOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`border px-3 py-1 rounded ${
                selectedCategory === cat ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Text */}
      <textarea
        rows={10}
        placeholder={`Format:\nQuestion (option1, option2, option3, option4) [correct answer]\n\nExample:\nWhat is 2+2? (2, 3, 4, 5) [4]\nWho is CEO of Tesla? (Jeff, Elon, Bill, Satya) [Elon]`}
        className="border p-2 rounded w-full mb-4"
        value={questionsText}
        onChange={(e) => setQuestionsText(e.target.value)}
      ></textarea>

      {/* Save Button */}
      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={handleCreateTest}
      >
        Save Test
      </button>
    </div>
  );
}
