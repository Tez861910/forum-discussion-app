const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validatePollOptionCreate,
  validatePollOptionUpdate,
  validatePollOptionDelete,
  validatePollOptionGetByPollId,
} = require('../body-validation/option-validation');

const { handlePollOptionDeleteById } = require('../route-files/option-routes/handle-poll-option-delete-id');
const { handlePollOptionUpdateById } = require('../route-files/option-routes/handle-poll-option-update-id');
const { handlePollOptionCreate } = require('../route-files/option-routes/handle-poll-option-create');
const { handlePollOptionGet } = require('../route-files/option-routes/handle-poll-option-get');
const { handlePollOptionGetByPollId } = require('../route-files/option-routes/handle-poll-options-get-bypollid');

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

module.exports = router;
