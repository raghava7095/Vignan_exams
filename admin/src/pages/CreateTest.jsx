import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTest } from "../api/testApi";

export default function CreateTest() {
  const [testName, setTestName] = useState("");
  const [questionsText, setQuestionsText] = useState("");
  const navigate = useNavigate();

  const handleCreateTest = async () => {
    if (!testName.trim() || !questionsText.trim()) {
      alert("Test name and questions are required!");
      return;
    }

    // Parse questions from textarea
    const questions = questionsText
      .trim()
      .split("\n")
      .map((line) => {
        const questionPart = line.split("(")[0].trim();
        const optionsPart = line.match(/\((.*?)\)/)?.[1]?.split(",").map(opt => opt.trim()) || [];
        const answerPart = line.match(/\[(.*?)\]/)?.[1]?.trim();

        return {
          question: questionPart,
          options: optionsPart,
          answer: answerPart,
        };
      });

    try {
      const response = await createTest({ testName, questions });
      alert(response.message || "Test created successfully!");
      setTestName("");
      setQuestionsText("");
      navigate("/start-test"); // Navigate to next page after success
    } catch (error) {
      alert("Error creating test");
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Test</h2>
      <input
        type="text"
        placeholder="Enter test name"
        className="border p-2 rounded w-full mb-4"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
      />
      <textarea
        rows={10}
        placeholder={`Enter questions in this format:\n\n1. What is 2+2? (2, 3, 4, 5) [4]`}
        className="border p-2 rounded w-full mb-4"
        value={questionsText}
        onChange={(e) => setQuestionsText(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={handleCreateTest}
      >
        Save
      </button>
    </div>
  );
}
