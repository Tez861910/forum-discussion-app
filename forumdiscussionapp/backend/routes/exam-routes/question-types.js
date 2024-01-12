import express from "express";
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

// Get all question types
router.get("/get/all", handleQuestionTypeGetAll);

// Create a new question type
router.post("/create", validateQuestionTypeCreate, handleQuestionTypeCreate);

// Update a question type
router.put(
  "/update/:questionTypeId",
  validateQuestionTypeUpdate,
  handleQuestionTypeUpdateById
);

// Delete a question type
router.delete(
  "/delete/:questionTypeId",
  validateQuestionTypeDelete,
  handleQuestionTypeDeleteById
);

export default router;
