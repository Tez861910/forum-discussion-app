import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
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

router.use(express.json());
router.use(cors());

// Get all MCQ options
router.get("/get/all", verifyJwt, handleMCQOptionsGetAll);

// Create a new MCQ option
router.post(
  "/create",
  verifyJwt,
  validateMCQOptionCreate,
  handleMCQOptionCreate
);

// Update an MCQ option
router.put(
  "/update/:mcqOptionId",
  verifyJwt,
  validateMCQOptionUpdate,
  handleMCQOptionUpdateById
);

// Delete an MCQ option
router.delete(
  "/delete/:mcqOptionId",
  verifyJwt,
  validateMCQOptionDelete,
  handleMCQOptionDeleteById
);

export default router;
