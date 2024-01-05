import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';
import {
  validateAttachmentCreate,
  validateAttachmentUpdate,
  validateAttachmentDelete,
} from '../../body-validation/accessories-validation-functions/attachment-validation.js';

import { handleAttachmentCreate } from '../../route-files/accessories-function-routes/attachment-routes/handle-attachment-create.js';
import { handleAttachmentUpdate } from '../../route-files/accessories-function-routes/attachment-routes/handle-attachment-update.js';
import { handleAttachmentDelete } from '../../route-files/accessories-function-routes/attachment-routes/handle-attachment-delete.js';
import { handleAttachmentGetAll } from '../../route-files/accessories-function-routes/attachment-routes/handle-attachment-get-all.js';

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all attachments
router.get('/get/all', verifyJwt, handleAttachmentGetAll);

// Create a new attachment
router.post('/create', verifyJwt, validateAttachmentCreate, handleAttachmentCreate);

// Update an attachment
router.put('/update/:attachmentId', verifyJwt, validateAttachmentUpdate, handleAttachmentUpdate);

// Delete an attachment
router.delete('/delete/:attachmentId', verifyJwt, validateAttachmentDelete, handleAttachmentDelete);

export default router;
