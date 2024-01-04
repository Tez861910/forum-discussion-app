const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../../authvalid');
const {
  validateNotificationCreate,
  validateNotificationUpdate,
  validateNotificationDelete,
} = require('../../body-validation/notification-validation');

const { handleNotificationCreate } = require('../../route-files/notification-routes/handle-notification-create');
const { handleNotificationUpdate } = require('../../route-files/notification-routes/handle-notification-update');
const { handleNotificationDelete } = require('../../route-files/notification-routes/handle-notification-delete');
const { handleNotificationGetAll } = require('../../route-files/notification-routes/handle-notification-get-all');

router.use(express.json());
router.use(cors());

// Get all notifications
router.get('/get/all', verifyJwt, handleNotificationGetAll);

// Create a new notification
router.post('/create', verifyJwt, validateNotificationCreate, handleNotificationCreate);

// Update a notification
router.put('/update/:notificationId', verifyJwt, validateNotificationUpdate, handleNotificationUpdate);

// Delete a notification
router.delete('/delete/:notificationId', verifyJwt, validateNotificationDelete, handleNotificationDelete);

module.exports = router;
