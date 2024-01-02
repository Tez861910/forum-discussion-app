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

const { handleCoursesGet } = require('../route-files/course-routes/handle-courses-get');
const { handleCoursesCreate } = require('../route-files/course-routes/handle-courses-create');
const { handleCoursesGetId } = require('../route-files/course-routes/handle-courses-get-id');
const { handleCoursesUpdateId } = require('../route-files/course-routes/handle-courses-update-id');
const { handleCoursesPatchId } = require('../route-files/course-routes/handle-courses-patch-id');
const { handleCoursesEnrollmentsId } = require('../route-files/course-routes/handle-courses-enrollments-id');
const { handleCoursesEnroll } = require('../route-files/course-routes/handle-courses-enroll');
const { handleCoursesIdEnroll } = require('../route-files/course-routes/handle-courses-id-enroll');
const { handleRemoveUsersFromCourse } = require('../route-files/course-routes/handle-remove-users-from-course');
const { handleCIDEnrollmentsEID } = require('../route-files/course-routes/handle-courses-cid-enrollments-eid');

router.use(express.json());
router.use(cors());

// Create a new course
router.post('/create', verifyJwt, validateCourseCreate, handleCoursesCreate);

// Get course enrollments
router.get('/enrollments/:courseId', verifyJwt, handleCoursesEnrollmentsId);

// Get all courses
router.get('/get', verifyJwt, handleCoursesGet);

// Enroll courses in a user
router.post('/enroll', verifyJwt, validateCourseEnroll, handleCoursesEnroll);

// Enroll users in a course
router.post('/:courseId/enroll', verifyJwt, validateCourseEnroll, handleCoursesIdEnroll);

// Get a course by ID
router.get('/get/:id', verifyJwt, validateCourseGetId, handleCoursesGetId);

// Update a course by ID
router.put('/update/:id', verifyJwt, validateCourseUpdate, handleCoursesUpdateId);

// Patch (soft delete) a course by ID
router.patch('/delete/:id', verifyJwt, validateCourseGetId, handleCoursesPatchId);

// Patch (soft delete) removing users from a course
router.patch('/:courseId/enrollments', verifyJwt, validateRemoveUsersFromCourse, handleRemoveUsersFromCourse);

// Patch (soft delete) removing a user from a course
router.patch('/:courseId/enrollments/:userId', verifyJwt, validateRemoveUsersFromCourse, handleCIDEnrollmentsEID);

module.exports = router;