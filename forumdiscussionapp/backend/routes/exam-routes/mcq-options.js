import express from "express";
import {
  validateMCQOptionCreate,
  validateMCQOptionUpdate,
  validateMCQOptionDelete,
} from "../../body-validation/exam-validation-functions/mcq-option-validation.js";

import { handleMCQOptionDeleteById } from "../../route-functions/exam-function-routes/mcq-option-routes/handle-mcq-option-delete-id.js";
import { handleMCQOptionUpdateById } from "../../route-functions/exam-function-routes/mcq-option-routes/handle-mcq-option-update-id.js";
import { handleMCQOptionCreate } from "../../route-functions/exam-function-routes/mcq-option-routes/handle-mcq-option-create.js";
import { handleMCQOptionsGetAll } from "../../route-functions/exam-function-routes/mcq-option-routes/handle-mcq-options-get-all.js";

const router = express.Router();

// Get all MCQ options
router.get("/get/all", handleMCQOptionsGetAll);

// Create a new MCQ option
router.post("/create", validateMCQOptionCreate, handleMCQOptionCreate);

// Update an MCQ option
router.put(
  "/update/:mcqOptionId",
  validateMCQOptionUpdate,
  handleMCQOptionUpdateById
);

// Delete an MCQ option
router.delete(
  "/delete/:mcqOptionId",
  validateMCQOptionDelete,
  handleMCQOptionDeleteById
);

export default router;
