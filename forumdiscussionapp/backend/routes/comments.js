const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateCommentCreate,
  validateCommentUpdate,
  validateCommentDelete,
  validateCommentGetThreadId,
} = require('../body-validation/comment-validation');

const {handleCommentDeleteId} =require('../comment-routes/handle-comment-delete-id')
const {handleCommentUpdateId} =require('../comment-routes/handle-comment-update-id')
const {handleCommentCreate} =require('../comment-routes/handle-comment-create')
const {handleCommentGet} =require('../comment-routes/handle-comment-get')
const {handleCommentGetThreadId} =require('../comment-routes/handle-comments-get-threadid')

router.use(express.json());
router.use(cors());

// Get all comments
router.get('/comments/get', verifyJwt, handleCommentGet);

// Create a new comment
router.post('/comments/create/:threadId', verifyJwt, validateCommentCreate, handleCommentCreate);

// Update a comment
router.put('/comments/update/:commentId', verifyJwt, validateCommentUpdate, handleCommentUpdateId);

// Delete a comment
router.delete('/comments/delete/:commentId', verifyJwt, validateCommentDelete, handleCommentDeleteId);

// API for retrieving comments for a specific thread.
router.get('/comments/get/:threadId', verifyJwt, validateCommentGetThreadId, handleCommentGetThreadId);

module.exports = router;