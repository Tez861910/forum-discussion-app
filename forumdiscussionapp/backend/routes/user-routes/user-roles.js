import express from 'express';
import cors from 'cors';
import { verifyJwt } from '../../authvalid.js';

import { handleRolesEnrollmentsId } from '../../route-files/user-function-routes/user-role-routes/handle-roles-enrollments-id.js';
import { handleRolesIdEnroll } from '../../route-files/user-function-routes/user-role-routes/handle-roles-id-enroll.js';
import { handleRIDEnrollmentsUID } from '../../route-files/user-function-routes/user-role-routes/handle-roles-rid-enrollments-uid.js';
import { handleRemoveUsersFromRole } from '../../route-files/user-function-routes/user-role-routes/handle-remove-users-from-roles.js';

import {
  validateRoleId,
  validateRoleIdUserIdEnroll,
  validateRoleIdUserIdRemoveById,
  validateRoleIdUserIdsRemove,
} from '../../body-validation/user-validation-functions/user-role-validation.js'; 

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get role enrollments
router.get('/enrollments/:roleId', verifyJwt, validateRoleId, handleRolesEnrollmentsId);

// Enroll user in a role
router.post('/:roleId/enroll', verifyJwt, validateRoleIdUserIdEnroll, handleRolesIdEnroll);

// Patch (soft delete) removing user from a role
router.patch('/:roleId/enrollments/:userId', verifyJwt, validateRoleIdUserIdRemoveById, handleRIDEnrollmentsUID);

// Patch (soft delete) removing users from a role
router.patch('/:roleId/enrollments', verifyJwt, validateRoleIdUserIdsRemove, handleRemoveUsersFromRole);

export default router;
