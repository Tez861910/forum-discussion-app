import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
import {
  validateQuestionTypeCreate,
  validateQuestionTypeUpdate,
  validateQuestionTypeDelete,
} from "../../body-validation/exam-validation-functions/question-type-validation.js";

import { handleQuestionTypeDeleteById } from "../../route-functions/exam-function-routes/question-type-routes/handle-question-type-delete-id.js";
import { handleQuestionTypeUpdateById } from "../../route-functions/exam-function-routes/question-type-routes/handle-question-type-update-id.js";
import { handleQuestionTypeCreate } from "../../route-functions/exam-function-routes/question-type-routes/handle-question-type-create.js";
import { handleQuestionTypeGetAll } from "../../route-functions/exam-function-routes/question-type-routes/handle-question-types-get-all.js";

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all question types
router.get("/get/all", verifyJwt, handleQuestionTypeGetAll);

// Create a new question type
router.post(
  "/create",
  verifyJwt,
  validateQuestionTypeCreate,
  handleQuestionTypeCreate
);

// Update a question type
router.put(
  "/update/:questionTypeId",
  verifyJwt,
  validateQuestionTypeUpdate,
  handleQuestionTypeUpdateById
);

// Delete a question type
router.delete(
  "/delete/:questionTypeId",
  verifyJwt,
  validateQuestionTypeDelete,
  handleQuestionTypeDeleteById
);

export default router;
