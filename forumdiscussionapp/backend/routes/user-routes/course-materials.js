import express from "express";
import {
  validateCourseMaterialCreate,
  validateCourseMaterialUpdate,
  validateCourseMaterialDelete,
  validateCourseMaterialGet,
} from "../../body-validation/user-validation-functions/course-material-validation.js";

import { handleCourseMaterialCreate } from "../../route-functions/user-function-routes/course-materials-routes/handle-course-material-create.js";
import { handleCourseMaterialUpdate } from "../../route-functions/user-function-routes/course-materials-routes/handle-course-material-update.js";
import { handleCourseMaterialDelete } from "../../route-functions/user-function-routes/course-materials-routes/handle-course-material-delete.js";
import { handleCourseMaterialGet } from "../../route-functions/user-function-routes/course-materials-routes/handle-course-material-get.js";

const router = express.Router();

// Create a new course material
router.post(
  "/create",
  validateCourseMaterialCreate,
  handleCourseMaterialCreate
);

// Update a course material
router.put(
  "/update/:materialId",
  validateCourseMaterialUpdate,
  handleCourseMaterialUpdate
);

// Delete a course material
router.delete(
  "/delete/:materialId",
  validateCourseMaterialDelete,
  handleCourseMaterialDelete
);

// Get a course material by ID
router.get(
  "/get/:materialId",
  validateCourseMaterialGet,
  handleCourseMaterialGet
);

export default router;
