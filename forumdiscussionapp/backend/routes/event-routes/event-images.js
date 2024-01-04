const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../../authvalid.js');
const {
  validateImageCreate,
  validateImageUpdate,
  validateImageDelete,
} = require('../../body-validation/event-image-validation.js');

const { handleImageCreate } = require('../../route-files/event-image-routes/handle-image-create.js');
const { handleImageUpdate } = require('../../route-files/event-image-routes/handle-image-update.js');
const { handleImageDelete } = require('../../route-files/event-image-routes/handle-image-delete.js');
const { handleImageGetAll } = require('../../route-files/event-image-routes/handle-image-get-all.js');

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

module.exports = router;
