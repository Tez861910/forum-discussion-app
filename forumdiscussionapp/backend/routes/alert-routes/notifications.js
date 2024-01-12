import express from "express";
import {
  validateNotificationCreate,
  validateNotificationUpdate,
  validateNotificationDelete,
} from "../../body-validation/alert-validation-functions/notification-validation.js";

import { handleNotificationCreate } from "../../route-functions/alert-function-routes/notification-routes/handle-notification-create.js";
import { handleNotificationUpdate } from "../../route-functions/alert-function-routes/notification-routes/handle-notification-update.js";
import { handleNotificationDelete } from "../../route-functions/alert-function-routes/notification-routes/handle-notification-delete.js";
import { handleNotificationGetAll } from "../../route-functions/alert-function-routes/notification-routes/handle-notification-get-all.js";

const router = express.Router();

// Get all notifications
router.get("/get/all", handleNotificationGetAll);

// Create a new notification
router.post("/create", validateNotificationCreate, handleNotificationCreate);

// Update a notification
router.put(
  "/update/:notificationId",
  validateNotificationUpdate,
  handleNotificationUpdate
);

// Delete a notification
router.delete(
  "/delete/:notificationId",
  validateNotificationDelete,
  handleNotificationDelete
);

export default router;
