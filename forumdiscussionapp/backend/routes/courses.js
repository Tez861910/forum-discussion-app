const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateCourseCreate,
  validateCourseUpdate,
  validateCourseGetId,
  validateCourseEnroll,
  validateRemoveUsersFromCourse,
} = require('../body-validation/course-validation');

const { handleCoursesGet } = require('../course-routes/handle-courses-get');
const { handleCoursesCreate } = require('../course-routes/handle-courses-create');
const { handleCoursesGetId } = require('../course-routes/handle-courses-get-id');
const { handleCoursesUpdateId } = require('../course-routes/handle-courses-update-id');
const { handleCoursesPatchId } = require('../course-routes/handle-courses-patch-id');
const { handleCoursesEnrollmentsId } = require('../course-routes/handle-courses-enrollments-id');
const { handleCoursesEnroll } = require('../course-routes/handle-courses-enroll');
const { handleCoursesIdEnroll } = require('../course-routes/handle-courses-id-enroll');
const { handleRemoveUsersFromCourse } = require('../course-routes/handle-remove-users-from-course');
const { handleCIDEnrollmentsEID } = require('../course-routes/handle-courses-cid-enrollments-eid');

router.use(express.json());
router.use(cors());

// Create a new course
router.post('/courses/create', verifyJwt, validateCourseCreate, handleCoursesCreate);

// Get course enrollments
router.get('/courses/enrollments/:courseId', verifyJwt, handleCoursesEnrollmentsId);

// Get all courses
router.get('/courses/get', verifyJwt, handleCoursesGet);

// Enroll courses in user
router.post('/courses/enroll', verifyJwt, validateCourseEnroll, handleCoursesEnroll);

// Enroll users in course
router.post('/courses/:courseId/enroll', verifyJwt, validateCourseEnroll, handleCoursesIdEnroll);

// Get a course by ID
router.get('/courses/get/:id', verifyJwt, validateCourseGetId, handleCoursesGetId);

// Update a course by ID
router.put('/courses/update/:id', verifyJwt, validateCourseUpdate, handleCoursesUpdateId);

// Patch (soft delete) a course by ID
router.patch('/courses/delete/:id', verifyJwt, validateCourseGetId, handleCoursesPatchId);

// Patch (soft delete) removing users from a course
router.patch('/courses/:courseId/enrollments', verifyJwt, validateRemoveUsersFromCourse, handleRemoveUsersFromCourse);

// Patch (soft delete) removing user from a course
router.patch('/courses/:courseId/enrollments/:userId', verifyJwt, validateRemoveUsersFromCourse, handleCIDEnrollmentsEID);

module.exports = router;