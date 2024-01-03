const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateUserReportCreate,
  validateUserReportUpdate,
  validateUserReportDelete,
} = require('../body-validation/user-report-validation');

const { handleUserReportCreate } = require('../route-files/user-report-routes/handle-user-report-create');
const { handleUserReportUpdate } = require('../route-files/user-report-routes/handle-user-report-update');
const { handleUserReportDelete } = require('../route-files/user-report-routes/handle-user-report-delete');
const { handleUserReportGetAll } = require('../route-files/user-report-routes/handle-user-report-get-all');

router.use(express.json());
router.use(cors());

// Get all user reports
router.get('/get/all', verifyJwt, handleUserReportGetAll);

// Create a new user report
router.post('/create', verifyJwt, validateUserReportCreate, handleUserReportCreate);

// Update a user report
router.put('/update/:reportId', verifyJwt, validateUserReportUpdate, handleUserReportUpdate);

// Delete a user report
router.delete('/delete/:reportId', verifyJwt, validateUserReportDelete, handleUserReportDelete);

module.exports = router;
