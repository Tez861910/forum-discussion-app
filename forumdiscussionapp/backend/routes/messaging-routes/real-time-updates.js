import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateUpdateCreate,
  validateUpdateGet,
} from '../../body-validation/real-time-updates-validation.js';

import { handleUpdateCreate } from '../../route-files/real-time-updates-routes/handle-update-create.js';
import { handleUpdateGet } from '../../route-files/real-time-updates-routes/handle-update-get.js';

const router = express.Router();

router.use(express.json());

// Create real-time update
router.post('/create', verifyJwt, validateUpdateCreate, handleUpdateCreate);

// Get real-time update by ID
router.get('/get/:updateId', verifyJwt, validateUpdateGet, handleUpdateGet);

export default router;
