const express = require('express');
const router = express.Router();
const { query } = require('../db');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const { handleRolesGet } = require('../role-routes/handle-roles-get');
const { handleRolesCreate } = require('../role-routes/handle-roles-create');
const { handleRolesGetId } = require('../role-routes/handle-roles-get-id');
const { handleRolesUpdateId } = require('../role-routes/handle-roles-update-id');
const { handleRolesDeleteId } = require('../role-routes/handle-roles-delete-id');

// Create a new role
router.post('/roles/create', async (req, res) => handleRolesCreate(req, res));

// Get all roles
router.get('/roles/get', async (req, res) =>handleRolesGet(req, res));

// Get a role by ID
router.get('/roles/get/:id', async (req, res) => handleRolesGetId(req, res));

// Update a role
router.put('/roles/update/:id', async (req, res) => handleRolesUpdateId(req, res));

// Delete a role
router.delete('/roles/delete/:id', async (req, res) =>handleRolesDeleteId(req, res));

module.exports = router;
