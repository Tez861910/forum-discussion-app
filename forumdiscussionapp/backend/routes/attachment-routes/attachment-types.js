const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../../authvalid');
const {
  validateAttachmentTypeCreate,
  validateAttachmentTypeUpdate,
  validateAttachmentTypeDelete,
} = require('../../body-validation/attachment-type-validation');

const { handleAttachmentTypeCreate } = require('../../route-files/attachment-type-routes/handle-attachmentType-create');
const { handleAttachmentTypeUpdate } = require('../../route-files/attachment-type-routes/handle-attachmentType-update');
const { handleAttachmentTypeDelete } = require('../../route-files/attachment-type-routes/handle-attachmentType-delete');
const { handleAttachmentTypeGetAll } = require('../../route-files/attachment-type-routes/handle-attachmentType-get-all');

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

module.exports = router;
