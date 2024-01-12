import express from "express";
import {
  validatePrivateMessageCreate,
  validatePrivateMessageUpdate,
  validatePrivateMessageDelete,
  validatePrivateMessagesGetByUser,
} from "../../body-validation/messaging-validation-functions/private-message-validation.js";

import { handlePrivateMessageDeleteById } from "../../route-functions/messaging-function-routes/private-message-routes/handle-privateMessage-delete-id.js";
import { handlePrivateMessageUpdateById } from "../../route-functions/messaging-function-routes/private-message-routes/handle-privateMessage-update-id.js";
import { handlePrivateMessageCreate } from "../../route-functions/messaging-function-routes/private-message-routes/handle-privateMessage-create.js";
import { handlePrivateMessagesGetByUser } from "../../route-functions/messaging-function-routes/private-message-routes/handle-privateMessages-get-by-user.js";

const router = express.Router();

// Get all private messages for a user
router.get(
  "/get/user/:userId",
  validatePrivateMessagesGetByUser,
  handlePrivateMessagesGetByUser
);

// Create a new private message
router.post(
  "/create",
  validatePrivateMessageCreate,
  handlePrivateMessageCreate
);

// Update a private message
router.put(
  "/update/:messageId",
  validatePrivateMessageUpdate,
  handlePrivateMessageUpdateById
);

// Delete a private message
router.delete(
  "/delete/:messageId",
  validatePrivateMessageDelete,
  handlePrivateMessageDeleteById
);

export default router;
