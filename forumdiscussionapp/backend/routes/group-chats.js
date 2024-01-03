const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateGroupChatCreate,
  validateGroupChatUpdate,
  validateGroupChatDelete,
  validateGroupChatGetById,
  validateGroupChatGetByName,
} = require('../body-validation/group-chat-validation');

const { handleGroupChatCreate } = require('../route-files/group-chat-routes/handle-groupChat-create');
const { handleGroupChatUpdateById } = require('../route-files/group-chat-routes/handle-groupChat-update-id');
const { handleGroupChatDeleteById } = require('../route-files/group-chat-routes/handle-groupChat-delete-id');
const { handleGroupChatGetById } = require('../route-files/group-chat-routes/handle-groupChat-get-id');
const { handleGroupChatGetByName } = require('../route-files/group-chat-routes/handle-groupChat-get-name');

router.use(express.json());
router.use(cors());

// Get a group chat by ID
router.get('/get/id/:groupId', verifyJwt, validateGroupChatGetById, handleGroupChatGetById);

// Get a group chat by name
router.get('/get/name/:groupName', verifyJwt, validateGroupChatGetByName, handleGroupChatGetByName);

// Create a new group chat
router.post('/create', verifyJwt, validateGroupChatCreate, handleGroupChatCreate);

// Update a group chat
router.put('/update/:groupId', verifyJwt, validateGroupChatUpdate, handleGroupChatUpdateById);

// Delete a group chat
router.delete('/delete/:groupId', verifyJwt, validateGroupChatDelete, handleGroupChatDeleteById);

module.exports = router;
