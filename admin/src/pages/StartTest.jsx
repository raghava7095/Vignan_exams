import { useEffect, useState } from "react";
import { getTest } from "../api/testApi";

export default function StartTest() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await getTest(); // you might want to pass testId if needed
        const shuffled = response.questions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, 20);
        setQuestions(selectedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test:", error);
        setLoading(false);
      }
    };

    fetchTest();
  }, []);

  const handleOptionChange = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleSubmit = () => {
    console.log("User answers:", answers);
    alert("Test submitted! (For now just logs answers to console)");
  };

  if (loading) return <div className="p-6">Loading questions...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Attempt Test</h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-6">
          <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
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
    </div>
  );
}
