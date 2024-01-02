const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateUserResponseCreate,
  validateUserResponseUpdate,
  validateUserResponseDelete,
} = require('../body-validation/user-response-validation');

const { handleUserResponseDeleteById } = require('../route-files/user-response-routes/handle-userResponse-delete-id');
const { handleUserResponseUpdateById } = require('../route-files/user-response-routes/handle-userResponse-update-id');
const { handleUserResponseCreate } = require('../route-files/user-response-routes/handle-userResponse-create');
const { handleUserResponsesGetAll } = require('../route-files/user-response-routes/handle-userResponses-get-all');

router.use(express.json());
router.use(cors());

// Get all user responses
router.get('/get/all', verifyJwt, handleUserResponsesGetAll);

// Create a new user response
router.post('/create', verifyJwt, validateUserResponseCreate, handleUserResponseCreate);

// Update a user response
router.put('/update/:userResponseId', verifyJwt, validateUserResponseUpdate, handleUserResponseUpdateById);

// Delete a user response
router.delete('/delete/:userResponseId', verifyJwt, validateUserResponseDelete, handleUserResponseDeleteById);

module.exports = router;
