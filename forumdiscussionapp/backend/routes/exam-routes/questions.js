import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateQuestionCreate,
  validateQuestionUpdate,
  validateQuestionDelete,
} from '../../body-validation/exam-validation-functions/question-validation.js';

import { handleQuestionDeleteById } from '../../route-files/exam-function-routes/question-routes/handle-question-delete-id.js';
import { handleQuestionUpdateById } from '../../route-files/exam-function-routes/question-routes/handle-question-update-id.js';
import { handleQuestionCreate } from '../../route-files/exam-function-routes/question-routes/handle-question-create.js';
import { handleQuestionGetAll } from '../../route-files/exam-function-routes/question-routes/handle-questions-get-all.js';

const router = express.Router();

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

export default router;
