const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
router.use(express.json());
router.use(cors());

const { isUserAuthorized } = require('../authvalid');
const handleCommentDeleteId =require('../comment-routes/handle-comment-delete-id')
const handleCommentUpdateId =require('../comment-routes/handle-comment-update-id')
const handleCommentCreate =require('../comment-routes/handle-comment-create')
const handleCommentGet =require('../comment-routes/handle-comment-get')
const handleCommentGetThreadId =require('../comment-routes/handle-comments-get-threadid')

//Get all comments
router.get('/comments/get/:threadId', async (req, res) => handleCommentGet(req, res));

// Create a new comment 
router.post('/comments/create/:threadId', async (req, res) => handleCommentCreate(req, res));

// Update a comment
router.put('/comments/update/:commentId', async (req, res) => handleCommentUpdateId(req, res));

// Delete a comment
router.delete('/comments/delete/:commentId', async (req, res) =>handleCommentDeleteId(req, res));

// API for retrieving comments for a specific thread.
router.get('/comments/get/:threadId', (req, res) =>handleCommentGetThreadId(req, res));

module.exports = router;

