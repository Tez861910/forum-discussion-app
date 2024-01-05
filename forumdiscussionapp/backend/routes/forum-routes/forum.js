import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateForumCreate,
  validateForumUpdate,
  validateForumGetById,
} from '../../body-validation/forum-validation-functions/forum-validation.js'; 

import { handleForumCreate } from '../../route-files/forum-function-routes/forum-routes/handle-forum-create.js';
import { handleForumGetById } from '../../route-files/forum-function-routes/forum-routes/handle-forum-get-id.js';
import { handleForumGetAll } from '../../route-files/forum-function-routes/forum-routes/handle-forum-get-all.js';
import { handleForumUpdateById } from '../../route-files/forum-function-routes/forum-routes/handle-forum-update-id.js';
import { handleForumDeleteById } from '../../route-files/forum-function-routes/forum-routes/handle-forum-delete-id.js';

const router = express.Router();

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

export default router;
