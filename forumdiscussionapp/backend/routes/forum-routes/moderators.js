import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateForumModeratorCreate,
  validateForumModeratorUpdate,
  validateForumModeratorDelete,
  validateForumModeratorGetUserId,
  validateForumModeratorGetForumId,
} from '../../body-validation/forum-validation-functions/moderator-validation.js';

import { handleForumModeratorDeleteById } from '../../route-files/forum-function-routes/moderator-routes/handle-forum-moderator-delete-id.js';
import { handleForumModeratorUpdateById } from '../../route-files/forum-function-routes/moderator-routes/handle-forum-moderator-update-id.js';
import { handleForumModeratorCreate } from '../../route-files/forum-function-routes/moderator-routes/handle-forum-moderator-create.js';
import { handleForumModeratorGet } from '../../route-files/forum-function-routes/moderator-routes/handle-forum-moderator-get.js';
import { handleForumModeratorGetUserId } from '../../route-files/forum-function-routes/moderator-routes/handle-forum-moderators-get-userid.js';
import { handleForumModeratorGetForumId } from '../../route-files/forum-function-routes/moderator-routes/handle-forum-moderators-get-forumid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all forum moderators
router.get('/get', verifyJwt, handleForumModeratorGet);

// Create a new forum moderator
router.post('/create', verifyJwt, validateForumModeratorCreate, handleForumModeratorCreate);

// Update a forum moderator
router.put('/update/:forumModeratorId', verifyJwt, validateForumModeratorUpdate, handleForumModeratorUpdateById);

// Delete a forum moderator
router.delete('/delete/:forumModeratorId', verifyJwt, validateForumModeratorDelete, handleForumModeratorDeleteById);

// API for retrieving forum moderators for a specific user.
router.get('/get/user/:userId', verifyJwt, validateForumModeratorGetUserId, handleForumModeratorGetUserId);

// API for retrieving forum moderators for a specific forum.
router.get('/get/forum/:forumId', verifyJwt, validateForumModeratorGetForumId, handleForumModeratorGetForumId);

export default router;
