import express from "express";
import { verifyJwt } from "../../authvalid.js";
import {
  validateFriendsCreate,
  validateFriendsGet,
} from "../../body-validation/messaging-validation-functions/friends-validation.js";

import { handleFriendsCreate } from "../../route-functions/messaging-function-routes/friends-routes/handle-friends-create.js";
import { handleFriendsGet } from "../../route-functions/messaging-function-routes/friends-routes/handle-friends-get.js";

const router = express.Router();

router.use(express.json());

// Create friendship
router.post("/create", verifyJwt, validateFriendsCreate, handleFriendsCreate);

// Get user's friends
router.get("/get/:userId", verifyJwt, validateFriendsGet, handleFriendsGet);

export default router;
