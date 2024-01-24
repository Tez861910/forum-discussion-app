import express from "express";
import {
  validateUserCoursesEnroll,
  validateCourseUsersEnroll,
  validateRemoveUserFromCourse,
  validateRemoveUsersFromCourse,
} from "../../body-validation/user-validation-functions/user-course-validation.js";

import { handleUserCoursesGet } from "../../route-functions/user-function-routes/user-course-routes/handle-user-courses-get.js";
import { handleUserCoursesGetId } from "../../route-functions/user-function-routes/user-course-routes/handle-user-courses-get-id.js";
import { handleCoursesEnrollmentsId } from "../../route-functions/user-function-routes/user-course-routes/handle-courses-enrollments-id.js";
import { handleCoursesEnroll } from "../../route-functions/user-function-routes/user-course-routes/handle-courses-enroll.js";
import { handleCoursesIdEnroll } from "../../route-functions/user-function-routes/user-course-routes/handle-courses-id-enroll.js";
import { handleRemoveUsersFromCourse } from "../../route-functions/user-function-routes/user-course-routes/handle-remove-users-from-course.js";
import { handleCIDEnrollmentsEID } from "../../route-functions/user-function-routes/user-course-routes/handle-courses-cid-enrollments-eid.js";

const router = express.Router();

// Get all user courses
router.get("/get", handleUserCoursesGet);

// Get all user courses by userId
router.get("/get/id", handleUserCoursesGetId);

// Get course enrollments
router.get("/enrollments/:courseId", handleCoursesEnrollmentsId);

// Enroll courses in a user
router.post("/enroll", validateUserCoursesEnroll, handleCoursesEnroll);

// Enroll users in a course
router.post(
  "/:courseId/enroll",
  validateCourseUsersEnroll,
  handleCoursesIdEnroll
);

// Patch (soft delete) removing users from a course
router.patch(
  "/:courseId/enrollments",
  validateRemoveUsersFromCourse,
  handleRemoveUsersFromCourse
);

// Patch (soft delete) removing a user from a course
router.patch(
  "/:courseId/enrollments/:userId",
  validateRemoveUserFromCourse,
  handleCIDEnrollmentsEID
);

export default router;
