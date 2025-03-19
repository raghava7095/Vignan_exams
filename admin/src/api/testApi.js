import axios from "axios";

const API_URL = "http://localhost:5000/api/tests";

// 🟢 Create a new test
export const createTest = async (testData) => {
  const response = await axios.post(`${API_URL}/create`, testData);
  return response.data;
};

// 🟢 Fetch all tests
export const fetchTests = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// 🟢 Fetch questions of a specific test (by testId)
export const fetchQuestions = async (testId) => {
  const response = await axios.get(`${API_URL}/${testId}/questions`);
  return response.data.questions;
};

// 🔵 Update a question by questionId
export const updateQuestion = async (questionId, updatedData) => {
  await axios.put(`${API_URL}/questions/${questionId}`, updatedData);
};

// 🔴 Delete a question by questionId
export const deleteQuestion = async (questionId) => {
  await axios.delete(`${API_URL}/questions/${questionId}`);
};

// 🟢 Get 20 random questions (new)
export const getTest = async (testName, categoryName) => {
  const response = await axios.get(`${API_URL}/get-random/${categoryName}/${testName}`);
  return response.data;
};
