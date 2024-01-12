import express from "express";
import {
  validateUserReportCreate,
  validateUserReportUpdate,
  validateUserReportDelete,
} from "../../body-validation/moderation-validation-functions/user-report-validation.js";

import { handleUserReportCreate } from "../../route-functions/moderation-function-routes/user-report-routes/handle-user-report-create.js";
import { handleUserReportUpdate } from "../../route-functions/moderation-function-routes/user-report-routes/handle-user-report-update.js";
import { handleUserReportDelete } from "../../route-functions/moderation-function-routes/user-report-routes/handle-user-report-delete.js";
import { handleUserReportGetAll } from "../../route-functions/moderation-function-routes/user-report-routes/handle-user-report-get-all.js";

const router = express.Router();

// Get all user reports
router.get("/get/all", handleUserReportGetAll);

// Create a new user report
router.post("/create", validateUserReportCreate, handleUserReportCreate);

// Update a user report
router.put(
  "/update/:reportId",
  validateUserReportUpdate,
  handleUserReportUpdate
);

// Delete a user report
router.delete(
  "/delete/:reportId",
  validateUserReportDelete,
  handleUserReportDelete
);

export default router;
