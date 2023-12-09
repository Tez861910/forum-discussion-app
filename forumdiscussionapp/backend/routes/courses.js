const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
router.use(express.json());
router.use(cors());
const { verifyJwt } = require('../authvalid');

const { handleCoursesGet } = require('../course-routes/handle-courses-get');
const { handleCoursesCreate } = require('../course-routes/handle-courses-create');
const { handleCoursesGetId } = require('../course-routes/handle-courses-get-id');
const { handleCoursesUpdateId } = require('../course-routes/handle-courses-update-id');
const { handleCoursesPatchId } = require('../course-routes/handle-courses-patch-id');
const { handleCoursesEnrollmentsId } = require('../course-routes/handle-courses-enrollments-id');
const { handleCoursesIdEnroll } = require('../course-routes/handle-courses-id-enroll');
const { handleRemoveUsersFromCourse } = require('../course-routes/handle-remove-users-from-course');
const { handleCIDEnrollmentsEID } = require('../course-routes/handle-courses-cid-enrollments-eid');


// Create a new course
router.post('/courses/create', verifyJwt, async (req, res) => handleCoursesCreate(req, res));

// Get course enrollments
router.get('/courses/enrollments/:courseId', verifyJwt, async (req, res) =>handleCoursesEnrollmentsId(req, res));

// Get all courses
router.get('/courses/get', verifyJwt, async (req, res) => handleCoursesGet(req, res));

// Enroll user in a course
router.post('/courses/:courseId/enroll', verifyJwt, async (req, res) =>handleCoursesIdEnroll(req, res));

// Get a course by ID
router.get('/courses/get/:id', verifyJwt, async (req, res) =>handleCoursesGetId(req, res));

// Update a course by ID
router.put('/courses/update/:id', verifyJwt, async (req, res) =>handleCoursesUpdateId(req, res));

// Patch (soft delete) a course by ID
router.patch('/courses/delete/:id', verifyJwt, async (req, res) => handleCoursesPatchId(req, res));

// Patch (soft delete) removing users from a course
router.patch('/courses/:courseId/enrollments', verifyJwt, async (req, res) => handleRemoveUsersFromCourse(req, res));

// Patch (soft delete) removing user from a course
router.patch('/courses/:courseId/enrollments/:userId', verifyJwt, async (req, res) => handleCIDEnrollmentsEID(req, res));


module.exports = router;
