import express from "express";
import {
  validateGroupMembersCreate,
  validateGroupMembersDelete,
  validateGroupMembersGetByGroupId,
  validateGroupMembersGetByUserId,
} from "../../body-validation/groupchat-validation-functions/group-members-validation.js";

import { handleGroupMembersCreate } from "../../route-functions/groupchat-function-routes/group-members-routes/handle-groupMembers-create.js";
import { handleGroupMembersDelete } from "../../route-functions/groupchat-function-routes/group-members-routes/handle-groupMembers-delete.js";
import { handleGroupMembersGetByGroupId } from "../../route-functions/groupchat-function-routes/group-members-routes/handle-groupMembers-get-groupid.js";
import { handleGroupMembersGetByUserId } from "../../route-functions/groupchat-function-routes/group-members-routes/handle-groupMembers-get-userid.js";

const router = express.Router();

// Create a new group member
router.post("/create", validateGroupMembersCreate, handleGroupMembersCreate);

// Delete a group member
router.delete(
  "/delete/:groupId/:userId",
  validateGroupMembersDelete,
  handleGroupMembersDelete
);

// Get group members by group ID
router.get(
  "/get/group/:groupId",
  validateGroupMembersGetByGroupId,
  handleGroupMembersGetByGroupId
);

// Get groups by user ID
router.get(
  "/get/user/:userId",
  validateGroupMembersGetByUserId,
  handleGroupMembersGetByUserId
);

export default router;
