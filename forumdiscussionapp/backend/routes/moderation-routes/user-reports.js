import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateUserReportCreate,
  validateUserReportUpdate,
  validateUserReportDelete,
} from '../../body-validation/user-report-validation.js';

import { handleUserReportCreate } from '../../route-files/user-report-routes/handle-user-report-create.js';
import { handleUserReportUpdate } from '../../route-files/user-report-routes/handle-user-report-update.js';
import { handleUserReportDelete } from '../../route-files/user-report-routes/handle-user-report-delete.js';
import { handleUserReportGetAll } from '../../route-files/user-report-routes/handle-user-report-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all user reports
router.get('/get/all', verifyJwt, handleUserReportGetAll);

// Create a new user report
router.post('/create', verifyJwt, validateUserReportCreate, handleUserReportCreate);

// Update a user report
router.put('/update/:reportId', verifyJwt, validateUserReportUpdate, handleUserReportUpdate);

// Delete a user report
router.delete('/delete/:reportId', verifyJwt, validateUserReportDelete, handleUserReportDelete);

export default router;
