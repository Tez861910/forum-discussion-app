import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
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

router.use(express.json());
router.use(cors());

// Get all user activity logs
router.get("/get/all", verifyJwt, handleUserActivityLogGetAll);

// Create a new user activity log
router.post(
  "/create",
  verifyJwt,
  validateUserActivityLogCreate,
  handleUserActivityLogCreate
);

// Update a user activity log
router.put(
  "/update/:logId",
  verifyJwt,
  validateUserActivityLogUpdate,
  handleUserActivityLogUpdate
);

// Delete a user activity log
router.delete(
  "/delete/:logId",
  verifyJwt,
  validateUserActivityLogDelete,
  handleUserActivityLogDelete
);

export default router;
