import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateBanCreate,
  validateBanUpdate,
  validateBanDelete,
} from '../../body-validation/moderation-validation-functions/ban-validation.js';

import { handleBanCreate } from '../../route-files/moderation-function-routes/ban-routes/handle-ban-create.js';
import { handleBanUpdate } from '../../route-files/moderation-function-routes/ban-routes/handle-ban-update.js';
import { handleBanDelete } from '../../route-files/moderation-function-routes/ban-routes/handle-ban-delete.js';
import { handleBanGetAll } from '../../route-files/moderation-function-routes/ban-routes/handle-ban-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all bans
router.get('/get/all', verifyJwt, handleBanGetAll);

// Create a new ban
router.post('/create', verifyJwt, validateBanCreate, handleBanCreate);

// Update a ban
router.put('/update/:banId', verifyJwt, validateBanUpdate, handleBanUpdate);

// Delete a ban
router.delete('/delete/:banId', verifyJwt, validateBanDelete, handleBanDelete);

export default router;
