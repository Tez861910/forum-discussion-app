import express from "express";
import {
  validateExamCreate,
  validateExamUpdate,
  validateExamDelete,
  validateExamGetByCourseId,
} from "../../body-validation/exam-validation-functions/exam-validation.js";

import { handleExamDeleteById } from "../../route-functions/exam-function-routes/exam-routes/handle-exam-delete-id.js";
import { handleExamUpdateById } from "../../route-functions/exam-function-routes/exam-routes/handle-exam-update-id.js";
import { handleExamCreate } from "../../route-functions/exam-function-routes/exam-routes/handle-exam-create.js";
import { handleExamGetByCourseId } from "../../route-functions/exam-function-routes/exam-routes/handle-exams-get-bycourseid.js";

const router = express.Router();

// Get all exams for a specific course
router.get(
  "/get/bycourse/:courseId",
  validateExamGetByCourseId,
  handleExamGetByCourseId
);

// Create a new exam
router.post("/create", validateExamCreate, handleExamCreate);

// Update an exam
router.put("/update/:examId", validateExamUpdate, handleExamUpdateById);

// Delete an exam
router.delete("/delete/:examId", validateExamDelete, handleExamDeleteById);

export default router;
