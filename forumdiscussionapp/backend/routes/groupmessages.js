const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateGroupMessagesCreate,
  validateGroupMessagesDelete,
  validateGroupMessagesGetByGroupId,
  validateGroupMessagesGetBySenderId,
} = require('../body-validation/group-messages-validation');

const { handleGroupMessagesCreate } = require('../route-files/group-messages-routes/handle-groupMessages-create');
const { handleGroupMessagesDelete } = require('../route-files/group-messages-routes/handle-groupMessages-delete');
const { handleGroupMessagesGetByGroupId } = require('../route-files/group-messages-routes/handle-groupMessages-get-groupid');
const { handleGroupMessagesGetBySenderId } = require('../route-files/group-messages-routes/handle-groupMessages-get-senderid');

router.use(express.json());
router.use(cors());

// Create a new group message
router.post('/create', verifyJwt, validateGroupMessagesCreate, handleGroupMessagesCreate);

// Delete a group message
router.delete('/delete/:messageId', verifyJwt, validateGroupMessagesDelete, handleGroupMessagesDelete);

// Get group messages by group ID
router.get('/get/group/:groupId', verifyJwt, validateGroupMessagesGetByGroupId, handleGroupMessagesGetByGroupId);

// Get group messages by sender ID
router.get('/get/sender/:senderId', verifyJwt, validateGroupMessagesGetBySenderId, handleGroupMessagesGetBySenderId);

module.exports = router;
