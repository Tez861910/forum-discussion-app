import express from "express";
import {
  validateUserCreate,
  validateUserUpdate,
  validateUserUpdateUsers,
  validateUserGetId,
  validateUserGetRoleId,
} from "../../body-validation/user-validation-functions/user-validation.js";

import { handleUsersGet } from "../../route-functions/user-function-routes/user-routes/handle-users-get.js";
import { handleUsersGetUserName } from "../../route-functions/user-function-routes/user-routes/handle-users-getusername.js";
import { handleUsersCreate } from "../../route-functions/user-function-routes/user-routes/handle-users-create.js";
import { handleUsersGetId } from "../../route-functions/user-function-routes/user-routes/handle-users-get-id.js";
import { handleUsersUpdateId } from "../../route-functions/user-function-routes/user-routes/handle-users-update-id.js";
import { handleUsersDeleteId } from "../../route-functions/user-function-routes/user-routes/handle-users-delete-id.js";
import { handleUsersGetRoleId } from "../../route-functions/user-function-routes/user-routes/handle-users-get-role-id.js";
import { handleUsersUpdateUsers } from "../../route-functions/user-function-routes/user-routes/handle-users-updates-users.js";

const router = express.Router();

// Create a new user
router.post("/create", validateUserCreate, handleUsersCreate);

// Get all users
router.get("/get", handleUsersGet);

// Get username
router.post("/getUsernames", handleUsersGetUserName);

// Get a user by ID with RoleName
router.get("/get/:id", validateUserGetId, handleUsersGetId);

// Update a user
router.put("/update/:id", validateUserUpdate, handleUsersUpdateId);

// Update a user profile
router.put(
  "/update/users/:id",
  validateUserUpdateUsers,
  handleUsersUpdateUsers
);

// Delete a user
router.delete("/delete/:id", handleUsersDeleteId);

// Get users by RoleID
router.get("/get/role/:roleId", validateUserGetRoleId, handleUsersGetRoleId);

export default router;
