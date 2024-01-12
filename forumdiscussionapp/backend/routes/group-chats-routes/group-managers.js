import express from "express";
import {
  validateManagerCreate,
  validateManagerUpdate,
  validateManagerDelete,
  validateManagerGet,
} from "../../body-validation/groupchat-validation-functions/group-manager-validation.js";

import { handleManagerCreate } from "../../route-functions/groupchat-function-routes/group-manager-routes/handle-manager-create.js";
import { handleManagerUpdate } from "../../route-functions/groupchat-function-routes/group-manager-routes/handle-manager-update.js";
import { handleManagerDelete } from "../../route-functions/groupchat-function-routes/group-manager-routes/handle-manager-delete.js";
import { handleManagerGet } from "../../route-functions/groupchat-function-routes/group-manager-routes/handle-manager-get.js";

const router = express.Router();

// Create group manager
router.post("/create", validateManagerCreate, handleManagerCreate);

// Update group manager by ID
router.put("/update/:managerId", validateManagerUpdate, handleManagerUpdate);

// Delete group manager by ID
router.delete("/delete/:managerId", validateManagerDelete, handleManagerDelete);

// Get group manager by ID
router.get("/get/:managerId", validateManagerGet, handleManagerGet);

export default router;
