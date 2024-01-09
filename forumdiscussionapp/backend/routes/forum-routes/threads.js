import express from "express";
import { verifyJwt } from "../../authvalid.js";
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

router.use(express.json());

// Endpoint to get threads for a specific forum
router.get(
  "/get/:forumId",
  verifyJwt,
  validateThreadGetForumId,
  handleThreadsGetForumId
);

// Endpoint to get a thread by threadId
router.get(
  "/getthread/:threadId",
  verifyJwt,
  validateThreadGetByThreadId,
  handleThreadsGetByThreadId
);

// Endpoint to get all threads
router.get("/get/all", verifyJwt, handleThreadsGetAll);

// Create a new thread
router.post("/create", verifyJwt, validateThreadCreate, handleThreadsCreate);

// Update a thread
router.put(
  "/update/:threadId",
  verifyJwt,
  validateThreadUpdate,
  handleThreadsUpdateId
);

// Delete a thread
router.delete("/delete/:threadId", verifyJwt, handleThreadsDeleteId);

export default router;
