const express = require('express');
const router = express.Router();
const { createTest, getRandomQuestions } = require('../controllers/testController');

// Admin creates test with questions
router.post('/create-test', createTest);

// Student gets 20 random questions for specific testName + categoryName
router.get('/get-random/:categoryName/:testName', getRandomQuestions);

module.exports = router;
