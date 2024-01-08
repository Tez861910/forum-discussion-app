import express from "express";
const router = express.Router();
import { verifyJwt } from "../../authvalid.js";
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

router.use(express.json());

// Create a new course material
router.post(
  "/create",
  verifyJwt,
  validateCourseMaterialCreate,
  handleCourseMaterialCreate
);

// Update a course material
router.put(
  "/update/:materialId",
  verifyJwt,
  validateCourseMaterialUpdate,
  handleCourseMaterialUpdate
);

// Delete a course material
router.delete(
  "/delete/:materialId",
  verifyJwt,
  validateCourseMaterialDelete,
  handleCourseMaterialDelete
);

// Get a course material by ID
router.get(
  "/get/:materialId",
  verifyJwt,
  validateCourseMaterialGet,
  handleCourseMaterialGet
);

export default router;
