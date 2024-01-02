const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateUserPollVoteCreate,
  validateUserPollVoteDelete,
  validateUserPollVoteGetByUserId,
} = require('../body-validation/user-vote-validation');

const { handleUserPollVoteDeleteById } = require('../route-files/user-vote-routes/handle-user-poll-vote-delete-id');
const { handleUserPollVoteCreate } = require('../route-files/user-vote-routes/handle-user-poll-vote-create');
const { handleUserPollVoteGetByUserId } = require('../route-files/user-vote-routes/handle-user-poll-votes-get-byuserid');

router.use(express.json());
router.use(cors());

// Create a new user poll vote
router.post('/create', verifyJwt, validateUserPollVoteCreate, handleUserPollVoteCreate);

// Delete a user poll vote
router.delete('/delete/:userPollVoteId', verifyJwt, validateUserPollVoteDelete, handleUserPollVoteDeleteById);

// API for retrieving user poll votes for a specific user.
router.get('/get/byuser/:userId', verifyJwt, validateUserPollVoteGetByUserId, handleUserPollVoteGetByUserId);

module.exports = router;
