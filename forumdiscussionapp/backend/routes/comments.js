const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { isUserAuthorized } = require('../authvalid');
const handleCommentDeleteId =require('../comment-routes/handle-comment-delete-id')
const handleCommentUpdateId =require('../comment-routes/handle-comment-update-id')
const handleCommentCreate =require('../comment-routes/handle-comment-create')
const handleCommentGet =require('../comment-routes/handle-comment-get')

//Get all comments
router.get('/comments/get', async (req, res) => handleCommentGet(req, res));

// Create a new comment 
router.post('/comments/create', async (req, res) => handleCommentCreate(req, res));

// Update a comment
router.put('/comments/update/:id', async (req, res) => handleCommentUpdateId(req, res));

// Delete a comment
router.delete('/comments/delete/:id', async (req, res) =>handleCommentDeleteId(req, res));

module.exports = router;
