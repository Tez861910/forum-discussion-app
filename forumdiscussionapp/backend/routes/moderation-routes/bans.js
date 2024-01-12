import express from "express";
import {
  validateBanCreate,
  validateBanUpdate,
  validateBanDelete,
} from "../../body-validation/moderation-validation-functions/ban-validation.js";

import { handleBanCreate } from "../../route-functions/moderation-function-routes/ban-routes/handle-ban-create.js";
import { handleBanUpdate } from "../../route-functions/moderation-function-routes/ban-routes/handle-ban-update.js";
import { handleBanDelete } from "../../route-functions/moderation-function-routes/ban-routes/handle-ban-delete.js";
import { handleBanGetAll } from "../../route-functions/moderation-function-routes/ban-routes/handle-ban-get-all.js";

const router = express.Router();

router.use(express.json());

// Get all bans
router.get("/get/all", handleBanGetAll);

// Create a new ban
router.post("/create", validateBanCreate, handleBanCreate);

// Update a ban
router.put("/update/:banId", validateBanUpdate, handleBanUpdate);

// Delete a ban
router.delete("/delete/:banId", validateBanDelete, handleBanDelete);

export default router;
