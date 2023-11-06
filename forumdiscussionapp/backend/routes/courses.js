const { handleCoursesGet } = require('../course-routes/handle-courses-get');
const { handleCoursesCreate } = require('../course-routes/handle-courses-create');
const { handleCoursesGetId } = require('../course-routes/handle-courses-get-id');
const { handleCoursesUpdateId } = require('../course-routes/handle-courses-update-id');
const { handleCoursesDeleteId } = require('../course-routes/handle-courses-delete-id');

const express = require('express');
const router = express.Router();
const { query } = require('../db');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Create a new course
router.post('/courses/create', async (req, res) => handleCoursesCreate(req, res));

// Get all courses
router.get('/courses/get', async (req, res) => handleCoursesGet(req, res));

// Get a course by ID
router.get('/courses/get/:id', async (req, res) =>handleCoursesGetId(req, res));

// Update a course by ID
router.put('/courses/update/:id', async (req, res) =>handleCoursesUpdateId(req, res));

// Delete a course by ID
router.delete('/courses/delete/:id', async (req, res) => handleCoursesDeleteId(req, res));

module.exports = router;
