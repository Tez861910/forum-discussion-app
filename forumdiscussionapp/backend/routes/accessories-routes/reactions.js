import express from "express";
import {
  validateReactionCreate,
  validateReactionUpdate,
  validateReactionDelete,
} from "../../body-validation/accessories-validation-functions/reaction-validation.js";

import { handleReactionCreate } from "../../route-functions/accessories-function-routes/reaction-routes/handle-reaction-create.js";
import { handleReactionUpdate } from "../../route-functions/accessories-function-routes/reaction-routes/handle-reaction-update.js";
import { handleReactionDelete } from "../../route-functions/accessories-function-routes/reaction-routes/handle-reaction-delete.js";
import { handleReactionGetAll } from "../../route-functions/accessories-function-routes/reaction-routes/handle-reaction-get-all.js";

const router = express.Router();

// Get all reactions
router.get("/get/all", handleReactionGetAll);

// Create a new reaction
router.post("/create", validateReactionCreate, handleReactionCreate);

// Update a reaction
router.put("/update/:reactionId", validateReactionUpdate, handleReactionUpdate);

// Delete a reaction
router.delete(
  "/delete/:reactionId",
  validateReactionDelete,
  handleReactionDelete
);

export default router;
