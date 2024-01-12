import express from "express";
import {
  validateAnswerCreate,
  validateAnswerUpdate,
  validateAnswerDelete,
} from "../../body-validation/exam-validation-functions/answer-validation.js";

import { handleAnswerDeleteById } from "../../route-functions/exam-function-routes/answer-routes/handle-answer-delete-id.js";
import { handleAnswerUpdateById } from "../../route-functions/exam-function-routes/answer-routes/handle-answer-update-id.js";
import { handleAnswerCreate } from "../../route-functions/exam-function-routes/answer-routes/handle-answer-create.js";
import { handleAnswersGetAll } from "../../route-functions/exam-function-routes/answer-routes/handle-answers-get-all.js";

const router = express.Router();

// Get all answers
router.get("/get/all", handleAnswersGetAll);

// Create a new answer
router.post("/create", validateAnswerCreate, handleAnswerCreate);

// Update an answer
router.put("/update/:answerId", validateAnswerUpdate, handleAnswerUpdateById);

// Delete an answer
router.delete(
  "/delete/:answerId",
  validateAnswerDelete,
  handleAnswerDeleteById
);

export default router;
