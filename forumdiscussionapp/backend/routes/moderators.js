const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateForumModeratorCreate,
  validateForumModeratorUpdate,
  validateForumModeratorDelete,
  validateForumModeratorGetUserId,
  validateForumModeratorGetForumId,
} = require('../body-validation/moderator-validation');

const { handleForumModeratorDeleteById } = require('../route-files/moderator-routes/handle-forum-moderator-delete-id');
const { handleForumModeratorUpdateById } = require('../route-files/moderator-routes/handle-forum-moderator-update-id');
const { handleForumModeratorCreate } = require('../route-files/moderator-routes/handle-forum-moderator-create');
const { handleForumModeratorGet } = require('../route-files/moderator-routes/handle-forum-moderator-get');
const { handleForumModeratorGetUserId } = require('../route-files/moderator-routes/handle-forum-moderators-get-userid');
const { handleForumModeratorGetForumId } = require('../route-files/moderator-routes/handle-forum-moderators-get-forumid');

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

module.exports = router;
