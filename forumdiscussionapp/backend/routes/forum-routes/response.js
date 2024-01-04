import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateResponseCreate,
  validateResponseUpdate,
  validateResponseDelete,
} from '../../body-validation/response-validation.js';

import { getAllResponses } from '../../route-files/response-routes/get-all-responses.js';
import { createResponse } from '../../route-files/response-routes/create-response.js';
import { updateResponse } from '../../route-files/response-routes/update-response.js';
import { deleteResponse } from '../../route-files/response-routes/delete-response.js';

const router = express.Router();

router.use(express.json());

// Get all responses for a comment
router.get('/get/:commentId', verifyJwt, getAllResponses);

// Create a new response for a comment
router.post('/create/:commentId', verifyJwt, validateResponseCreate, createResponse);

// Update a response
router.put('/update/:responseId', verifyJwt, validateResponseUpdate, updateResponse);

// Delete a response
router.delete('/delete/:responseId', verifyJwt, validateResponseDelete, deleteResponse);

export default router;
