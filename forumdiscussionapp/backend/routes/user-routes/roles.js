import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';

import { handleRolesGet } from '../../route-files/role-routes/handle-roles-get.js';
import { handleRolesCreate } from '../../route-files/role-routes/handle-roles-create.js';
import { handleRolesGetId } from '../../route-files/role-routes/handle-roles-get-id.js';
import { handleRolesUpdateId } from '../../route-files/role-routes/handle-roles-update-id.js';
import { handleRolesPatchId } from '../../route-files/role-routes/handle-roles-patch-id.js';

import {
  validateRoleCreate,
  validateRoleUpdate,
  validateRoleId,
} from '../../body-validation/role-validation.js'; 

const router = express.Router();

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

export default router;
