const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateCourseEnroll,
  validateRemoveUsersFromCourse,
} = require('../body-validation/user-course-validation');

const { handleUserCoursesGet } = require('../route-files/user-course-routes/handle-user-courses-get');
const { handleUserCoursesGetId } = require('../route-files/user-course-routes/handle-user-courses-get-id');
const { handleCoursesEnrollmentsId } = require('../route-files/user-course-routes/handle-courses-enrollments-id');
const { handleCoursesEnroll } = require('../route-files/user-course-routes/handle-courses-enroll');
const { handleCoursesIdEnroll } = require('../route-files/user-course-routes/handle-courses-id-enroll');
const { handleRemoveUsersFromCourse } = require('../route-files/user-course-routes/handle-remove-users-from-course');
const { handleCIDEnrollmentsEID } = require('../route-files/user-course-routes/handle-courses-cid-enrollments-eid');

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

module.exports = router;