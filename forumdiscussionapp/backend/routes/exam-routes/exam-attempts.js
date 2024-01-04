import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateAttemptCreate,
  validateAttemptUpdate,
  validateAttemptDelete,
} from '../../body-validation/exam-attempt-validation.js';

import { handleAttemptCreate } from '../../route-files/exam-attempt-routes/handle-attempt-create.js';
import { handleAttemptUpdate } from '../../route-files/exam-attempt-routes/handle-attempt-update.js';
import { handleAttemptDelete } from '../../route-files/exam-attempt-routes/handle-attempt-delete.js';
import { handleAttemptGetAll } from '../../route-files/exam-attempt-routes/handle-attempt-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all exam attempts
router.get('/get/all', verifyJwt, handleAttemptGetAll);

// Create new exam attempt
router.post('/create', verifyJwt, validateAttemptCreate, handleAttemptCreate);

// Update exam attempt
router.put('/update/:attemptId', verifyJwt, validateAttemptUpdate, handleAttemptUpdate);

// Delete exam attempt
router.delete('/delete/:attemptId', verifyJwt, validateAttemptDelete, handleAttemptDelete);

export default router;
