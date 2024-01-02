const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
  validateForumCreate,
  validateForumUpdate,
  validateForumGetById,
} = require('../body-validation/forum-validation'); 

const { handleForumCreate } = require('../route-files/forum-routes/handle-forum-create');
const { handleForumGetById } = require('../route-files/forum-routes/handle-forum-get-id');
const { handleForumGetAll } = require('../route-files/forum-routes/handle-forum-get-all');
const { handleForumUpdateById } = require('../route-files/forum-routes/handle-forum-update-id');
const { handleForumDeleteById } = require('../route-files/forum-routes/handle-forum-delete-id');

router.use(express.json());

// Endpoint to get a forum by forumId
router.get('/get/:forumId', verifyJwt, validateForumGetById, handleForumGetById);

// Endpoint to get all forums
router.get('/get/all', verifyJwt, handleForumGetAll);

// Create a new forum
router.post('/create', verifyJwt, validateForumCreate, handleForumCreate);

// Update a forum
router.put('/update/:forumId', verifyJwt, validateForumUpdate, handleForumUpdateById);

// Delete a forum
router.delete('/delete/:forumId', verifyJwt, handleForumDeleteById);

module.exports = router;
