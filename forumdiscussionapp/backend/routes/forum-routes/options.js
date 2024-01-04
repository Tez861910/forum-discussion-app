import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validatePollOptionCreate,
  validatePollOptionUpdate,
  validatePollOptionDelete,
  validatePollOptionGetByPollId,
} from '../../body-validation/option-validation.js';

import { handlePollOptionDeleteById } from '../../route-files/option-routes/handle-poll-option-delete-id.js';
import { handlePollOptionUpdateById } from '../../route-files/option-routes/handle-poll-option-update-id.js';
import { handlePollOptionCreate } from '../../route-files/option-routes/handle-poll-option-create.js';
import { handlePollOptionGet } from '../../route-files/option-routes/handle-poll-option-get.js';
import { handlePollOptionGetByPollId } from '../../route-files/option-routes/handle-poll-options-get-bypollid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all poll options
router.get('/get', verifyJwt, handlePollOptionGet);

// Create a new poll option
router.post('/create', verifyJwt, validatePollOptionCreate, handlePollOptionCreate);

// Update a poll option
router.put('/update/:pollOptionId', verifyJwt, validatePollOptionUpdate, handlePollOptionUpdateById);

// Delete a poll option
router.delete('/delete/:pollOptionId', verifyJwt, validatePollOptionDelete, handlePollOptionDeleteById);

// API for retrieving poll options for a specific poll.
router.get('/get/bypoll/:pollId', verifyJwt, validatePollOptionGetByPollId, handlePollOptionGetByPollId);

export default router;
