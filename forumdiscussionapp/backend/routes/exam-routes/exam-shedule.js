import express from "express";
import {
  validateScheduleCreate,
  validateScheduleUpdate,
  validateScheduleDelete,
} from "../../body-validation/exam-validation-functions/exam-schedule-validation.js";

import { handleScheduleCreate } from "../../route-functions/exam-function-routes/exam-schedule-routes/handle-schedule-create.js";
import { handleScheduleUpdate } from "../../route-functions/exam-function-routes/exam-schedule-routes/handle-schedule-update.js";
import { handleScheduleDelete } from "../../route-functions/exam-function-routes/exam-schedule-routes/handle-schedule-delete.js";
import { handleScheduleGetAll } from "../../route-functions/exam-function-routes/exam-schedule-routes/handle-schedule-get-all.js";

const router = express.Router();

// Get all exam schedules
router.get("/get/all", handleScheduleGetAll);

// Create new exam schedule
router.post("/create", validateScheduleCreate, handleScheduleCreate);

// Update exam schedule
router.put("/update/:scheduleId", validateScheduleUpdate, handleScheduleUpdate);

// Delete exam schedule
router.delete(
  "/delete/:scheduleId",
  validateScheduleDelete,
  handleScheduleDelete
);

export default router;
