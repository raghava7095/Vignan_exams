const express = require('express');
const { createTest, getTestById } = require('../controllers/testController');

const router = express.Router();

router.post('/tests', createTest);
router.get('/tests/:id', getTestById);

module.exports = router;
