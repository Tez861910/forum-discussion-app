import express from "express";
import {
  validateUserPollVoteCreate,
  validateUserPollVoteDelete,
  validateUserPollVoteGetByUserId,
} from "../../body-validation/forum-validation-functions/user-vote-validation.js";

import { handleUserPollVoteDeleteById } from "../../route-functions/forum-function-routes/user-vote-routes/handle-user-poll-vote-delete-id.js";
import { handleUserPollVoteCreate } from "../../route-functions/forum-function-routes/user-vote-routes/handle-user-poll-vote-create.js";
import { handleUserPollVoteGetByUserId } from "../../route-functions/forum-function-routes/user-vote-routes/handle-user-poll-votes-get-byuserid.js";

const router = express.Router();

// Create a new user poll vote
router.post("/create", validateUserPollVoteCreate, handleUserPollVoteCreate);

// Delete a user poll vote
router.delete(
  "/delete/:userPollVoteId",
  validateUserPollVoteDelete,
  handleUserPollVoteDeleteById
);

// API for retrieving user poll votes for a specific user.
router.get(
  "/get/byuser/:userId",
  validateUserPollVoteGetByUserId,
  handleUserPollVoteGetByUserId
);

export default router;
