import express from "express";
import {
  validateCategoryCreate,
  validateCategoryUpdate,
  validateCategoryDelete,
} from "../../body-validation/exam-validation-functions/exam-category-validation.js";

import { handleCategoryCreate } from "../../route-functions/exam-function-routes/exam-category-routes/handle-category-create.js";
import { handleCategoryUpdate } from "../../route-functions/exam-function-routes/exam-category-routes/handle-category-update.js";
import { handleCategoryDelete } from "../../route-functions/exam-function-routes/exam-category-routes/handle-category-delete.js";
import { handleCategoryGetAll } from "../../route-functions/exam-function-routes/exam-category-routes/handle-category-get-all.js";

const router = express.Router();

// Get all exam categories
router.get("/get/all", handleCategoryGetAll);

// Create new exam category
router.post("/create", validateCategoryCreate, handleCategoryCreate);

// Update exam category
router.put("/update/:categoryId", validateCategoryUpdate, handleCategoryUpdate);

// Delete exam category
router.delete(
  "/delete/:categoryId",
  validateCategoryDelete,
  handleCategoryDelete
);

export default router;
