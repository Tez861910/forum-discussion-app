import express from "express";
import {
  validatePollCreate,
  validatePollUpdate,
  validatePollDelete,
  validatePollGetCreatedByUserId,
} from "../../body-validation/forum-validation-functions/poll-validation.js";

import { handlePollDeleteById } from "../../route-functions/forum-function-routes/poll-routes/handle-poll-delete-id.js";
import { handlePollUpdateById } from "../../route-functions/forum-function-routes/poll-routes/handle-poll-update-id.js";
import { handlePollCreate } from "../../route-functions/forum-function-routes/poll-routes/handle-poll-create.js";
import { handlePollGet } from "../../route-functions/forum-function-routes/poll-routes/handle-poll-get.js";
import { handlePollGetCreatedByUserId } from "../../route-functions/forum-function-routes/poll-routes/handle-polls-get-createdbyuserid.js";

const router = express.Router();

// Get all polls
router.get("/get", handlePollGet);

// Create a new poll
router.post("/create/:forumId", validatePollCreate, handlePollCreate);

// Update a poll
router.put("/update/:pollId", validatePollUpdate, handlePollUpdateById);

// Delete a poll
router.delete("/delete/:pollId", validatePollDelete, handlePollDeleteById);

// API for retrieving polls created by a specific user.
router.get(
  "/get/createdbyuser/:userId",
  validatePollGetCreatedByUserId,
  handlePollGetCreatedByUserId
);

export default router;
