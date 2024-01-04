import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateGroupChatCreate,
  validateGroupChatUpdate,
  validateGroupChatDelete,
  validateGroupChatGetById,
  validateGroupChatGetByName,
} from '../../body-validation/group-chat-validation.js';

import { handleGroupChatCreate } from '../../route-files/group-chat-routes/handle-groupChat-create.js';
import { handleGroupChatUpdateById } from '../../route-files/group-chat-routes/handle-groupChat-update-id.js';
import { handleGroupChatDeleteById } from '../../route-files/group-chat-routes/handle-groupChat-delete-id.js';
import { handleGroupChatGetById } from '../../route-files/group-chat-routes/handle-groupChat-get-id.js';
import { handleGroupChatGetByName } from '../../route-files/group-chat-routes/handle-groupChat-get-name.js';

const router = express.Router();

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

export default router;
