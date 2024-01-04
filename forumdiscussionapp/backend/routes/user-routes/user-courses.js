import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateCourseEnroll,
  validateRemoveUsersFromCourse,
} from '../../body-validation/user-course-validation.js';

import { handleUserCoursesGet } from '../../route-files/user-course-routes/handle-user-courses-get.js';
import { handleUserCoursesGetId } from '../../route-files/user-course-routes/handle-user-courses-get-id.js';
import { handleCoursesEnrollmentsId } from '../../route-files/user-course-routes/handle-courses-enrollments-id.js';
import { handleCoursesEnroll } from '../../route-files/user-course-routes/handle-courses-enroll.js';
import { handleCoursesIdEnroll } from '../../route-files/user-course-routes/handle-courses-id-enroll.js';
import { handleRemoveUsersFromCourse } from '../../route-files/user-course-routes/handle-remove-users-from-course.js';
import { handleCIDEnrollmentsEID } from '../../route-files/user-course-routes/handle-courses-cid-enrollments-eid.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all user courses
router.get('/get', verifyJwt, handleUserCoursesGet);

// Get all user courses by userId
router.get('/get/id', verifyJwt, handleUserCoursesGetId);

// Get course enrollments
router.get('/enrollments/:courseId', verifyJwt, handleCoursesEnrollmentsId);

// Enroll courses in a user
router.post('/enroll', verifyJwt, validateCourseEnroll, handleCoursesEnroll);

// Enroll users in a course
router.post('/:courseId/enroll', verifyJwt, validateCourseEnroll, handleCoursesIdEnroll);

// Patch (soft delete) removing users from a course
router.patch('/:courseId/enrollments', verifyJwt, validateRemoveUsersFromCourse, handleRemoveUsersFromCourse);

// Patch (soft delete) removing a user from a course
router.patch('/:courseId/enrollments/:userId', verifyJwt, validateRemoveUsersFromCourse, handleCIDEnrollmentsEID);

export default router;
