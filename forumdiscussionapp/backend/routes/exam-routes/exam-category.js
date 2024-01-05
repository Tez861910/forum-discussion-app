import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateCategoryCreate,
  validateCategoryUpdate,
  validateCategoryDelete,
} from '../../body-validation/exam-validation-functions/exam-category-validation.js';

import { handleCategoryCreate } from '../../route-files/exam-function-routes/exam-category-routes/handle-category-create.js';
import { handleCategoryUpdate } from '../../route-files/exam-function-routes/exam-category-routes/handle-category-update.js';
import { handleCategoryDelete } from '../../route-files/exam-function-routes/exam-category-routes/handle-category-delete.js';
import { handleCategoryGetAll } from '../../route-files/exam-function-routes/exam-category-routes/handle-category-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all exam categories
router.get('/get/all', verifyJwt, handleCategoryGetAll);

// Create new exam category
router.post('/create', verifyJwt, validateCategoryCreate, handleCategoryCreate);

// Update exam category
router.put('/update/:categoryId', verifyJwt, validateCategoryUpdate, handleCategoryUpdate);

// Delete exam category
router.delete('/delete/:categoryId', verifyJwt, validateCategoryDelete, handleCategoryDelete);

export default router;
