const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
  validateThreadCreate,
  validateThreadUpdate,
  validateThreadGetCourseId,
  validateThreadGetByThreadId,
} = require('../body-validation/thread-validation'); 


const { handleThreadsCreate } = require('../route-files/thread-routes/handle-threads-create');
const { handleThreadsGetCourseId } = require('../route-files/thread-routes/handle-threads-get-courseid');
const { handleThreadsGetAll } = require('../route-files/thread-routes/handle-threads-get-all');
const { handleThreadsGetByThreadId } = require('../route-files/thread-routes/handle-threads-get-id');
const { handleThreadsUpdateId } = require('../route-files/thread-routes/handle-threads-update-id');
const { handleThreadsDeleteId } = require('../route-files/thread-routes/handle-threads-delete-id');

router.use(express.json());

// Endpoint to get threads for a specific course
router.get('/get/:courseId', verifyJwt, validateThreadGetCourseId, handleThreadsGetCourseId);

// Endpoint to get a thread by threadId
router.get('/getthread/:threadId', verifyJwt, validateThreadGetByThreadId, handleThreadsGetByThreadId);

// Endpoint to get all threads
router.get('/get/all', verifyJwt, handleThreadsGetAll);

// Create a new thread
router.post('/create', verifyJwt, validateThreadCreate, handleThreadsCreate);

// Update a thread
router.put('/update/:threadId', verifyJwt, validateThreadUpdate, handleThreadsUpdateId);

// Delete a thread
router.delete('/delete/:threadId', verifyJwt, handleThreadsDeleteId);

module.exports = router;