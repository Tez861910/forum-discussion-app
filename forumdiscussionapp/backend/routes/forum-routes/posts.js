import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateForumPostCreate,
  validateForumPostUpdate,
  validateForumPostDelete,
  validateForumPostGetForumId,
} from '../../body-validation/forum-validation-functions/post-validation.js';

import { handleForumPostDeleteById } from '../../route-files/forum-function-routes/post-routes/handle-forum-post-delete-id.js';
import { handleForumPostUpdateById } from '../../route-files/forum-function-routes/post-routes/handle-forum-post-update-id.js';
import { handleForumPostCreate } from '../../route-files/forum-function-routes/post-routes/handle-forum-post-create.js';
import { handleForumPostGet } from '../../route-files/forum-function-routes/post-routes/handle-forum-post-get.js';
import { handleForumPostGetForumId } from '../../route-files/forum-function-routes/post-routes/handle-forum-posts-get-forumid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all forum posts
router.get('/get', verifyJwt, handleForumPostGet);

// Create a new forum post
router.post('/create/:forumId', verifyJwt, validateForumPostCreate, handleForumPostCreate);

// Update a forum post
router.put('/update/:forumPostId', verifyJwt, validateForumPostUpdate, handleForumPostUpdateById);

// Delete a forum post
router.delete('/delete/:forumPostId', verifyJwt, validateForumPostDelete, handleForumPostDeleteById);

// API for retrieving forum posts for a specific forum.
router.get('/get/:forumId', verifyJwt, validateForumPostGetForumId, handleForumPostGetForumId);

export default router;