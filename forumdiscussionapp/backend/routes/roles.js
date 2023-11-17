const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const { handleRolesGet } = require('../role-routes/handle-roles-get');
const { handleRolesCreate } = require('../role-routes/handle-roles-create');
const { handleRolesGetId } = require('../role-routes/handle-roles-get-id');
const { handleRolesUpdateId } = require('../role-routes/handle-roles-update-id');
const { handleRolesPatchId } = require('../role-routes/handle-roles-patch-id');
const { handleRolesEnrollmentsId } = require('../role-routes/handle-roles-enrollments-id');
const { handleRolesIdEnroll } = require('../role-routes/handle-roles-id-enroll');
const { handleRIDEnrollmentsUID } = require('../role-routes/handle-roles-rid-enrollments-uid');



// Create a new role
router.post('/roles/create', async (req, res) => handleRolesCreate(req, res));

// Get all roles
router.get('/roles/get', async (req, res) => handleRolesGet(req, res));

// Get a role by ID
router.get('/roles/get/:id', async (req, res) => handleRolesGetId(req, res));

// Update a role
router.put('/roles/update/:id', async (req, res) => handleRolesUpdateId(req, res));

// Patch (soft delete) a role
router.patch('/roles/delete/:id', async (req, res) => handleRolesPatchId(req, res));

// Get role enrollments
router.get('/roles/enrollments/:roleId', async (req, res) => handleRolesEnrollmentsId(req, res));

// Enroll user in a role
router.post('/roles/:roleId/enroll', async (req, res) => handleRolesIdEnroll(req, res));

// Patch (soft delete) removing user from a role
router.patch('/roles/:roleId/enrollments/:userId', async (req, res) => handleRIDEnrollmentsUID(req, res));

module.exports = router;
