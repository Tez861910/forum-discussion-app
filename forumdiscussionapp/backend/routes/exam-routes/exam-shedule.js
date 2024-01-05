import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateScheduleCreate,
  validateScheduleUpdate,
  validateScheduleDelete,
} from '../../body-validation/exam-validation-functions/exam-schedule-validation.js';

import { handleScheduleCreate } from '../../route-files/exam-function-routes/exam-schedule-routes/handle-schedule-create.js';
import { handleScheduleUpdate } from '../../route-files/exam-function-routes/exam-schedule-routes/handle-schedule-update.js';
import { handleScheduleDelete } from '../../route-files/exam-function-routes/exam-schedule-routes/handle-schedule-delete.js';
import { handleScheduleGetAll } from '../../route-files/exam-function-routes/exam-schedule-routes/handle-schedule-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all exam schedules
router.get('/get/all', verifyJwt, handleScheduleGetAll);

// Create new exam schedule
router.post('/create', verifyJwt, validateScheduleCreate, handleScheduleCreate);

// Update exam schedule
router.put('/update/:scheduleId', verifyJwt, validateScheduleUpdate, handleScheduleUpdate);

// Delete exam schedule
router.delete('/delete/:scheduleId', verifyJwt, validateScheduleDelete, handleScheduleDelete);

export default router;
