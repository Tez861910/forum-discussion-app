import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validatePollCreate,
  validatePollUpdate,
  validatePollDelete,
  validatePollGetCreatedByUserId,
} from '../../body-validation/forum-validation-functions/poll-validation.js';

import { handlePollDeleteById } from '../../route-files/forum-function-routes/poll-routes/handle-poll-delete-id.js';
import { handlePollUpdateById } from '../../route-files/forum-function-routes/poll-routes/handle-poll-update-id.js';
import { handlePollCreate } from '../../route-files/forum-function-routes/poll-routes/handle-poll-create.js';
import { handlePollGet } from '../../route-files/forum-function-routes/poll-routes/handle-poll-get.js';
import { handlePollGetCreatedByUserId } from '../../route-files/forum-function-routes/poll-routes/handle-polls-get-createdbyuserid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all polls
router.get('/get', verifyJwt, handlePollGet);

// Create a new poll
router.post('/create/:forumId', verifyJwt, validatePollCreate, handlePollCreate);

// Update a poll
router.put('/update/:pollId', verifyJwt, validatePollUpdate, handlePollUpdateById);

// Delete a poll
router.delete('/delete/:pollId', verifyJwt, validatePollDelete, handlePollDeleteById);

// API for retrieving polls created by a specific user.
router.get('/get/createdbyuser/:userId', verifyJwt, validatePollGetCreatedByUserId, handlePollGetCreatedByUserId);

export default router;
