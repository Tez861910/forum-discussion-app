import express from "express";
import {
  validateGroupChatCreate,
  validateGroupChatUpdate,
  validateGroupChatDelete,
  validateGroupChatGetById,
  validateGroupChatGetByName,
} from "../../body-validation/groupchat-validation-functions/group-chat-validation.js";

import { handleGroupChatCreate } from "../../route-functions/groupchat-function-routes/group-chat-routes/handle-groupChat-create.js";
import { handleGroupChatUpdateById } from "../../route-functions/groupchat-function-routes/group-chat-routes/handle-groupChat-update-id.js";
import { handleGroupChatDeleteById } from "../../route-functions/groupchat-function-routes/group-chat-routes/handle-groupChat-delete-id.js";
import { handleGroupChatGetById } from "../../route-functions/groupchat-function-routes/group-chat-routes/handle-groupChat-get-id.js";
import { handleGroupChatGetByName } from "../../route-functions/groupchat-function-routes/group-chat-routes/handle-groupChat-get-name.js";

const router = express.Router();

// Get a group chat by ID
router.get(
  "/get/id/:groupId",
  validateGroupChatGetById,
  handleGroupChatGetById
);

// Get a group chat by name
router.get(
  "/get/name/:groupName",
  validateGroupChatGetByName,
  handleGroupChatGetByName
);

// Create a new group chat
router.post("/create", validateGroupChatCreate, handleGroupChatCreate);

// Update a group chat
router.put(
  "/update/:groupId",
  validateGroupChatUpdate,
  handleGroupChatUpdateById
);

// Delete a group chat
router.delete(
  "/delete/:groupId",
  validateGroupChatDelete,
  handleGroupChatDeleteById
);

export default router;
