const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validatePollCreate,
  validatePollUpdate,
  validatePollDelete,
  validatePollGetCreatedByUserId,
} = require('../body-validation/poll-validation');

const { handlePollDeleteById } = require('../route-files/poll-routes/handle-poll-delete-id');
const { handlePollUpdateById } = require('../route-files/poll-routes/handle-poll-update-id');
const { handlePollCreate } = require('../route-files/poll-routes/handle-poll-create');
const { handlePollGet } = require('../route-files/poll-routes/handle-poll-get');
const { handlePollGetCreatedByUserId } = require('../route-files/poll-routes/handle-polls-get-createdbyuserid');

router.use(express.json());
router.use(cors());

// Get all polls
router.get('/get', verifyJwt, handlePollGet);

// Create a new poll
router.post('/create', verifyJwt, validatePollCreate, handlePollCreate);

// Update a poll
router.put('/update/:pollId', verifyJwt, validatePollUpdate, handlePollUpdateById);

// Delete a poll
router.delete('/delete/:pollId', verifyJwt, validatePollDelete, handlePollDeleteById);

// API for retrieving polls created by a specific user.
router.get('/get/createdbyuser/:userId', verifyJwt, validatePollGetCreatedByUserId, handlePollGetCreatedByUserId);

module.exports = router;
