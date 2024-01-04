import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateUserCreate,
  validateUserUpdate,
  validateUserUpdateUsers,
  validateUserGetId,
  validateUserGetRoleId,
} from '../../body-validation/user-validation.js';

import { handleUsersGet } from '../../route-files/user-routes/handle-users-get.js';
import { handleUsersGetUserName } from '../../route-files/user-routes/handle-users-getusername.js';
import { handleUsersCreate } from '../../route-files/user-routes/handle-users-create.js';
import { handleUsersGetId } from '../../route-files/user-routes/handle-users-get-id.js';
import { handleUsersUpdateId } from '../../route-files/user-routes/handle-users-update-id.js';
import { handleUsersDeleteId } from '../../route-files/user-routes/handle-users-delete-id.js';
import { handleUsersGetRoleId } from '../../route-files/user-routes/handle-users-get-role-id.js';
import { handleUsersUpdateUsers } from '../../route-files/user-routes/handle-users-updates-users.js';

const router = express.Router();

router.use(express.json());

// Create a new user
router.post('/create', verifyJwt, validateUserCreate, handleUsersCreate);

// Get all users
router.get('/get', verifyJwt, handleUsersGet);

// Get username
router.post('/getUsernames', verifyJwt, handleUsersGetUserName);

// Get a user by ID with RoleName
router.get('/get/:id', verifyJwt, validateUserGetId, handleUsersGetId);

// Update a user
router.put('/update/:id', verifyJwt, validateUserUpdate, handleUsersUpdateId);

// Update a user profile
router.put('/update/users/:id', verifyJwt, validateUserUpdateUsers, handleUsersUpdateUsers);

// Delete a user
router.delete('/delete/:id', verifyJwt, handleUsersDeleteId);

// Get users by RoleID
router.get('/get/role/:roleId', verifyJwt, validateUserGetRoleId, handleUsersGetRoleId);

export default router;
