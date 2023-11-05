const express = require('express');
const router = express.Router();
const { query } = require('../db');

router.use(express.json());

const { handleThreadsCreate } = require('./thread-routes/handle-threads-create');
const { handleThreadsGetCourseId } = require('./thread-routes/handle-threads-get-courseid');
const { handleThreadsUpdateId } = require('./thread-routes/handle-threads-update-id');
const { handleThreadsDeleteId } = require('./thread-routes/handle-threads-delete-id');

// Endpoint to get threads for a specific course
router.get('/threads/get/:courseId', async (req, res) =>handleThreadsGetCourseId); 
// Create a new thread
router.post('/threads/create', async (req, res) =>handleThreadsCreate);
// Update a thread
router.put('/threads/update/:id', async (req, res) => handleThreadsUpdateId);
// Delete a thread
router.delete('/threads/delete/:id', async (req, res) => handleThreadsDeleteId);

module.exports = router;
