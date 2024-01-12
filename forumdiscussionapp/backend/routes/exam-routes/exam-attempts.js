import express from "express";
import {
  validateAttemptCreate,
  validateAttemptUpdate,
  validateAttemptDelete,
} from "../../body-validation/exam-validation-functions/exam-attempt-validation.js";

import { handleAttemptCreate } from "../../route-functions/exam-function-routes/exam-attempt-routes/handle-attempt-create.js";
import { handleAttemptUpdate } from "../../route-functions/exam-function-routes/exam-attempt-routes/handle-attempt-update.js";
import { handleAttemptDelete } from "../../route-functions/exam-function-routes/exam-attempt-routes/handle-attempt-delete.js";
import { handleAttemptGetAll } from "../../route-functions/exam-function-routes/exam-attempt-routes/handle-attempt-get-all.js";

const router = express.Router();

// Get all exam attempts
router.get("/get/all", handleAttemptGetAll);

// Create new exam attempt
router.post("/create", validateAttemptCreate, handleAttemptCreate);

// Update exam attempt
router.put("/update/:attemptId", validateAttemptUpdate, handleAttemptUpdate);

// Delete exam attempt
router.delete("/delete/:attemptId", validateAttemptDelete, handleAttemptDelete);

export default router;
