const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateAnnouncementCreate,
  validateAnnouncementUpdate,
  validateAnnouncementDelete,
} = require('../body-validation/announcement-validation');

const { handleAnnouncementCreate } = require('../route-files/announcement-routes/handle-announcement-create');
const { handleAnnouncementUpdate } = require('../route-files/announcement-routes/handle-announcement-update');
const { handleAnnouncementDelete } = require('../route-files/announcement-routes/handle-announcement-delete');
const { handleAnnouncementGetAll } = require('../route-files/announcement-routes/handle-announcement-get-all');

router.use(express.json());
router.use(cors());

// Get all announcements
router.get('/get/all', verifyJwt, handleAnnouncementGetAll);

// Create a new announcement
router.post('/create', verifyJwt, validateAnnouncementCreate, handleAnnouncementCreate);

// Update an announcement
router.put('/update/:announcementId', verifyJwt, validateAnnouncementUpdate, handleAnnouncementUpdate);

// Delete an announcement
router.delete('/delete/:announcementId', verifyJwt, validateAnnouncementDelete, handleAnnouncementDelete);

module.exports = router;
