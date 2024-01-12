import express from "express";
import {
  validateQuestionCreate,
  validateQuestionUpdate,
  validateQuestionDelete,
} from "../../body-validation/exam-validation-functions/question-validation.js";

import { handleQuestionDeleteById } from "../../route-functions/exam-function-routes/question-routes/handle-question-delete-id.js";
import { handleQuestionUpdateById } from "../../route-functions/exam-function-routes/question-routes/handle-question-update-id.js";
import { handleQuestionCreate } from "../../route-functions/exam-function-routes/question-routes/handle-question-create.js";
import { handleQuestionGetAll } from "../../route-functions/exam-function-routes/question-routes/handle-questions-get-all.js";

const router = express.Router();

// Get all questions
router.get("/get/all", handleQuestionGetAll);

// Create a new question
router.post("/create", validateQuestionCreate, handleQuestionCreate);

// Update a question
router.put(
  "/update/:questionId",
  validateQuestionUpdate,
  handleQuestionUpdateById
);

// Delete a question
router.delete(
  "/delete/:questionId",
  validateQuestionDelete,
  handleQuestionDeleteById
);

export default router;
