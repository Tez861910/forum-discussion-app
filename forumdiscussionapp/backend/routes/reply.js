const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateForumReplyCreate,
  validateForumReplyUpdate,
  validateForumReplyDelete,
  validateForumReplyGetForumPostId,
} = require('../body-validation/reply-validation');

const { handleForumReplyDeleteById } = require('../route-files/reply-routes/handle-forum-reply-delete-id');
const { handleForumReplyUpdateById } = require('../route-files/reply-routes/handle-forum-reply-update-id');
const { handleForumReplyCreate } = require('../route-files/reply-routes/handle-forum-reply-create');
const { handleForumReplyGet } = require('../route-files/reply-routes/handle-forum-reply-get');
const { handleForumReplyGetForumPostId } = require('../route-files/reply-routes/handle-forum-replies-get-forumpostid');

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

module.exports = router;
