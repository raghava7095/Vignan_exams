import { useState } from "react";
import { createTest } from "../api/testApi";

export default function CreateTest() {
  const [testName, setTestName] = useState("");

  const handleCreateTest = async () => {
    if (!testName.trim()) {
      alert("Test name is required!");
      return;
    }

    const categories = ["Coding", "Math", "Behavioral", "Aptitude"]; // Fixed categories

    try {
      const response = await createTest({ testName, categories });
      alert(response.message);
      setTestName(""); // Clear input field after success
    } catch (error) {
      alert("Error creating test");
      console.log(error);
      
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create New Test</h2>
      <input
        type="text"
        placeholder="Enter test name"
        className="border p-2 rounded w-full"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={handleCreateTest}>
        Create Test
      </button>
    </div>
  );
}
