const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');

const { handleRolesEnrollmentsId } = require('../route-files/role-routes/handle-roles-enrollments-id');
const { handleRolesIdEnroll } = require('../route-files/role-routes/handle-roles-id-enroll');
const { handleRIDEnrollmentsUID } = require('../route-files/role-routes/handle-roles-rid-enrollments-uid');
const { handleRemoveUsersFromRole } = require('../route-files/role-routes/handle-remove-users-from-roles');

const {
    validateRoleIdUserId,
  } = require('../body-validation/user-role-validation'); 

router.use(express.json());
router.use(cors());

// Get role enrollments
router.get('/enrollments/:roleId', verifyJwt, validateRoleId, handleRolesEnrollmentsId);

// Enroll user in a role
router.post('/:roleId/enroll', verifyJwt, validateRoleIdUserId, handleRolesIdEnroll);

// Patch (soft delete) removing user from a role
router.patch('/:roleId/enrollments/:userId', verifyJwt, validateRoleIdUserId, handleRIDEnrollmentsUID);

// Patch (soft delete) removing users from a role
router.patch('/:roleId/enrollments', verifyJwt, validateRoleIdUserId, handleRemoveUsersFromRole);

module.exports = router;