import express from "express";
import {
  validateForumCreate,
  validateForumUpdate,
  validateForumGetById,
  validateThreadGetCourseId,
} from "../../body-validation/forum-validation-functions/forum-validation.js";

import { handleForumCreate } from "../../route-functions/forum-function-routes/forum-routes/handle-forum-create.js";
import { handleForumGetById } from "../../route-functions/forum-function-routes/forum-routes/handle-forum-get-id.js";
import { handleForumGetAll } from "../../route-functions/forum-function-routes/forum-routes/handle-forum-get-all.js";
import { handleForumUpdateById } from "../../route-functions/forum-function-routes/forum-routes/handle-forum-update-id.js";
import { handleForumDeleteById } from "../../route-functions/forum-function-routes/forum-routes/handle-forum-delete-id.js";
import { handleThreadsGetCourseId } from "../../route-functions/forum-function-routes/forum-routes/handle-forum-get-by-courseid.js";

const router = express.Router();

// Endpoint to get threads for a specific course
router.get(
  "/get/:courseId",
  validateThreadGetCourseId,
  handleThreadsGetCourseId
);

// Endpoint to get a forum by forumId
router.get("/get/:forumId", validateForumGetById, handleForumGetById);

// Endpoint to get all forums
router.get("/get/all", handleForumGetAll);

// Create a new forum
router.post("/create", validateForumCreate, handleForumCreate);

// Update a forum
router.put("/update/:forumId", validateForumUpdate, handleForumUpdateById);

// Delete a forum
router.delete("/delete/:forumId", handleForumDeleteById);

export default router;
