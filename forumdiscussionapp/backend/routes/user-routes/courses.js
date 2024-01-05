import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateCourseCreate,
  validateCourseUpdate,
  validateCourseGetId,
  validateCourseDelete,
} from '../../body-validation/user-validation-functions/course-validation.js';

import { handleCoursesGet } from '../../route-files/user-function-routes/course-routes/handle-courses-get.js';
import { handleCoursesCreate } from '../../route-files/user-function-routes/course-routes/handle-courses-create.js';
import { handleCoursesGetId } from '../../route-files/user-function-routes/course-routes/handle-courses-get-id.js';
import { handleCoursesUpdateId } from '../../route-files/user-function-routes/course-routes/handle-courses-update-id.js';
import { handleCoursesPatchId } from '../../route-files/user-function-routes/course-routes/handle-courses-patch-id.js';

const router = express.Router();

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

export default router;
