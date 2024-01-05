import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateRealTimeGroupUpdateCreate,
  validateRealTimeGroupUpdateGet,
} from '../../body-validation/groupchat-validation-functions/real-time-group-update-validation.js';

import { handleRealTimeGroupUpdateCreate } from '../../route-files/groupchat-function-routes/real-time-group-updates-routes/handle-real-time-group-update-create.js';
import { handleRealTimeGroupUpdateGet } from '../../route-files/groupchat-function-routes/real-time-group-updates-routes/handle-real-time-group-update-get.js';

const router = express.Router();

router.use(express.json());

// Create real-time update for group
router.post('/create', verifyJwt, validateRealTimeGroupUpdateCreate, handleRealTimeGroupUpdateCreate);

// Get real-time update for group by ID
router.get('/get/:updateId', verifyJwt, validateRealTimeGroupUpdateGet, handleRealTimeGroupUpdateGet);

export default router;
