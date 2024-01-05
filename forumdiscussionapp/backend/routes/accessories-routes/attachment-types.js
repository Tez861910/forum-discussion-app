import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateAttachmentTypeCreate,
  validateAttachmentTypeUpdate,
  validateAttachmentTypeDelete,
} from '../../body-validation/accessories-validation-functions/attachment-type-validation.js';

import { handleAttachmentTypeCreate } from '../../route-files/accessories-function-routes/attachment-type-routes/handle-attachmentType-create.js';
import { handleAttachmentTypeUpdate } from '../../route-files/accessories-function-routes/attachment-type-routes/handle-attachmentType-update.js';
import { handleAttachmentTypeDelete } from '../../route-files/accessories-function-routes/attachment-type-routes/handle-attachmentType-delete.js';
import { handleAttachmentTypeGetAll } from '../../route-files/accessories-function-routes/attachment-type-routes/handle-attachmentType-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all attachment types
router.get('/get/all', verifyJwt, handleAttachmentTypeGetAll);

// Create a new attachment type
router.post('/create', verifyJwt, validateAttachmentTypeCreate, handleAttachmentTypeCreate);

// Update an attachment type
router.put('/update/:attachmentTypeId', verifyJwt, validateAttachmentTypeUpdate, handleAttachmentTypeUpdate);

// Delete an attachment type
router.delete('/delete/:attachmentTypeId', verifyJwt, validateAttachmentTypeDelete, handleAttachmentTypeDelete);

export default router;
