const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
  validateResponseCreate,
  validateResponseUpdate,
  validateResponseDelete,
} = require('../body-validation/response-validation');

const {getAllResponses} =require('../response-routes/get-all-responses')
const {createResponse} =require('../response-routes/create-response')
const {updateResponse} =require('../response-routes/update-response')
const {deleteResponse} =require('../response-routes/delete-response')

router.use(express.json());

// Get all responses for a comment
router.get('/responses/get/:commentId', verifyJwt, getAllResponses);

// Create a new response for a comment
router.post('/responses/create/:commentId', verifyJwt, validateResponseCreate, createResponse);

// Update a response
router.put('/responses/update/:responseId', verifyJwt, validateResponseUpdate, updateResponse);

// Delete a response
router.delete('/responses/delete/:responseId', verifyJwt, validateResponseDelete, deleteResponse);

module.exports = router;
