import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateResultCreate,
  validateResultUpdate,
  validateResultDelete,
} from '../../body-validation/results-validation.js';

import { handleResultCreate } from '../../route-files/results-routes/handle-result-create.js';
import { handleResultUpdate } from '../../route-files/results-routes/handle-result-update.js';
import { handleResultDelete } from '../../route-files/results-routes/handle-result-delete.js';
import { handleResultGetAll } from '../../route-files/results-routes/handle-result-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all exam results
router.get('/get/all', verifyJwt, handleResultGetAll);

// Create new exam result
router.post('/create', verifyJwt, validateResultCreate, handleResultCreate);

// Update exam result
router.put('/update/:resultId', verifyJwt, validateResultUpdate, handleResultUpdate);

// Delete exam result
router.delete('/delete/:resultId', verifyJwt, validateResultDelete, handleResultDelete);

export default router;
