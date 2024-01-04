import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validatePrivateMessageCreate,
  validatePrivateMessageUpdate,
  validatePrivateMessageDelete,
  validatePrivateMessagesGetByUser,
} from '../../body-validation/private-message-validation.js';

import { handlePrivateMessageDeleteById } from '../../route-files/private-message-routes/handle-privateMessage-delete-id.js';
import { handlePrivateMessageUpdateById } from '../../route-files/private-message-routes/handle-privateMessage-update-id.js';
import { handlePrivateMessageCreate } from '../../route-files/private-message-routes/handle-privateMessage-create.js';
import { handlePrivateMessagesGetByUser } from '../../route-files/private-message-routes/handle-privateMessages-get-by-user.js';

const router = express.Router();

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

export default router;
