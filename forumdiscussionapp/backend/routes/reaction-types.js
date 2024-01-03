const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateReactionTypeCreate,
  validateReactionTypeUpdate,
  validateReactionTypeDelete,
} = require('../body-validation/reaction-type-validation');

const { handleReactionTypeCreate } = require('../route-files/reaction-type-routes/handle-reactionType-create');
const { handleReactionTypeUpdate } = require('../route-files/reaction-type-routes/handle-reactionType-update');
const { handleReactionTypeDelete } = require('../route-files/reaction-type-routes/handle-reactionType-delete');
const { handleReactionTypeGetAll } = require('../route-files/reaction-type-routes/handle-reactionType-get-all');

router.use(express.json());
router.use(cors());

// Get all reaction types
router.get('/get/all', verifyJwt, handleReactionTypeGetAll);

// Create a new reaction type
router.post('/create', verifyJwt, validateReactionTypeCreate, handleReactionTypeCreate);

// Update a reaction type
router.put('/update/:reactionTypeId', verifyJwt, validateReactionTypeUpdate, handleReactionTypeUpdate);

// Delete a reaction type
router.delete('/delete/:reactionTypeId', verifyJwt, validateReactionTypeDelete, handleReactionTypeDelete);

module.exports = router;
