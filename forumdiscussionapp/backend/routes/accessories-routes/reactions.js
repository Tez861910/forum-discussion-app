import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateReactionCreate,
  validateReactionUpdate,
  validateReactionDelete,
} from '../../body-validation/accessories-validation-functions/reaction-validation.js';

import { handleReactionCreate } from '../../route-files/accessories-function-routes/reaction-routes/handle-reaction-create.js';
import { handleReactionUpdate } from '../../route-files/accessories-function-routes/reaction-routes/handle-reaction-update.js';
import { handleReactionDelete } from '../../route-files/accessories-function-routes/reaction-routes/handle-reaction-delete.js';
import { handleReactionGetAll } from '../../route-files/accessories-function-routes/reaction-routes/handle-reaction-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all reactions
router.get('/get/all', verifyJwt, handleReactionGetAll);

// Create a new reaction
router.post('/create', verifyJwt, validateReactionCreate, handleReactionCreate);

// Update a reaction
router.put('/update/:reactionId', verifyJwt, validateReactionUpdate, handleReactionUpdate);

// Delete a reaction
router.delete('/delete/:reactionId', verifyJwt, validateReactionDelete, handleReactionDelete);

export default router;
