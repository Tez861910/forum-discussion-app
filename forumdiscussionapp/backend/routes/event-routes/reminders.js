import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateCreateReminder,
  validateEditReminder,
  validateSoftDeleteReminder,
} from '../../body-validation/event-validation-functions/reminders-validation.js';

import {getReminders} from '../../route-files/event-function-routes/reminder-routes/get-reminder.js';
import {createReminder} from '../../route-files/event-function-routes/reminder-routes/create-reminder.js';
import {editReminder} from '../../route-files/event-function-routes/reminder-routes/edit-reminder.js';
import {softDeleteReminder} from '../../route-files/event-function-routes/reminder-routes/delete-reminder.js';

const router = express.Router();

router.use(express.json());

// Endpoint to get reminders for an event
router.get('/:eventId/reminders', verifyJwt, getReminders);

// Endpoint to create a new reminder for an event
router.post('/:eventId/reminders/create', verifyJwt, validateCreateReminder, createReminder);

// Endpoint to edit an existing reminder
router.put('/:eventId/reminders/edit/:reminderId', verifyJwt, validateEditReminder, editReminder);

// Endpoint to soft delete a reminder
router.delete('/:eventId/reminders/soft-delete/:reminderId', verifyJwt, validateSoftDeleteReminder, softDeleteReminder);

export default router;
