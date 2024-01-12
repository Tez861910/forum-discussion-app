import express from "express";
import {
  validateGroupMessagesCreate,
  validateGroupMessagesDelete,
  validateGroupMessagesGetByGroupId,
  validateGroupMessagesGetBySenderId,
} from "../../body-validation/groupchat-validation-functions/group-messages-validation.js";

import { handleGroupMessagesCreate } from "../../route-functions/groupchat-function-routes/group-messages-routes/handle-groupMessages-create.js";
import { handleGroupMessagesDelete } from "../../route-functions/groupchat-function-routes/group-messages-routes/handle-groupMessages-delete.js";
import { handleGroupMessagesGetByGroupId } from "../../route-functions/groupchat-function-routes/group-messages-routes/handle-groupMessages-get-groupid.js";
import { handleGroupMessagesGetBySenderId } from "../../route-functions/groupchat-function-routes/group-messages-routes/handle-groupMessages-get-senderid.js";

const router = express.Router();

// Create a new group message
router.post("/create", validateGroupMessagesCreate, handleGroupMessagesCreate);

// Delete a group message
router.delete(
  "/delete/:messageId",
  validateGroupMessagesDelete,
  handleGroupMessagesDelete
);

// Get group messages by group ID
router.get(
  "/get/group/:groupId",
  validateGroupMessagesGetByGroupId,
  handleGroupMessagesGetByGroupId
);

// Get group messages by sender ID
router.get(
  "/get/sender/:senderId",
  validateGroupMessagesGetBySenderId,
  handleGroupMessagesGetBySenderId
);

export default router;
