const express = require('express');
const router = express.Router();
const {query} = require('../db');
const { createToken, hashPassword, verifyPassword } = require('../authvalid');

const { handleUsersGet } = require('./user-routes/handle-users-get');
const { handleUsersCreate } = require('./user-routes/handle-users-create');
const { handleUsersGetId } = require('./user-routes/handle-users-get-id');
const { handleUsersUpdateId } = require('./user-routes/handle-users-update-id');
const { handleUsersUpdateAdminId } = require('./user-routes/handle-users-update-admin-id');
const { handleUsersDeleteId } = require('./user-routes/handle-users-delete-id');

// Create a new user
router.post('/users/create', async (req, res) =>handleUsersCreate);

// Get all users
router.get('/users/get', async (req, res) =>handleUsersGet);

// Get a user by ID with CourseName and RoleName
router.get('/users/get/:id', async (req, res) => handleUsersGetId);

// Update a user
router.put('/users/update/:id', async (req, res) =>handleUsersUpdateId);

// Update a user admin
router.put('/users/update/admin/:id', async (req, res) => handleUsersUpdateAdminId);

// Delete a user
router.delete('/users/delete/:id', async (req, res) => handleUsersDeleteId);

module.exports = router;
