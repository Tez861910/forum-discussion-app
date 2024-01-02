const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateMCQOptionCreate,
  validateMCQOptionUpdate,
  validateMCQOptionDelete,
} = require('../body-validation/mcq-option-validation');

const { handleMCQOptionDeleteById } = require('../route-files/mcq-option-routes/handle-mcq-option-delete-id');
const { handleMCQOptionUpdateById } = require('../route-files/mcq-option-routes/handle-mcq-option-update-id');
const { handleMCQOptionCreate } = require('../route-files/mcq-option-routes/handle-mcq-option-create');
const { handleMCQOptionsGetAll } = require('../route-files/mcq-option-routes/handle-mcq-options-get-all');

router.use(express.json());
router.use(cors());

// Get all MCQ options
router.get('/get/all', verifyJwt, handleMCQOptionsGetAll);

// Create a new MCQ option
router.post('/create', verifyJwt, validateMCQOptionCreate, handleMCQOptionCreate);

// Update an MCQ option
router.put('/update/:mcqOptionId', verifyJwt, validateMCQOptionUpdate, handleMCQOptionUpdateById);

// Delete an MCQ option
router.delete('/delete/:mcqOptionId', verifyJwt, validateMCQOptionDelete, handleMCQOptionDeleteById);

module.exports = router;
