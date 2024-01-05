import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateUserPollVoteCreate,
  validateUserPollVoteDelete,
  validateUserPollVoteGetByUserId,
} from '../../body-validation/forum-validation-functions/user-vote-validation.js';

import { handleUserPollVoteDeleteById } from '../../route-files/forum-function-routes/user-vote-routes/handle-user-poll-vote-delete-id.js';
import { handleUserPollVoteCreate } from '../../route-files/forum-function-routes/user-vote-routes/handle-user-poll-vote-create.js';
import { handleUserPollVoteGetByUserId } from '../../route-files/forum-function-routes/user-vote-routes/handle-user-poll-votes-get-byuserid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Create a new user poll vote
router.post('/create', verifyJwt, validateUserPollVoteCreate, handleUserPollVoteCreate);

// Delete a user poll vote
router.delete('/delete/:userPollVoteId', verifyJwt, validateUserPollVoteDelete, handleUserPollVoteDeleteById);

// API for retrieving user poll votes for a specific user.
router.get('/get/byuser/:userId', verifyJwt, validateUserPollVoteGetByUserId, handleUserPollVoteGetByUserId);

export default router;
