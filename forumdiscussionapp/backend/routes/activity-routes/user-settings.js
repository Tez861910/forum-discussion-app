const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../../authvalid');
const {
  validateUserSettingsCreate,
  validateUserSettingsUpdate,
  validateUserSettingsDelete,
} = require('../../body-validation/user-settings-validation');

const { handleUserSettingsCreate } = require('../../route-files/user-settings-routes/handle-user-settings-create');
const { handleUserSettingsUpdate } = require('../../route-files/user-settings-routes/handle-user-settings-update');
const { handleUserSettingsDelete } = require('../../route-files/user-settings-routes/handle-user-settings-delete');
const { handleUserSettingsGetAll } = require('../../route-files/user-settings-routes/handle-user-settings-get-all');

router.use(express.json());
router.use(cors());

// Get all user settings
router.get('/get/all', verifyJwt, handleUserSettingsGetAll);

// Create new user settings
router.post('/create', verifyJwt, validateUserSettingsCreate, handleUserSettingsCreate);

// Update user settings
router.put('/update/:settingId', verifyJwt, validateUserSettingsUpdate, handleUserSettingsUpdate);

// Delete user settings
router.delete('/delete/:settingId', verifyJwt, validateUserSettingsDelete, handleUserSettingsDelete);

module.exports = router;
