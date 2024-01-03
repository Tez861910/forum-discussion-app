const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateAttachmentCreate,
  validateAttachmentUpdate,
  validateAttachmentDelete,
} = require('../body-validation/attachment-validation');

const { handleAttachmentCreate } = require('../route-files/attachment-routes/handle-attachment-create');
const { handleAttachmentUpdate } = require('../route-files/attachment-routes/handle-attachment-update');
const { handleAttachmentDelete } = require('../route-files/attachment-routes/handle-attachment-delete');
const { handleAttachmentGetAll } = require('../route-files/attachment-routes/handle-attachment-get-all');

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

module.exports = router;
