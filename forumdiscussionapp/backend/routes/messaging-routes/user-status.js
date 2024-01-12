import express from "express";
import {
  validateStatusUpdate,
  validateUserStatusGet,
} from "../../body-validation/messaging-validation-functions/user-status-validation.js";

import { handleStatusUpdate } from "../../route-functions/messaging-function-routes/user-status-routes/handle-status-update.js";
import { handleUserStatusGet } from "../../route-functions/messaging-function-routes/user-status-routes/handle-user-status-get.js";

const router = express.Router();

// Update user status
router.put("/update/:userId", validateStatusUpdate, handleStatusUpdate);

// Get user status
router.get("/get/:userId", validateUserStatusGet, handleUserStatusGet);

export default router;
