import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateManagerCreate,
  validateManagerUpdate,
  validateManagerDelete,
  validateManagerGet,
} from '../../body-validation/group-manager-validation.js';

import { handleManagerCreate } from '../../route-files/group-manager-routes/handle-manager-create.js';
import { handleManagerUpdate } from '../../route-files/group-manager-routes/handle-manager-update.js';
import { handleManagerDelete } from '../../route-files/group-manager-routes/handle-manager-delete.js';
import { handleManagerGet } from '../../route-files/group-manager-routes/handle-manager-get.js';

const router = express.Router();

router.use(express.json());

// Create group manager
router.post('/create', verifyJwt, validateManagerCreate, handleManagerCreate);

// Update group manager by ID
router.put('/update/:managerId', verifyJwt, validateManagerUpdate, handleManagerUpdate);

// Delete group manager by ID
router.delete('/delete/:managerId', verifyJwt, validateManagerDelete, handleManagerDelete);

// Get group manager by ID
router.get('/get/:managerId', verifyJwt, validateManagerGet, handleManagerGet);

export default router;
