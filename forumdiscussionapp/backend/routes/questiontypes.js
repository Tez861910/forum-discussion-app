const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateQuestionTypeCreate,
  validateQuestionTypeUpdate,
  validateQuestionTypeDelete,
} = require('../body-validation/question-type-validation');

const { handleQuestionTypeDeleteById } = require('../route-files/question-type-routes/handle-question-type-delete-id');
const { handleQuestionTypeUpdateById } = require('../route-files/question-type-routes/handle-question-type-update-id');
const { handleQuestionTypeCreate } = require('../route-files/question-type-routes/handle-question-type-create');
const { handleQuestionTypeGetAll } = require('../route-files/question-type-routes/handle-question-types-get-all');

router.use(express.json());
router.use(cors());

// Get all question types
router.get('/get/all', verifyJwt, handleQuestionTypeGetAll);

// Create a new question type
router.post('/create', verifyJwt, validateQuestionTypeCreate, handleQuestionTypeCreate);

// Update a question type
router.put('/update/:questionTypeId', verifyJwt, validateQuestionTypeUpdate, handleQuestionTypeUpdateById);

// Delete a question type
router.delete('/delete/:questionTypeId', verifyJwt, validateQuestionTypeDelete, handleQuestionTypeDeleteById);

module.exports = router;
