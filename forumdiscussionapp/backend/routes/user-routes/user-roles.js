import express from "express";

import { handleRolesEnrollmentsId } from "../../route-functions/user-function-routes/user-role-routes/handle-roles-enrollments-id.js";
import { handleRolesIdEnroll } from "../../route-functions/user-function-routes/user-role-routes/handle-roles-id-enroll.js";
import { handleRIDEnrollmentsUID } from "../../route-functions/user-function-routes/user-role-routes/handle-roles-rid-enrollments-uid.js";
import { handleRemoveUsersFromRole } from "../../route-functions/user-function-routes/user-role-routes/handle-remove-users-from-roles.js";

import {
  validateRoleId,
  validateRoleIdUserIdEnroll,
  validateRoleIdUserIdRemoveById,
  validateRoleIdUserIdsRemove,
} from "../../body-validation/user-validation-functions/user-role-validation.js";

const router = express.Router();

// Get role enrollments
router.get("/enrollments/:roleId", validateRoleId, handleRolesEnrollmentsId);

// Enroll user in a role
router.post("/:roleId/enroll", validateRoleIdUserIdEnroll, handleRolesIdEnroll);

// Patch (soft delete) removing user from a role
router.patch(
  "/:roleId/enrollments/:userId",
  validateRoleIdUserIdRemoveById,
  handleRIDEnrollmentsUID
);

// Patch (soft delete) removing users from a role
router.patch(
  "/:roleId/enrollments",
  validateRoleIdUserIdsRemove,
  handleRemoveUsersFromRole
);

export default router;
