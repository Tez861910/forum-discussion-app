const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateForumPostCreate,
  validateForumPostUpdate,
  validateForumPostDelete,
  validateForumPostGetForumId,
} = require('../body-validation/post-validation');

const { handleForumPostDeleteById } = require('../route-files/post-routes/handle-forum-post-delete-id');
const { handleForumPostUpdateById } = require('../route-files/post-routes/handle-forum-post-update-id');
const { handleForumPostCreate } = require('../route-files/post-routes/handle-forum-post-create');
const { handleForumPostGet } = require('../route-files/post-routes/handle-forum-post-get');
const { handleForumPostGetForumId } = require('../route-files/post-routes/handle-forum-posts-get-forumid');

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

module.exports = router;
