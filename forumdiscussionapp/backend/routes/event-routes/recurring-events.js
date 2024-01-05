import express from "express";
import { verifyJwt } from "../../authvalid.js";
import {
  validateCreateRecurringEvent,
  validateEditRecurringEvent,
  validateSoftDeleteRecurringEvent,
} from "../../body-validation/event-validation-functions/recurring-event-validation.js";

import { getRecurringEvents } from "../../route-functions/event-function-routes/recurring-event-routes/get-recurring-event.js";
import { createRecurringEvent } from "../../route-functions/event-function-routes/recurring-event-routes/create-recurring-event.js";
import { editRecurringEvent } from "../../route-functions/event-function-routes/recurring-event-routes/edit-recurring-event.js";
import { softDeleteRecurringEvent } from "../../route-functions/event-function-routes/recurring-event-routes/delete-recurring-event.js";

const router = express.Router();

router.use(express.json());

// Endpoint to get recurring events for an event
router.get("/:eventId/recurring", verifyJwt, getRecurringEvents);

// Endpoint to create a new recurring event for an event
router.post(
  "/:eventId/recurring/create",
  verifyJwt,
  validateCreateRecurringEvent,
  createRecurringEvent
);

// Endpoint to edit an existing recurring event
router.put(
  "/:eventId/recurring/edit/:recurringEventId",
  verifyJwt,
  validateEditRecurringEvent,
  editRecurringEvent
);

// Endpoint to soft delete a recurring event
router.delete(
  "/:eventId/recurring/soft-delete/:recurringEventId",
  verifyJwt,
  validateSoftDeleteRecurringEvent,
  softDeleteRecurringEvent
);

export default router;
