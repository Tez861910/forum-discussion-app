const express = require('express');
const router = express.Router();


router.use(express.json());

const { handleThreadsCreate } = require('../thread-routes/handle-threads-create');
const { handleThreadsGetCourseId } = require('../thread-routes/handle-threads-get-courseid');
const { handleThreadsGetAll } = require('../thread-routes/handle-threads-get-all');
const { handleThreadsGetByThreadId } = require('../thread-routes/handle-threads-get-id');
const { handleThreadsUpdateId } = require('../thread-routes/handle-threads-update-id');
const { handleThreadsDeleteId } = require('../thread-routes/handle-threads-delete-id');

// Endpoint to get threads for a specific course
router.get('/threads/get/:courseId', async (req, res) =>handleThreadsGetCourseId(req, res));
// Endpoint to get thread 
router.get('/threads/getthread/:threadId', async (req, res) =>handleThreadsGetByThreadId(req, res));  
// Endpoint to get all threads
router.get('/threads/get/all', async (req, res) =>handleThreadsGetAll(req, res));  
// Create a new thread
router.post('/threads/create', async (req, res) =>handleThreadsCreate(req, res));
// Update a thread
router.put('/threads/update/:threadId', async (req, res) => handleThreadsUpdateId(req, res));
// Delete a thread
router.delete('/threads/delete/:threadId', async (req, res) => handleThreadsDeleteId(req, res));


module.exports = router;
