import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateFacultyCreate,
  validateFacultyUpdate,
  validateFacultyDelete,
} from '../../body-validation/faculty-validation.js';

import { handleFacultyCreate } from '../../route-files/faculty-routes/handle-faculty-create.js';
import { handleFacultyUpdate } from '../../route-files/faculty-routes/handle-faculty-update.js';
import { handleFacultyDelete } from '../../route-files/faculty-routes/handle-faculty-delete.js';
import { handleFacultyGetAll } from '../../route-files/faculty-routes/handle-faculty-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all faculty members
router.get('/get/all', verifyJwt, handleFacultyGetAll);

// Create new faculty member
router.post('/create', verifyJwt, validateFacultyCreate, handleFacultyCreate);

// Update faculty member
router.put('/update/:facultyId', verifyJwt, validateFacultyUpdate, handleFacultyUpdate);

// Delete faculty member
router.delete('/delete/:facultyId', verifyJwt, validateFacultyDelete, handleFacultyDelete);

export default router;
