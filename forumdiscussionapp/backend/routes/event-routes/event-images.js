import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateImageCreate,
  validateImageUpdate,
  validateImageDelete,
} from '../../body-validation/event-validation-functions/event-image-validation.js';

import { handleImageCreate } from '../../route-files/event-function-routes/event-image-routes/handle-image-create.js';
import { handleImageUpdate } from '../../route-files/event-function-routes/event-image-routes/handle-image-update.js';
import { handleImageDelete } from '../../route-files/event-function-routes/event-image-routes/handle-image-delete.js';
import { handleImageGetAll } from '../../route-files/event-function-routes/event-image-routes/handle-image-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all event images
router.get('/get/all', verifyJwt, handleImageGetAll);

// Create new event image
router.post('/create', verifyJwt, validateImageCreate, handleImageCreate);

// Update event image
router.put('/update/:imageId', verifyJwt, validateImageUpdate, handleImageUpdate);

// Delete event image
router.delete('/delete/:imageId', verifyJwt, validateImageDelete, handleImageDelete);

export default router;
