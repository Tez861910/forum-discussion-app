const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');

router.use(express.json());

const { handleUsersGet } = require('../user-routes/handle-users-get');
const { handleUsersGetUserName } = require('../user-routes/handle-users-getusername');
const { handleUserCoursesGet } = require('../user-routes/handle-user-courses-get');
const { handleUserCoursesGetId } = require('../user-routes/handle-user-courses-get-id');
const { handleUsersCreate } = require('../user-routes/handle-users-create');
const { handleUsersGetId } = require('../user-routes/handle-users-get-id');
const { handleUsersUpdateId } = require('../user-routes/handle-users-update-id');
const { handleUsersDeleteId } = require('../user-routes/handle-users-delete-id');
const { handleUsersGetRoleId } = require('../user-routes/handle-users-get-role-id');
const { handleUsersUpdateUsers } = require('../user-routes/handle-users-updates-users');

// Create a new user
router.post('/users/create', verifyJwt, async (req, res) =>handleUsersCreate(req, res));

// Get all users
router.get('/users/get', verifyJwt, async (req, res) =>handleUsersGet(req, res));

// Get username
router.post('/getUsernames', verifyJwt, async (req, res) =>handleUsersGetUserName(req, res));

// Get all usercoures
router.get('/usercourses/get', verifyJwt, async (req, res) =>handleUserCoursesGet(req, res));

// Get all usercoures by userId
router.get('/usercourses/get/id', verifyJwt, async (req, res) =>handleUserCoursesGetId(req, res));

// Get a user by ID with CourseName and RoleName
router.get('/users/get/:id', verifyJwt, async (req, res) => handleUsersGetId(req, res));

// Update a user
router.put('/users/update/:id', verifyJwt, async (req, res) =>handleUsersUpdateId(req, res));

// Update a user profile
router.put('/users/update/users/:id', verifyJwt, async (req, res) =>handleUsersUpdateUsers(req, res));

// Delete a user
router.delete('/users/delete/:id', verifyJwt, async (req, res) => handleUsersDeleteId(req, res));

// Get a user by RoleID
router.get('/users/get/role/:roleId', verifyJwt, async (req, res) => handleUsersGetRoleId(req, res));

module.exports = router;
