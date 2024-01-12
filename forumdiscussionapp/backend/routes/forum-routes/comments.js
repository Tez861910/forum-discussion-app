import express from "express";
import {
  validateCommentCreate,
  validateCommentUpdate,
  validateCommentDelete,
  validateCommentGetThreadId,
} from "../../body-validation/forum-validation-functions/comment-validation.js";

import { handleCommentDeleteId } from "../../route-functions/forum-function-routes/comment-routes/handle-comment-delete-id.js";
import { handleCommentUpdateId } from "../../route-functions/forum-function-routes/comment-routes/handle-comment-update-id.js";
import { handleCommentCreate } from "../../route-functions/forum-function-routes/comment-routes/handle-comment-create.js";
import { handleCommentGet } from "../../route-functions/forum-function-routes/comment-routes/handle-comment-get.js";
import { handleCommentGetThreadId } from "../../route-functions/forum-function-routes/comment-routes/handle-comments-get-threadid.js";

const router = express.Router();

// Get all comments
router.get("/get", handleCommentGet);

// Create a new comment
router.post("/create/:threadId", validateCommentCreate, handleCommentCreate);

// Update a comment
router.put("/update/:commentId", validateCommentUpdate, handleCommentUpdateId);

// Delete a comment
router.delete(
  "/delete/:commentId",
  validateCommentDelete,
  handleCommentDeleteId
);

// API for retrieving comments for a specific thread.
router.get(
  "/get/:threadId",
  validateCommentGetThreadId,
  handleCommentGetThreadId
);

export default router;
