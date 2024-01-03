const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');

const { handleRolesGet } = require('../route-files/role-routes/handle-roles-get');
const { handleRolesCreate } = require('../route-files/role-routes/handle-roles-create');
const { handleRolesGetId } = require('../route-files/role-routes/handle-roles-get-id');
const { handleRolesUpdateId } = require('../route-files/role-routes/handle-roles-update-id');
const { handleRolesPatchId } = require('../route-files/role-routes/handle-roles-patch-id');

const {
  validateRoleCreate,
  validateRoleUpdate,
  validateRoleId,
} = require('../body-validation/role-validation'); 

router.use(express.json());
router.use(cors());

// Create a new role
router.post('/create', verifyJwt, validateRoleCreate, handleRolesCreate);

// Get all roles
router.get('/get', handleRolesGet);

// Get a role by ID
router.get('/get/:id', verifyJwt, validateRoleId, handleRolesGetId);

// Update a role
router.put('/update/:id', verifyJwt, validateRoleUpdate, handleRolesUpdateId);

// Patch (soft delete) a role
router.patch('/delete/:id', verifyJwt, validateRoleId, handleRolesPatchId);



module.exports = router;