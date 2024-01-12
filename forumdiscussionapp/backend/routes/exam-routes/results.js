import express from "express";
import {
  validateResultCreate,
  validateResultUpdate,
  validateResultDelete,
} from "../../body-validation/exam-validation-functions/results-validation.js";

import { handleResultCreate } from "../../route-functions/exam-function-routes/results-routes/handle-result-create.js";
import { handleResultUpdate } from "../../route-functions/exam-function-routes/results-routes/handle-result-update.js";
import { handleResultDelete } from "../../route-functions/exam-function-routes/results-routes/handle-result-delete.js";
import { handleResultGetAll } from "../../route-functions/exam-function-routes/results-routes/handle-result-get-all.js";

const router = express.Router();

// Get all exam results
router.get("/get/all", handleResultGetAll);

// Create new exam result
router.post("/create", validateResultCreate, handleResultCreate);

// Update exam result
router.put("/update/:resultId", validateResultUpdate, handleResultUpdate);

// Delete exam result
router.delete("/delete/:resultId", validateResultDelete, handleResultDelete);

export default router;
