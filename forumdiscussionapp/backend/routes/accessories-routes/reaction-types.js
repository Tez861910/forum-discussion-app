import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
import {
  validateReactionTypeCreate,
  validateReactionTypeUpdate,
  validateReactionTypeDelete,
} from "../../body-validation/accessories-validation-functions/reaction-type-validation.js";

import { handleReactionTypeCreate } from "../../route-functions/accessories-function-routes/reaction-type-routes/handle-reactionType-create.js";
import { handleReactionTypeUpdate } from "../../route-functions/accessories-function-routes/reaction-type-routes/handle-reactionType-update.js";
import { handleReactionTypeDelete } from "../../route-functions/accessories-function-routes/reaction-type-routes/handle-reactionType-delete.js";
import { handleReactionTypeGetAll } from "../../route-functions/accessories-function-routes/reaction-type-routes/handle-reactionType-get-all.js";

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all reaction types
router.get("/get/all", verifyJwt, handleReactionTypeGetAll);

// Create a new reaction type
router.post(
  "/create",
  verifyJwt,
  validateReactionTypeCreate,
  handleReactionTypeCreate
);

// Update a reaction type
router.put(
  "/update/:reactionTypeId",
  verifyJwt,
  validateReactionTypeUpdate,
  handleReactionTypeUpdate
);

// Delete a reaction type
router.delete(
  "/delete/:reactionTypeId",
  verifyJwt,
  validateReactionTypeDelete,
  handleReactionTypeDelete
);

export default router;
