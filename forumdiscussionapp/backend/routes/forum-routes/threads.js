import express from "express";
import {
  validateThreadCreate,
  validateThreadUpdate,
  validateThreadGetForumId,
  validateThreadGetByThreadId,
} from "../../body-validation/forum-validation-functions/thread-validation.js";

import { handleThreadsCreate } from "../../route-functions/forum-function-routes/thread-routes/handle-threads-create.js";
import { handleThreadsGetForumId } from "../../route-functions/forum-function-routes/thread-routes/handle-threads-get-by-forumid.js";
import { handleThreadsGetAll } from "../../route-functions/forum-function-routes/thread-routes/handle-threads-get-all.js";
import { handleThreadsGetByThreadId } from "../../route-functions/forum-function-routes/thread-routes/handle-threads-get-id.js";
import { handleThreadsUpdateId } from "../../route-functions/forum-function-routes/thread-routes/handle-threads-update-id.js";
import { handleThreadsDeleteId } from "../../route-functions/forum-function-routes/thread-routes/handle-threads-delete-id.js";

const router = express.Router();

// Endpoint to get threads for a specific forum
router.get("/get/:forumId", validateThreadGetForumId, handleThreadsGetForumId);

// Endpoint to get a thread by threadId
router.get(
  "/getthread/:threadId",
  validateThreadGetByThreadId,
  handleThreadsGetByThreadId
);

// Endpoint to get all threads
router.get("/get/all", handleThreadsGetAll);

// Create a new thread
router.post("/create", validateThreadCreate, handleThreadsCreate);

// Update a thread
router.put("/update/:threadId", validateThreadUpdate, handleThreadsUpdateId);

// Delete a thread
router.delete("/delete/:threadId", handleThreadsDeleteId);

export default router;
