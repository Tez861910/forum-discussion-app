import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
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

router.use(express.json());
router.use(cors());

// Get all notifications
router.get("/get/all", verifyJwt, handleNotificationGetAll);

// Create a new notification
router.post(
  "/create",
  verifyJwt,
  validateNotificationCreate,
  handleNotificationCreate
);

// Update a notification
router.put(
  "/update/:notificationId",
  verifyJwt,
  validateNotificationUpdate,
  handleNotificationUpdate
);

// Delete a notification
router.delete(
  "/delete/:notificationId",
  verifyJwt,
  validateNotificationDelete,
  handleNotificationDelete
);

export default router;
