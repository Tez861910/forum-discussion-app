const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
  validateUserCreate,
  validateUserUpdate,
  validateUserUpdateUsers,
  validateUserGetId,
  validateUserGetRoleId,
} = require('../body-validation/user-validation');

const { handleUsersGet } = require('../route-files/user-routes/handle-users-get');
const { handleUsersGetUserName } = require('../route-files/user-routes/handle-users-getusername');
const { handleUsersCreate } = require('../route-files/user-routes/handle-users-create');
const { handleUsersGetId } = require('../route-files/user-routes/handle-users-get-id');
const { handleUsersUpdateId } = require('../route-files/user-routes/handle-users-update-id');
const { handleUsersDeleteId } = require('../route-files/user-routes/handle-users-delete-id');
const { handleUsersGetRoleId } = require('../route-files/user-routes/handle-users-get-role-id');
const { handleUsersUpdateUsers } = require('../route-files/user-routes/handle-users-updates-users');

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

module.exports = router;