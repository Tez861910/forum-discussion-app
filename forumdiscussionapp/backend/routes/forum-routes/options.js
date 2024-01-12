import express from "express";
import {
  validatePollOptionCreate,
  validatePollOptionUpdate,
  validatePollOptionDelete,
  validatePollOptionGetByPollId,
} from "../../body-validation/forum-validation-functions/option-validation.js";

import { handlePollOptionDeleteById } from "../../route-functions/forum-function-routes/option-routes/handle-poll-option-delete-id.js";
import { handlePollOptionUpdateById } from "../../route-functions/forum-function-routes/option-routes/handle-poll-option-update-id.js";
import { handlePollOptionCreate } from "../../route-functions/forum-function-routes/option-routes/handle-poll-option-create.js";
import { handlePollOptionGet } from "../../route-functions/forum-function-routes/option-routes/handle-poll-option-get.js";
import { handlePollOptionGetByPollId } from "../../route-functions/forum-function-routes/option-routes/handle-poll-options-get-bypollid.js";

const router = express.Router();

// Get all poll options
router.get("/get", handlePollOptionGet);

// Create a new poll option
router.post("/create", validatePollOptionCreate, handlePollOptionCreate);

// Update a poll option
router.put(
  "/update/:pollOptionId",
  validatePollOptionUpdate,
  handlePollOptionUpdateById
);

// Delete a poll option
router.delete(
  "/delete/:pollOptionId",
  validatePollOptionDelete,
  handlePollOptionDeleteById
);

// API for retrieving poll options for a specific poll.
router.get(
  "/get/bypoll/:pollId",
  validatePollOptionGetByPollId,
  handlePollOptionGetByPollId
);

export default router;
