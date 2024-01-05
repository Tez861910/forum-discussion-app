import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateStatusUpdate,
  validateUserStatusGet,
} from '../../body-validation/messaging-validation-functions/user-status-validation.js';

import { handleStatusUpdate } from '../../route-files/messaging-function-routes/user-status-routes/handle-status-update.js';
import { handleUserStatusGet } from '../../route-files/messaging-function-routes/user-status-routes/handle-user-status-get.js';

const router = express.Router();

router.use(express.json());

// Update user status
router.put('/update/:userId', verifyJwt, validateStatusUpdate, handleStatusUpdate);

// Get user status
router.get('/get/:userId', verifyJwt, validateUserStatusGet, handleUserStatusGet);

export default router;
