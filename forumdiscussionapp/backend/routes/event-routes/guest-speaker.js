import express from "express";
import {
  validateCreateGuestSpeaker,
  validateEditGuestSpeaker,
  validateSoftDeleteGuestSpeaker,
} from "../../body-validation/event-validation-functions/guest-speaker-validation.js";

import { getGuestSpeakers } from "../../route-functions/event-function-routes/guest-speaker-routes/get-guest-speaker.js";
import { createGuestSpeaker } from "../../route-functions/event-function-routes/guest-speaker-routes/create-guest-speaker.js";
import { editGuestSpeaker } from "../../route-functions/event-function-routes/guest-speaker-routes/edit-guest-speaker.js";
import { softDeleteGuestSpeaker } from "../../route-functions/event-function-routes/guest-speaker-routes/delete-guest-speaker.js";

const router = express.Router();

// Endpoint to get guest speakers for an event
router.get("/:eventId/guest-speakers/get", getGuestSpeakers);

// Endpoint to create a new guest speaker for an event
router.post(
  "/:eventId/guest-speakers/create",
  validateCreateGuestSpeaker,
  createGuestSpeaker
);

// Endpoint to edit an existing guest speaker
router.put(
  "/:eventId/guest-speakers/edit/:guestSpeakerId",
  validateEditGuestSpeaker,
  editGuestSpeaker
);

// Endpoint to soft delete a guest speaker
router.delete(
  "/:eventId/guest-speakers/soft-delete/:guestSpeakerId",
  validateSoftDeleteGuestSpeaker,
  softDeleteGuestSpeaker
);

export default router;
