const express = require('express');
const router = express.Router();
const {query} = require('../db');
const { createToken, hashPassword, verifyPassword } = require('../authvalid');

const { handleUsersGet } = require('../user-routes/handle-users-get');
const { handleUsersCreate } = require('../user-routes/handle-users-create');
const { handleUsersGetId } = require('../user-routes/handle-users-get-id');
const { handleUsersUpdateId } = require('../user-routes/handle-users-update-id');
const { handleUsersDeleteId } = require('../user-routes/handle-users-delete-id');
const { handleUsersGetRoleId } = require('../user-routes/handle-users-get-role-id');
const { handleUsersUpdateUsers } = require('../user-routes/handle-users-updates-users');

// Create a new user
router.post('/users/create', async (req, res) =>handleUsersCreate(req, res));

// Get all users
router.get('/users/get', async (req, res) =>handleUsersGet(req, res));

// Get a user by ID with CourseName and RoleName
router.get('/users/get/:id', async (req, res) => handleUsersGetId(req, res));

// Update a user
router.put('/users/update/:id', async (req, res) =>handleUsersUpdateId(req, res));

// Update a user profile
router.put('/users/update/users/:id', async (req, res) =>handleUsersUpdateUsers(req, res));


// Delete a user
router.delete('/users/delete/:id', async (req, res) => handleUsersDeleteId(req, res));

// Get a user by RoleID
router.get('/users/get/role/:roleId', async (req, res) => handleUsersGetRoleId(req, res));

module.exports = router;
