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
const { handleUserCoursesGet } = require('../route-files/user-routes/handle-user-courses-get');
const { handleUserCoursesGetId } = require('../route-files/user-routes/handle-user-courses-get-id');
const { handleUsersCreate } = require('../route-files/user-routes/handle-users-create');
const { handleUsersGetId } = require('../route-files/user-routes/handle-users-get-id');
const { handleUsersUpdateId } = require('../route-files/user-routes/handle-users-update-id');
const { handleUsersDeleteId } = require('../route-files/user-routes/handle-users-delete-id');
const { handleUsersGetRoleId } = require('../route-files/user-routes/handle-users-get-role-id');
const { handleUsersUpdateUsers } = require('../route-files/user-routes/handle-users-updates-users');

router.use(express.json());

// Create a new user
router.post('/users/create', verifyJwt, validateUserCreate, handleUsersCreate);

// Get all users
router.get('/users/get', verifyJwt, handleUsersGet);

// Get username
router.post('/getUsernames', verifyJwt, handleUsersGetUserName);

// Get all user courses
router.get('/usercourses/get', verifyJwt, handleUserCoursesGet);

// Get all user courses by userId
router.get('/usercourses/get/id', verifyJwt, handleUserCoursesGetId);

// Get a user by ID with RoleName
router.get('/users/get/:id', verifyJwt, validateUserGetId, handleUsersGetId);

// Update a user
router.put('/users/update/:id', verifyJwt, validateUserUpdate, handleUsersUpdateId);

// Update a user profile
router.put('/users/update/users/:id', verifyJwt, validateUserUpdateUsers, handleUsersUpdateUsers);

// Delete a user
router.delete('/users/delete/:id', verifyJwt, handleUsersDeleteId);

// Get a user by RoleID
router.get('/users/get/role/:roleId', verifyJwt, validateUserGetRoleId, handleUsersGetRoleId);

module.exports = router;