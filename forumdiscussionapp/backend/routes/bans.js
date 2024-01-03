const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateBanCreate,
  validateBanUpdate,
  validateBanDelete,
} = require('../body-validation/ban-validation');

const { handleBanCreate } = require('../route-files/ban-routes/handle-ban-create');
const { handleBanUpdate } = require('../route-files/ban-routes/handle-ban-update');
const { handleBanDelete } = require('../route-files/ban-routes/handle-ban-delete');
const { handleBanGetAll } = require('../route-files/ban-routes/handle-ban-get-all');

router.use(express.json());
router.use(cors());

// Get all bans
router.get('/get/all', verifyJwt, handleBanGetAll);

// Create a new ban
router.post('/create', verifyJwt, validateBanCreate, handleBanCreate);

// Update a ban
router.put('/update/:banId', verifyJwt, validateBanUpdate, handleBanUpdate);

// Delete a ban
router.delete('/delete/:banId', verifyJwt, validateBanDelete, handleBanDelete);

module.exports = router;
