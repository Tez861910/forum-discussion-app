const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyJwt } = require('../authvalid');
const {
  validateExamCreate,
  validateExamUpdate,
  validateExamDelete,
  validateExamGetByCourseId,
} = require('../body-validation/exam-validation');

const { handleExamDeleteById } = require('../route-files/exam-routes/handle-exam-delete-id');
const { handleExamUpdateById } = require('../route-files/exam-routes/handle-exam-update-id');
const { handleExamCreate } = require('../route-files/exam-routes/handle-exam-create');
const { handleExamGetByCourseId } = require('../route-files/exam-routes/handle-exams-get-bycourseid');

router.use(express.json());
router.use(cors());

// Get all exams for a specific course
router.get('/get/bycourse/:courseId', verifyJwt, validateExamGetByCourseId, handleExamGetByCourseId);

// Create a new exam
router.post('/create', verifyJwt, validateExamCreate, handleExamCreate);

// Update an exam
router.put('/update/:examId', verifyJwt, validateExamUpdate, handleExamUpdateById);

// Delete an exam
router.delete('/delete/:examId', verifyJwt, validateExamDelete, handleExamDeleteById);

module.exports = router;
