import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateCommentCreate,
  validateCommentUpdate,
  validateCommentDelete,
  validateCommentGetThreadId,
} from '../../body-validation/forum-validation-functions/comment-validation.js';

import { handleCommentDeleteId } from '../../route-files/forum-function-routes/comment-routes/handle-comment-delete-id.js';
import { handleCommentUpdateId } from '../../route-files/forum-function-routes/comment-routes/handle-comment-update-id.js';
import { handleCommentCreate } from '../../route-files/forum-function-routes/comment-routes/handle-comment-create.js';
import { handleCommentGet } from '../../route-files/forum-function-routes/comment-routes/handle-comment-get.js';
import { handleCommentGetThreadId } from '../../route-files/forum-function-routes/comment-routes/handle-comments-get-threadid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all comments
router.get('/get', verifyJwt, handleCommentGet);

// Create a new comment
router.post('/create/:threadId', verifyJwt, validateCommentCreate, handleCommentCreate);

// Update a comment
router.put('/update/:commentId', verifyJwt, validateCommentUpdate, handleCommentUpdateId);

// Delete a comment
router.delete('/delete/:commentId', verifyJwt, validateCommentDelete, handleCommentDeleteId);

// API for retrieving comments for a specific thread.
router.get('/get/:threadId', verifyJwt, validateCommentGetThreadId, handleCommentGetThreadId);

export default router;
