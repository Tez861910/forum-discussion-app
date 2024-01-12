import express from "express";
import {
  validateUserActivityLogCreate,
  validateUserActivityLogUpdate,
  validateUserActivityLogDelete,
} from "../../body-validation/activity-validation-functions/user-activity-log-validation.js";

import { handleUserActivityLogCreate } from "../../route-functions/activity-function-routes/user-activity-log-routes/handle-user-activity-log-create.js";
import { handleUserActivityLogUpdate } from "../../route-functions/activity-function-routes/user-activity-log-routes/handle-user-activity-log-update.js";
import { handleUserActivityLogDelete } from "../../route-functions/activity-function-routes/user-activity-log-routes/handle-user-activity-log-delete.js";
import { handleUserActivityLogGetAll } from "../../route-functions/activity-function-routes/user-activity-log-routes/handle-user-activity-log-get-all.js";

const router = express.Router();

// Get all user activity logs
router.get("/get/all", handleUserActivityLogGetAll);

// Create a new user activity log
router.post(
  "/create",
  validateUserActivityLogCreate,
  handleUserActivityLogCreate
);

// Update a user activity log
router.put(
  "/update/:logId",
  validateUserActivityLogUpdate,
  handleUserActivityLogUpdate
);

// Delete a user activity log
router.delete(
  "/delete/:logId",
  validateUserActivityLogDelete,
  handleUserActivityLogDelete
);

export default router;
