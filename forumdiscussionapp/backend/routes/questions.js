const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateQuestionCreate,
  validateQuestionUpdate,
  validateQuestionDelete,
} = require('../body-validation/question-validation');

const { handleQuestionDeleteById } = require('../route-files/question-routes/handle-question-delete-id');
const { handleQuestionUpdateById } = require('../route-files/question-routes/handle-question-update-id');
const { handleQuestionCreate } = require('../route-files/question-routes/handle-question-create');
const { handleQuestionGetAll } = require('../route-files/question-routes/handle-questions-get-all');

router.use(express.json());
router.use(cors());

// Get all questions
router.get('/get/all', verifyJwt, handleQuestionGetAll);

// Create a new question
router.post('/create', verifyJwt, validateQuestionCreate, handleQuestionCreate);

// Update a question
router.put('/update/:questionId', verifyJwt, validateQuestionUpdate, handleQuestionUpdateById);

// Delete a question
router.delete('/delete/:questionId', verifyJwt, validateQuestionDelete, handleQuestionDeleteById);

module.exports = router;
