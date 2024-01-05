import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateExamCreate,
  validateExamUpdate,
  validateExamDelete,
  validateExamGetByCourseId,
} from '../../body-validation/exam-validation-functions/exam-validation.js';

import { handleExamDeleteById } from '../../route-files/exam-function-routes/exam-routes/handle-exam-delete-id.js';
import { handleExamUpdateById } from '../../route-files/exam-function-routes/exam-routes/handle-exam-update-id.js';
import { handleExamCreate } from '../../route-files/exam-function-routes/exam-routes/handle-exam-create.js';
import { handleExamGetByCourseId } from '../../route-files/exam-function-routes/exam-routes/handle-exams-get-bycourseid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all exams for a specific course
router.get('/get/bycourse/:courseId', verifyJwt, validateExamGetByCourseId, handleExamGetByCourseId);

// Create a new exam
router.post('/create', verifyJwt, validateExamCreate, handleExamCreate);

// Update an exam
router.put('/update/:examId', verifyJwt, validateExamUpdate, handleExamUpdateById);

// Delete an exam
router.delete('/delete/:examId', verifyJwt, validateExamDelete, handleExamDeleteById);

export default router;
