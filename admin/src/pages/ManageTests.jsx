import { useEffect, useState } from "react";
import { fetchTests, fetchQuestions, updateQuestion, deleteQuestion } from "../api/testApi";

export default function ManageQuestions() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [questions, setQuestions] = useState([]); // ✅ Set default as an empty array
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    fetchTests()
      .then((data) => {
        console.log("Fetched tests:", data); // Debugging
        setTests(data);
      })
      .catch((error) => console.error("Error fetching tests:", error));
  }, []);
  

  const loadQuestions = async (testId) => {
    console.log("Selected Test ID:", testId);
    setSelectedTest(testId);
  
    try {
      const fetchedQuestions = await fetchQuestions(testId);
      console.log("Fetched Questions:", fetchedQuestions);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  

  const handleEdit = (question) => {
    setEditingQuestion({ ...question });
  };

  const handleSaveEdit = async () => {
    await updateQuestion(editingQuestion._id, editingQuestion);
    setEditingQuestion(null);
    loadQuestions(selectedTest);
  };

  const handleDelete = async (questionId) => {
    await deleteQuestion(questionId);
    setQuestions(questions.filter((q) => q._id !== questionId));
  };

  const fetchQuestions = async (testId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tests/${testId}/questions`);
      if (!response.ok) throw new Error("Failed to fetch questions");
  
      const data = await response.json();
      console.log("Fetched Questions:", data);
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]); // Prevents undefined state
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Questions</h2>
      <select className="border p-2 rounded w-full mb-4" onChange={(e) => loadQuestions(e.target.value)}>
        <option>Select Test</option>
        {tests.map((test) => (
          <option key={test._id} value={test._id}>
            {test.testName}
          </option>
        ))}
      </select>

      {questions.map((q) => (
        <div key={q._id} className="border p-4 mb-2 rounded flex justify-between">
          {editingQuestion && editingQuestion._id === q._id ? (
            <div>
              <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
              />
              {editingQuestion.options.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  className="border p-2 rounded w-full mb-2"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...editingQuestion.options];
                    newOptions[idx] = e.target.value;
                    setEditingQuestion({ ...editingQuestion, options: newOptions });
                  }}
                />
              ))}
              <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="bg-gray-500 text-white p-2 rounded" onClick={() => setEditingQuestion(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="font-semibold">{q.question}</p>
              <ul className="list-disc ml-6">
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
              <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={() => handleEdit(q)}>
                Edit
              </button>
              <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDelete(q._id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
