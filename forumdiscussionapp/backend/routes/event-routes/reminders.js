import express from "express";
import {
  validateCreateReminder,
  validateEditReminder,
  validateSoftDeleteReminder,
} from "../../body-validation/event-validation-functions/reminders-validation.js";

import { getReminders } from "../../route-functions/event-function-routes/reminder-routes/get-reminder.js";
import { createReminder } from "../../route-functions/event-function-routes/reminder-routes/create-reminder.js";
import { editReminder } from "../../route-functions/event-function-routes/reminder-routes/edit-reminder.js";
import { softDeleteReminder } from "../../route-functions/event-function-routes/reminder-routes/delete-reminder.js";

const router = express.Router();

// Endpoint to get reminders for an event
router.get("/:eventId/reminders", getReminders);

// Endpoint to create a new reminder for an event
router.post(
  "/:eventId/reminders/create",
  validateCreateReminder,
  createReminder
);

// Endpoint to edit an existing reminder
router.put(
  "/:eventId/reminders/edit/:reminderId",
  validateEditReminder,
  editReminder
);

// Endpoint to soft delete a reminder
router.delete(
  "/:eventId/reminders/soft-delete/:reminderId",
  validateSoftDeleteReminder,
  softDeleteReminder
);

export default router;
