const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validatePrivateMessageCreate,
  validatePrivateMessageUpdate,
  validatePrivateMessageDelete,
  validatePrivateMessagesGetByUser,
} = require('../body-validation/private-message-validation');

const { handlePrivateMessageDeleteById } = require('../route-files/private-message-routes/handle-privateMessage-delete-id');
const { handlePrivateMessageUpdateById } = require('../route-files/private-message-routes/handle-privateMessage-update-id');
const { handlePrivateMessageCreate } = require('../route-files/private-message-routes/handle-privateMessage-create');
const { handlePrivateMessagesGetByUser } = require('../route-files/private-message-routes/handle-privateMessages-get-by-user');

router.use(express.json());
router.use(cors());

// Get all private messages for a user
router.get('/get/user/:userId', verifyJwt, validatePrivateMessagesGetByUser, handlePrivateMessagesGetByUser);

// Create a new private message
router.post('/create', verifyJwt, validatePrivateMessageCreate, handlePrivateMessageCreate);

// Update a private message
router.put('/update/:messageId', verifyJwt, validatePrivateMessageUpdate, handlePrivateMessageUpdateById);

// Delete a private message
router.delete('/delete/:messageId', verifyJwt, validatePrivateMessageDelete, handlePrivateMessageDeleteById);

module.exports = router;
