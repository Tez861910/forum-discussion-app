const { handleCoursesGet } = require('../course-routes/handle-courses-get');
const { handleCoursesCreate } = require('../course-routes/handle-courses-create');
const { handleCoursesGetId } = require('../course-routes/handle-courses-get-id');
const { handleCoursesUpdateId } = require('../course-routes/handle-courses-update-id');
const { handleCoursesDeleteId } = require('../course-routes/handle-courses-delete-id');
const { handleCoursesEnrollmentsId } = require('../course-routes/handle-courses-enrollments-id');
const { handleCoursesIdEnroll } = require('../course-routes/handle-courses-id-enroll');
const { handleCIDEnrollmentsEID } = require('../course-routes/handle-courses-cid-enrollments-eid');

const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Create a new course
router.post('/courses/create', async (req, res) => handleCoursesCreate(req, res));

// Get course enrollments
router.get('/courses/enrollments/:courseId', async (req, res) =>handleCoursesEnrollmentsId(req, res));

// Get all courses
router.get('/courses/get', async (req, res) => handleCoursesGet(req, res));

// Enroll user in a course
router.post('/courses/:courseId/enroll', async (req, res) =>handleCoursesIdEnroll(req, res));

// Get a course by ID
router.get('/courses/get/:id', async (req, res) =>handleCoursesGetId(req, res));

// Update a course by ID
router.put('/courses/update/:id', async (req, res) =>handleCoursesUpdateId(req, res));

// Delete a course by ID
router.delete('/courses/delete/:id', async (req, res) => handleCoursesDeleteId(req, res));

// Remove user from a course
router.delete('/courses/:courseId/enrollments/:enrollmentId', async (req, res) =>handleCIDEnrollmentsEID(req, res));

module.exports = router;
