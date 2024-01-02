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

const {handleCommentDeleteId} =require('../route-files/comment-routes/handle-comment-delete-id')
const {handleCommentUpdateId} =require('../route-files/comment-routes/handle-comment-update-id')
const {handleCommentCreate} =require('../route-files/comment-routes/handle-comment-create')
const {handleCommentGet} =require('../route-files/comment-routes/handle-comment-get')
const {handleCommentGetThreadId} =require('../route-files/comment-routes/handle-comments-get-threadid')

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

module.exports = router;