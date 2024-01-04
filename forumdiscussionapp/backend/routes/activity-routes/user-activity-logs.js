const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../../authvalid');
const {
  validateUserActivityLogCreate,
  validateUserActivityLogUpdate,
  validateUserActivityLogDelete,
} = require('../../body-validation/user-activity-log-validation');

const { handleUserActivityLogCreate } = require('../../route-files/user-activity-log-routes/handle-user-activity-log-create');
const { handleUserActivityLogUpdate } = require('../../route-files/user-activity-log-routes/handle-user-activity-log-update');
const { handleUserActivityLogDelete } = require('../../route-files/user-activity-log-routes/handle-user-activity-log-delete');
const { handleUserActivityLogGetAll } = require('../../route-files/user-activity-log-routes/handle-user-activity-log-get-all');

router.use(express.json());
router.use(cors());

// Get all user activity logs
router.get('/get/all', verifyJwt, handleUserActivityLogGetAll);

// Create a new user activity log
router.post('/create', verifyJwt, validateUserActivityLogCreate, handleUserActivityLogCreate);

// Update a user activity log
router.put('/update/:logId', verifyJwt, validateUserActivityLogUpdate, handleUserActivityLogUpdate);

// Delete a user activity log
router.delete('/delete/:logId', verifyJwt, validateUserActivityLogDelete, handleUserActivityLogDelete);

module.exports = router;
