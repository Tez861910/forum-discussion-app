import express from "express";
import {
  validateCourseCreate,
  validateCourseUpdate,
  validateCourseGetId,
  validateCourseDelete,
} from "../../body-validation/user-validation-functions/course-validation.js";

import { handleCoursesGet } from "../../route-functions/user-function-routes/course-routes/handle-courses-get.js";
import { handleCoursesCreate } from "../../route-functions/user-function-routes/course-routes/handle-courses-create.js";
import { handleCoursesGetId } from "../../route-functions/user-function-routes/course-routes/handle-courses-get-id.js";
import { handleCoursesUpdateId } from "../../route-functions/user-function-routes/course-routes/handle-courses-update-id.js";
import { handleCoursesPatchId } from "../../route-functions/user-function-routes/course-routes/handle-courses-patch-id.js";

const router = express.Router();

// Create a new course
router.post("/create", validateCourseCreate, handleCoursesCreate);

// Get all courses
router.get("/get", handleCoursesGet);

// Get a course by ID
router.get("/get/:courseId", validateCourseGetId, handleCoursesGetId);

// Update a course by ID
router.put("/update/:courseId", validateCourseUpdate, handleCoursesUpdateId);

// Patch (soft delete) a course by ID
router.patch("/patch/:courseId", validateCourseDelete, handleCoursesPatchId);

export default router;
