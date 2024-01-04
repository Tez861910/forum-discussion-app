const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../../authvalid');
const {
  validateReactionCreate,
  validateReactionUpdate,
  validateReactionDelete,
} = require('../../body-validation/reaction-validation');

const { handleReactionCreate } = require('../../route-files/reaction-routes/handle-reaction-create');
const { handleReactionUpdate } = require('../../route-files/reaction-routes/handle-reaction-update');
const { handleReactionDelete } = require('../../route-files/reaction-routes/handle-reaction-delete');
const { handleReactionGetAll } = require('../../route-files/reaction-routes/handle-reaction-get-all');

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

module.exports = router;
