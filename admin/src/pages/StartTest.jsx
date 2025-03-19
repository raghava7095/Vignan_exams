import { useState } from "react";
import { getTest } from "../api/testApi";

export default function StartTest() {
  const [testName, setTestName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleFetchTest = async () => {
    if (!testName || !categoryName) {
      alert("Please provide both test name and category!");
      return;
    }
    setLoading(true);
    try {
      const response = await getTest(testName, categoryName);
      setQuestions(response.questions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching test:", error);
      setLoading(false);
    }
  };

  const handleOptionChange = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleSubmit = () => {
    console.log("User answers:", answers);
    alert("Test submitted! (For now just logs answers to console)");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Start Test</h2>

      {/* Input fields */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Test Name (e.g., Mock Interview Test)"
          className="border p-2 rounded w-full mb-2"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Category (e.g., Math)"
          className="border p-2 rounded w-full mb-4"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded w-full"
          onClick={handleFetchTest}
        >
          Fetch Test
        </button>
      </div>

      {loading && <div>Loading questions...</div>}

      {/* Questions Section */}
      {questions.length > 0 && !loading && (
        <>
          {questions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-1">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={opt}
                      checked={answers[index] === opt}
                      onChange={() => handleOptionChange(index, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 text-white p-2 rounded w-full"
            onClick={handleSubmit}
          >
            Submit Test
          </button>
        </>
      )}
    </div>
  );
}
