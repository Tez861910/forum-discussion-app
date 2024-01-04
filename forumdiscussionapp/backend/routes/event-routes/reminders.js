const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../../authvalid');
const {
  validateCreateReminder,
  validateEditReminder,
  validateSoftDeleteReminder,
} = require('../../body-validation/reminders-validation');


const {getReminders} =require('../../route-files/reminder-routes/get-reminder')
const {createReminder} =require('../../route-files/reminder-routes/create-reminder')
const {editReminder} =require('../../route-files/reminder-routes/edit-reminder')
const {softDeleteReminder} =require('../../route-files/reminder-routes/delete-reminder')

router.use(express.json());

// Endpoint to get reminders for an event
router.get('/:eventId/reminders', verifyJwt, getReminders);

// Endpoint to create a new reminder for an event
router.post('/:eventId/reminders/create', verifyJwt, validateCreateReminder, createReminder);

// Endpoint to edit an existing reminder
router.put('/:eventId/reminders/edit/:reminderId', verifyJwt, validateEditReminder, editReminder);

// Endpoint to soft delete a reminder
router.delete('/:eventId/reminders/soft-delete/:reminderId', verifyJwt, validateSoftDeleteReminder, softDeleteReminder);

module.exports = router;
