import axios from "axios";

const API_URL = "http://localhost:5000/api/tests";

// Create a new test
export const createTest = async (testData) => {
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testData),
  });

  if (!response.ok) {
    throw new Error("Failed to create test");
  }

  return await response.json();
};


// 🟢 Fetch tests
export const fetchTests = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// 🟢 Fetch questions of a test
export const fetchQuestions = async (testId) => {
  const response = await axios.get(`${API_URL}/${testId}/questions`);
  return response.data.questions;
};

// 🔵 Update question
export const updateQuestion = async (questionId, updatedData) => {
  await axios.put(`${API_URL}/questions/${questionId}`, updatedData);
};

// 🔴 Delete question
export const deleteQuestion = async (questionId) => {
  await axios.delete(`${API_URL}/questions/${questionId}`);
};
