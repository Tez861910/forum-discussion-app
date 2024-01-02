const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateGroupMembersCreate,
  validateGroupMembersDelete,
  validateGroupMembersGetByGroupId,
  validateGroupMembersGetByUserId,
} = require('../body-validation/group-members-validation');

const { handleGroupMembersCreate } = require('../route-files/group-members-routes/handle-groupMembers-create');
const { handleGroupMembersDelete } = require('../route-files/group-members-routes/handle-groupMembers-delete');
const { handleGroupMembersGetByGroupId } = require('../route-files/group-members-routes/handle-groupMembers-get-groupid');
const { handleGroupMembersGetByUserId } = require('../route-files/group-members-routes/handle-groupMembers-get-userid');

router.use(express.json());
router.use(cors());

// Create a new group member
router.post('/create', verifyJwt, validateGroupMembersCreate, handleGroupMembersCreate);

// Delete a group member
router.delete('/delete/:groupId/:userId', verifyJwt, validateGroupMembersDelete, handleGroupMembersDelete);

// Get group members by group ID
router.get('/get/group/:groupId', verifyJwt, validateGroupMembersGetByGroupId, handleGroupMembersGetByGroupId);

// Get groups by user ID
router.get('/get/user/:userId', verifyJwt, validateGroupMembersGetByUserId, handleGroupMembersGetByUserId);

module.exports = router;
