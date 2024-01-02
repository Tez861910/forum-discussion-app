const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
  validateResponseCreate,
  validateResponseUpdate,
  validateResponseDelete,
} = require('../body-validation/response-validation');

const {getAllResponses} =require('../route-files/response-routes/get-all-responses')
const {createResponse} =require('../route-files/response-routes/create-response')
const {updateResponse} =require('../route-files/response-routes/update-response')
const {deleteResponse} =require('../route-files/response-routes/delete-response')

router.use(express.json());

// Get all responses for a comment
router.get('/get/:commentId', verifyJwt, getAllResponses);

// Create a new response for a comment
router.post('/create/:commentId', verifyJwt, validateResponseCreate, createResponse);

// Update a response
router.put('/update/:responseId', verifyJwt, validateResponseUpdate, updateResponse);

// Delete a response
router.delete('/delete/:responseId', verifyJwt, validateResponseDelete, deleteResponse);

module.exports = router;
