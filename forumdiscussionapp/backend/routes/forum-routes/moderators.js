import express from "express";
import {
  validateForumModeratorCreate,
  validateForumModeratorUpdate,
  validateForumModeratorDelete,
  validateForumModeratorGetUserId,
  validateForumModeratorGetForumId,
} from "../../body-validation/forum-validation-functions/moderator-validation.js";

import { handleForumModeratorDeleteById } from "../../route-functions/forum-function-routes/moderator-routes/handle-forum-moderator-delete-id.js";
import { handleForumModeratorUpdateById } from "../../route-functions/forum-function-routes/moderator-routes/handle-forum-moderator-update-id.js";
import { handleForumModeratorCreate } from "../../route-functions/forum-function-routes/moderator-routes/handle-forum-moderator-create.js";
import { handleForumModeratorGet } from "../../route-functions/forum-function-routes/moderator-routes/handle-forum-moderator-get.js";
import { handleForumModeratorGetUserId } from "../../route-functions/forum-function-routes/moderator-routes/handle-forum-moderators-get-userid.js";
import { handleForumModeratorGetForumId } from "../../route-functions/forum-function-routes/moderator-routes/handle-forum-moderators-get-forumid.js";

const router = express.Router();

// Get all forum moderators
router.get("/get", handleForumModeratorGet);

// Create a new forum moderator
router.post(
  "/create",
  validateForumModeratorCreate,
  handleForumModeratorCreate
);

// Update a forum moderator
router.put(
  "/update/:forumModeratorId",
  validateForumModeratorUpdate,
  handleForumModeratorUpdateById
);

// Delete a forum moderator
router.delete(
  "/delete/:forumModeratorId",
  validateForumModeratorDelete,
  handleForumModeratorDeleteById
);

// API for retrieving forum moderators for a specific user.
router.get(
  "/get/user/:userId",
  validateForumModeratorGetUserId,
  handleForumModeratorGetUserId
);

// API for retrieving forum moderators for a specific forum.
router.get(
  "/get/forum/:forumId",
  validateForumModeratorGetForumId,
  handleForumModeratorGetForumId
);

export default router;
