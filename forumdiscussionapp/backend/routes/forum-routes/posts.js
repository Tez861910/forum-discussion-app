import express from "express";
import {
  validateForumPostCreate,
  validateForumPostUpdateById,
  validateForumPostDelete,
  validateForumPostGetForumId,
} from "../../body-validation/forum-validation-functions/post-validation.js";

import { handleForumPostDeleteById } from "../../route-functions/forum-function-routes/post-routes/handle-forum-post-delete-id.js";
import { handleForumPostUpdateById } from "../../route-functions/forum-function-routes/post-routes/handle-forum-post-update-id.js";
import { handleForumPostCreate } from "../../route-functions/forum-function-routes/post-routes/handle-forum-post-create.js";
import { handleForumPostGet } from "../../route-functions/forum-function-routes/post-routes/handle-forum-post-get.js";
import { handleForumPostGetForumId } from "../../route-functions/forum-function-routes/post-routes/handle-forum-posts-get-forumid.js";

const router = express.Router();

// Get all forum posts
router.get("/get", handleForumPostGet);

// Create a new forum post
router.post("/create/:forumId", validateForumPostCreate, handleForumPostCreate);

// Update a forum post
router.put(
  "/update/:forumPostId",
  validateForumPostUpdateById,
  handleForumPostUpdateById
);

// Delete a forum post
router.delete(
  "/delete/:forumPostId",
  validateForumPostDelete,
  handleForumPostDeleteById
);

// API for retrieving forum posts for a specific forum.
router.get(
  "/get/:forumId",
  validateForumPostGetForumId,
  handleForumPostGetForumId
);

export default router;
