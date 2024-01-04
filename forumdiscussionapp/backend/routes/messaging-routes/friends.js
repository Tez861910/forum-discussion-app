import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateFriendsCreate,
  validateFriendsGet,
} from '../../body-validation/friends-validation.js';

import { handleFriendsCreate } from '../../route-files/friends-routes/handle-friends-create.js';
import { handleFriendsGet } from '../../route-files/friends-routes/handle-friends-get.js';

const router = express.Router();

router.use(express.json());

// Create friendship
router.post('/create', verifyJwt, validateFriendsCreate, handleFriendsCreate);

// Get user's friends
router.get('/get/:userId', verifyJwt, validateFriendsGet, handleFriendsGet);

export default router;
