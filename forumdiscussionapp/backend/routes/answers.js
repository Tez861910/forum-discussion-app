const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateAnswerCreate,
  validateAnswerUpdate,
  validateAnswerDelete,
} = require('../body-validation/answer-validation');

const { handleAnswerDeleteById } = require('../route-files/answer-routes/handle-answer-delete-id');
const { handleAnswerUpdateById } = require('../route-files/answer-routes/handle-answer-update-id');
const { handleAnswerCreate } = require('../route-files/answer-routes/handle-answer-create');
const { handleAnswersGetAll } = require('../route-files/answer-routes/handle-answers-get-all');

router.use(express.json());
router.use(cors());

// Get all answers
router.get('/get/all', verifyJwt, handleAnswersGetAll);

// Create a new answer
router.post('/create', verifyJwt, validateAnswerCreate, handleAnswerCreate);

// Update an answer
router.put('/update/:answerId', verifyJwt, validateAnswerUpdate, handleAnswerUpdateById);

// Delete an answer
router.delete('/delete/:answerId', verifyJwt, validateAnswerDelete, handleAnswerDeleteById);

module.exports = router;
