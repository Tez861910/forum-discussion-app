import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateForumReplyCreate,
  validateForumReplyUpdate,
  validateForumReplyDelete,
  validateForumReplyGetForumPostId,
} from '../../body-validation/reply-validation.js';

import { handleForumReplyDeleteById } from '../../route-files/reply-routes/handle-forum-reply-delete-id.js';
import { handleForumReplyUpdateById } from '../../route-files/reply-routes/handle-forum-reply-update-id.js';
import { handleForumReplyCreate } from '../../route-files/reply-routes/handle-forum-reply-create.js';
import { handleForumReplyGet } from '../../route-files/reply-routes/handle-forum-reply-get.js';
import { handleForumReplyGetForumPostId } from '../../route-files/reply-routes/handle-forum-replies-get-forumpostid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all forum replies
router.get('/get', verifyJwt, handleForumReplyGet);

// Create a new forum reply
router.post('/create/:forumPostId', verifyJwt, validateForumReplyCreate, handleForumReplyCreate);

// Update a forum reply
router.put('/update/:forumReplyId', verifyJwt, validateForumReplyUpdate, handleForumReplyUpdateById);

// Delete a forum reply
router.delete('/delete/:forumReplyId', verifyJwt, validateForumReplyDelete, handleForumReplyDeleteById);

// API for retrieving forum replies for a specific forum post.
router.get('/get/:forumPostId', verifyJwt, validateForumReplyGetForumPostId, handleForumReplyGetForumPostId);

export default router;
