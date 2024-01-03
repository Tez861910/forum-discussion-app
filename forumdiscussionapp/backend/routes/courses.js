const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateCourseCreate,
  validateCourseUpdate,
  validateCourseGetId,
  validateCourseDelete,
} = require('../body-validation/course-validation');

const { handleCoursesGet } = require('../route-files/course-routes/handle-courses-get');
const { handleCoursesCreate } = require('../route-files/course-routes/handle-courses-create');
const { handleCoursesGetId } = require('../route-files/course-routes/handle-courses-get-id');
const { handleCoursesUpdateId } = require('../route-files/course-routes/handle-courses-update-id');
const { handleCoursesPatchId } = require('../route-files/course-routes/handle-courses-patch-id');

router.use(express.json());
router.use(cors());

// Create a new course
router.post('/create', verifyJwt, validateCourseCreate, handleCoursesCreate);

// Get all courses
router.get('/get', verifyJwt, handleCoursesGet);

// Get a course by ID
router.get('/get/:id', verifyJwt, validateCourseGetId, handleCoursesGetId);

// Update a course by ID
router.put('/update/:id', verifyJwt, validateCourseUpdate, handleCoursesUpdateId);

// Patch (soft delete) a course by ID
router.patch('/delete/:id', verifyJwt, validateCourseDelete, handleCoursesPatchId);


module.exports = router;